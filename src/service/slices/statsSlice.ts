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
}

const statsState: StatsState = {
    seasonWeatherLoading: true,
    seasonWeather: {
        date: [],
        temperatureMax: [],
        temperatureMin: [],
    }   
}

export const fetchSeasonWeather = createAsyncThunk<[SeasonWeatherResponse, string], SeasonWeatherSearch, {rejectValue: string, state: RootState}>(
    'stats/fetchSeasonWeather',
    async ({coords, name}, {getState}) => {
        if(!!coords) {
            const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${coords.lat}&longitude=${coords.long}&start_date=2023-02-01&end_date=2023-05-01&daily=temperature_2m_max,temperature_2m_min&timezone=Europe/Moscow`);
            const data: SeasonWeatherResponse = await response.json();
            return [data, name] as [SeasonWeatherResponse, string];
        } else {
            const state = getState();
            const point = state.forecastReducer.geolocation;
            const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${point?.lat}&longitude=${point?.long}&start_date=2023-02-01&end_date=2023-05-01&daily=temperature_2m_max,temperature_2m_min&timezone=Europe/Moscow`);
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
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchSeasonWeather.pending, state => {
            state.seasonWeatherLoading = true;
        });
        builder.addCase(fetchSeasonWeather.fulfilled, (state, action) => {
            state.seasonWeatherLoading = false;
            state.seasonWeather.date = action.payload[0].daily.time;
            state.seasonWeather.temperatureMax = action.payload[0].daily.temperature_2m_max;
            state.seasonWeather.temperatureMin = action.payload[0].daily.temperature_2m_min;
        });
        builder.addCase(fetchSeasonWeather.rejected, (state, action) => {
            state.seasonWeatherLoading = false;
        })
    },
})

export const {cleanSeasonData} = statsSlice.actions
export default statsSlice.reducer;