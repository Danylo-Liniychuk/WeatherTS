import { createSlice, createAsyncThunk, PayloadAction, createSelector} from "@reduxjs/toolkit";
import type { Point } from "./mainSlice";
import type { DailyWeekForecast, CurrentWeather, MainPageForecast, WeekForecastResponse, AdditionalCurrentParams, HourlyDayForecast} from "./forecastSliceTypes";
import type { RootState } from "../store/store";

export interface ForecastState {
    geolocation: Point;
    dailyWeekForecast: DailyWeekForecast;
    weekForecastLoading: boolean;
    mainForecastLoading: boolean;
    current_weather?: CurrentWeather;
    currentAdditional?: AdditionalCurrentParams;
    todayHourly?: HourlyDayForecast;
    geocodingAPIkey: string;
    errorMessage?: string;
    city: string
}


const forecastState: ForecastState = {
    geolocation: {lat: 50.45, long: 30.52},
    weekForecastLoading: false,
    mainForecastLoading: false,
    geocodingAPIkey: "pk.f4f5083978dc2335798c47f9b1970518",
    dailyWeekForecast: {
        temperature_2m_max:[],
        temperature_2m_min: [],
        time: [],
        weathercode: []
    },
    city: ''
}

export const fetchWeekForecast = createAsyncThunk<WeekForecastResponse, void, {state: RootState}>(
    'forecast/fetchWeekForecast',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const coords = state.forecastReducer.geolocation;
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.long}&forecast_days=7&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Moscow`);
        return await response.json() as WeekForecastResponse;
    }
)

export const fetchTodaysForecast = createAsyncThunk<MainPageForecast, void, {state: RootState}>(
    'forecast/fetchTodayForecast',
    async(_, thunkAPI) => {
        const state = thunkAPI.getState(),
              coords = state.forecastReducer.geolocation,
              apikey = state.forecastReducer.geocodingAPIkey;
        const response1 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.long}&forecast_days=2&hourly=temperature_2m,weathercode&timezone=Europe/Moscow&current_weather=true&daily=apparent_temperature_max,windspeed_10m_max,uv_index_max,precipitation_probability_mean`);
        const data1 = await response1.json();
        const response2 = await fetch(`https://us1.locationiq.com/v1/reverse?key=${apikey}&lat=${coords.lat}&lon=${coords.long}&format=json&accept-language=en`)
        const data2 = await response2.json();
        console.log(1);
        console.log(coords);
        return [data1, data2];
    }
)


const forecastSlice = createSlice({
    name: 'forecast',
    initialState: forecastState,
    reducers: {
        addGeolocation: (state, action: PayloadAction<Point>) => {
            state.geolocation = action.payload;
        }
    },
    extraReducers(builder) {
            builder.addCase(fetchWeekForecast.pending, (state) =>{
                state.weekForecastLoading = true;
            });
            builder.addCase(fetchWeekForecast.fulfilled, (state, action) => {
                state.weekForecastLoading = false;
                state.dailyWeekForecast = action.payload.daily;

            });
            builder.addCase(fetchWeekForecast.rejected, (state, action) => {
                state.weekForecastLoading = false;
                state.errorMessage = action.error.message;
            });
            builder.addCase(fetchTodaysForecast.pending, (state) => {
                state.mainForecastLoading = true;
            });
            builder.addCase(fetchTodaysForecast.fulfilled, (state, action) => {
                const [data, address] = action.payload;
                const {daily, hourly,current_weather} = data;
                const {time, ...rest} = daily,
                       index =   hourly.time.indexOf(current_weather.time),
                       timeArr = hourly.time.slice(index+1, index+6),
                       tempArr = hourly.temperature_2m.slice(index+1, index+6),
                       codeArr = hourly.weathercode.slice(index+1, index+6 );
                
                state.mainForecastLoading = false;
                state.todayHourly = {time: timeArr, temperature_2m: tempArr, weathercode: codeArr};
                state.current_weather = current_weather;
                state.currentAdditional = rest;
                state.city = address.address.city || address.address.town
            });
            builder.addCase(fetchTodaysForecast.rejected, (state, action) => {
                state.mainForecastLoading = false;
                state.errorMessage = action.error.message;
            });
    },
})


// const getAdditional = (state: RootState) => state.forecastReducer.currentAdditional;

// export const getSomeAdditionals = createSelector(
//     getAdditional,
//     (parameters) =>  para
// )

export const {addGeolocation} = forecastSlice.actions;

export default forecastSlice.reducer




