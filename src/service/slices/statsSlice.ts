import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { SeasonWeatherResponse } from "./statsSliceTypes";
import { RootState } from "../store/store";
import type { Point } from "./mainSlice";
import type { SeasonWeather } from "./statsSliceTypes";

interface SeasonWeatherSearch {
    coords?: Point;
    name?: string;
}

interface StatsState {
    seasonWeatherLoading: boolean;
    seasonWeather: SeasonWeather;
    errorMess?: string;
    weatherConditions: {
        weatherCodes: number[];
        days: string[];
        precipitation_sum: number[];
        precipitation_hours: number[];
    }
    name: string;
}

const statsState: StatsState = {
    seasonWeatherLoading: true,
    seasonWeather: {
        date: [],
        temperatureMax: [],
        temperatureMin: [],
    },
    weatherConditions: {
        weatherCodes: [],
        days: [],
        precipitation_hours: [],
        precipitation_sum: []
    },
    name: ''
}

export const fetchSeasonWeather = createAsyncThunk<[SeasonWeatherResponse, string], SeasonWeatherSearch, {rejectValue: string, state: RootState}>(
    'stats/fetchSeasonWeather',
    async ({coords, name}, {getState}) => {
        const state = getState();
        const {temperature, precipitation} = state.mainReducer.settings;
        if(!!coords) {
            const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${coords.lat}&longitude=${coords.long}&start_date=2023-02-01&end_date=2023-05-01&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,precipitation_hours&timezone=Europe/Moscow&temperature_unit=${temperature}&precipitation_unit${precipitation}`);
            const data: SeasonWeatherResponse = await response.json();
            return [data, name] as [SeasonWeatherResponse, string];
        } else {
            const point = state.forecastReducer.geolocation;
            const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${point?.lat}&longitude=${point?.long}&start_date=2023-02-01&end_date=2023-05-01&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,precipitation_hours&timezone=Europe/Moscow&temperature_unit=${temperature}&precipitation_unit${precipitation}`);
            const data: SeasonWeatherResponse = await response.json();
            return [data, state.forecastReducer.city] as [SeasonWeatherResponse, string];
        }

    }
)


const statsSlice = createSlice({
    name: "stats",
    initialState: statsState,
    reducers: {
        cleanSeasonData: (state) => {
            state.seasonWeather.date = [];
            state.seasonWeather.temperatureMax = [];
            state.seasonWeather.temperatureMin = [];
        },
        cleanWeatherConditions: (state) => {
            state.weatherConditions.weatherCodes = [];
            state.weatherConditions.days = [];
            state.weatherConditions.precipitation_hours = [];
            state.weatherConditions.precipitation_sum = [];
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchSeasonWeather.pending, state => {
            state.seasonWeatherLoading = true;
        });
        builder.addCase(fetchSeasonWeather.fulfilled, (state, action) => {
            const {daily} = action.payload[0];
            state.seasonWeatherLoading = false;
            state.seasonWeather.date = daily.time;
            state.seasonWeather.temperatureMax = daily.temperature_2m_max;
            state.seasonWeather.temperatureMin = daily.temperature_2m_min;
            state.weatherConditions.weatherCodes = daily.weathercode;
            state.weatherConditions.precipitation_sum = daily.precipitation_sum;
            state.weatherConditions.precipitation_hours = daily.precipitation_hours;
            state.name = action.payload[1]
        });
        builder.addCase(fetchSeasonWeather.rejected, (state, action) => {
            state.seasonWeatherLoading = false;
        })
    },
})

export const {cleanSeasonData, cleanWeatherConditions} = statsSlice.actions
export default statsSlice.reducer;