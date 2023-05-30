import { createSlice, createAsyncThunk, PayloadAction, createSelector} from "@reduxjs/toolkit";
import type { Point } from "./mainSlice";
import type { DailyWeekForecast, CurrentWeather, MainPageForecast, WeekForecastResponse, AdditionalCurrentParams, HourlyDayForecast, OneCityForecast, OneDayForecastResponse, CityWeekForecast} from "./forecastSliceTypes";
import type { RootState } from "../store/store";

export interface ForecastState {
    geolocation?: Point;
    dailyWeekForecast: DailyWeekForecast;
    weekForecastLoading: boolean;
    mainForecastLoading: boolean;
    cityForecastLoading: boolean;
    cityWeekLoading: boolean;
    current_weather?: CurrentWeather;
    currentAdditional?: AdditionalCurrentParams;
    todayHourly: HourlyDayForecast;
    geocodingAPIkey: string;
    errorMessage?: string;
    city: string;
    cities: Array<OneCityForecast>;
    cityForecast: CityWeekForecast;
}


const forecastState: ForecastState = {
    weekForecastLoading: true,
    mainForecastLoading: true,
    cityForecastLoading: false,
    cityWeekLoading: false,
    geocodingAPIkey: "pk.f4f5083978dc2335798c47f9b1970518",
    dailyWeekForecast: {
        temperature_2m_max:[],
        temperature_2m_min: [],
        time: [],
        weathercode: []
    },
    city: '',
    todayHourly: {
        time: [],
        temperature_2m: [],
        weathercode: []
    },
    cities: [],
    cityForecast: {
        hourly: {
            temperature_2m: [],
            time: [],
            weathercode: []
        }, 
        threeDays: {
            temperature_2m_max: [],
            temperature_2m_min: [],
            time: [],
            weathercode: [],
            precipitation: [],
        }
    },
}

export const fetchWeekForecast = createAsyncThunk<WeekForecastResponse, void, {state: RootState}>(
    'forecast/fetchWeekForecast',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const coords = state.forecastReducer.geolocation;
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords?.lat}&longitude=${coords?.long}&forecast_days=7&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Moscow`);
        return await response.json() as WeekForecastResponse;
    }
)

export const fetchTodaysForecast = createAsyncThunk<MainPageForecast, void, {state: RootState}>(
    'forecast/fetchTodayForecast',
    async(_, thunkAPI) => {
        const state = thunkAPI.getState(),
              coords = state.forecastReducer.geolocation,
              apikey = state.forecastReducer.geocodingAPIkey;
        const response1 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords?.lat}&longitude=${coords?.long}&forecast_days=2&hourly=temperature_2m,weathercode&timezone=Europe/Moscow&current_weather=true&daily=apparent_temperature_max,windspeed_10m_max,uv_index_max,precipitation_probability_mean`);
        const data1 = await response1.json();
        const response2 = await fetch(`https://us1.locationiq.com/v1/reverse?key=${apikey}&lat=${coords?.lat}&lon=${coords?.long}&format=json&accept-language=en`)
        const data2 = await response2.json();
        return [data1, data2];
    }
)

export const fetchOneCityForecast = createAsyncThunk<[OneDayForecastResponse, string], [string, Point], {rejectValue: string}>(
    'forecast/fetchCityForecast',
    async(data, {rejectWithValue}) => {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data[1].lat}&longitude=${data[1].long}&timezone=Europe/Moscow&current_weather=true`);
        if(!response.ok) {
            return rejectWithValue('Error in city fetch')
        }
        const res = await response.json();
        return [res, data[0]];
    }
)

export const fetchOneCityWeekForecast = createAsyncThunk<[WeekForecastResponse, string], [string, Point], {rejectValue: string}>(
    'forecast/fetchCityWeekForecast',
    async(data, {rejectWithValue}) => {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data[1].lat}&longitude=${data[1].long}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_mean&timezone=Europe/Moscow&forecast_days=3&current_weather=true&hourly=temperature_2m,weathercode`);
        if(!response.ok) {
            return rejectWithValue('Error in city weak forecast fetch')
        }
        const res = await response.json();
        return [res, data[0]];
    }
)


const forecastSlice = createSlice({
    name: 'forecast',
    initialState: forecastState,
    reducers: {
        addGeolocation: (state, action: PayloadAction<Point>) => {
            state.geolocation = action.payload;
        },

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
                state.city = address.address?.city || address.address?.town
            });
            builder.addCase(fetchTodaysForecast.rejected, (state, action) => {
                state.mainForecastLoading = false;
                state.errorMessage = action.error.message;
            });

            builder.addCase(fetchOneCityForecast.pending, state => {
                state.cityForecastLoading = true;
            });
            builder.addCase(fetchOneCityForecast.fulfilled, (state, action) => {
                state.cityForecastLoading = false;
                const {current_weather, longitude, latitude} = action.payload[0];
                state.cities.push({name: action.payload[1], 
                                    temperature: current_weather.temperature,
                                    weathercode: current_weather.weathercode, 
                                    coords: {lat:latitude, long:longitude}})
            });
            builder.addCase(fetchOneCityForecast.rejected, (state, action) => {
                state.cityForecastLoading = false;
                state.errorMessage = action.payload;
            });
            
            builder.addCase(fetchOneCityWeekForecast.pending, state => {
                state.cityWeekLoading = true;
            });
            builder.addCase(fetchOneCityWeekForecast.fulfilled, (state, action) => {
                state.cityWeekLoading = false;
                const {hourly, daily, current_weather} = action.payload[0];
                const  index =  hourly.time.indexOf(current_weather.time),
                       timeArr = hourly.time.slice(index+1, index+4),
                       tempArr = hourly.temperature_2m.slice(index+1, index+4),
                       codeArr = hourly.weathercode.slice(index+1, index+4);
                state.cityForecast.name = action.payload[1];
                state.cityForecast.temperature = current_weather.temperature;
                state.cityForecast.weatherCode = current_weather.weathercode;
                state.cityForecast.threeDays = daily;
                state.cityForecast.hourly = {time: timeArr, temperature_2m: tempArr, weathercode: codeArr}
            });
            builder.addCase(fetchOneCityWeekForecast.rejected, state => {
                state.cityWeekLoading = false;
            })
    },
})


export const getMainTotalData = createSelector(
    (state: RootState) => state.forecastReducer.current_weather,
    (state: RootState) => state.forecastReducer.city,
    (state: RootState) => state.forecastReducer.currentAdditional,
    (current, city, aditional) =>  ({title:city,
                                     temperature: current?.temperature,
                                     probability: aditional?.precipitation_probability_mean,
                                     weatherCode: current?.weathercode})
)

export const getCityTotalData = createSelector(
    (state: RootState) => state.forecastReducer.cityForecast,
    (cityForecast) => ({cityName: cityForecast.name,
                        cityTemp: cityForecast.temperature,
                        cityProb: cityForecast.threeDays.precipitation,
                        cityCode: cityForecast.weatherCode})
)

export const getCitiesLoading = createSelector(
    (state: RootState) => state.forecastReducer.cityForecastLoading,
    (state: RootState) => state.forecastReducer.cityWeekLoading,
    (cityWeekLoading, cityForecastLoading) => ({cityForecastLoading, cityWeekLoading})
)

export const {addGeolocation} = forecastSlice.actions;

export default forecastSlice.reducer




