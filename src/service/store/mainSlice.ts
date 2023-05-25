import { createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { cityInfo } from "../../pages/CitiesPage";
import type { MainForecastResponse, DailyWeekForecast } from "./mainSliceTypes";

export type Point = {lat: number, long:number}
type Unit = {objProp: SettingsProp, value: string}
export type SettingsProp = keyof Settings;
export type ToggleProp = keyof Toggle;

interface MapData {
    coords: Point,
    zoom: number,
    markers: Array<Point>
}

interface Settings {
    temperature: string,
    speed: string,
    pressure: string,
    precipitation: string,
    distance: string,
}

interface Toggle {
    notifications : boolean;
    time: boolean;
    location: boolean;
}

interface WeatherState {
    currentPage: string;
    cities: Array<cityInfo>;
    map: MapData;
    settings: Settings;
    toggle: Toggle;
    screenWidth: number;
    geolocation?: Point;
    mainLoading: boolean;
    elevation?: number;
    error?: string;
    dailyWeek: DailyWeekForecast; 
}

export const FetchMainForecast = createAsyncThunk<MainForecastResponse, void, {state: WeatherState}>(
    'main/fetchMainForecast',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const coords = state.geolocation;
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords?.lat}&longitude=${coords?.long}&forecast_days=7&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Moscow`);
        const data = await response.json();
        return data as MainForecastResponse;
    }
)


const initialState: WeatherState = {
    currentPage: 'Weather',
    cities: [{name: "Madrid", time: '10:23', temp: 31},
             {name: "Madrid", time: '10:23', temp: 31},
             {name: "Madrid", time: '10:23', temp: 31},
             {name: "Madrid", time: '10:23', temp: 31},
             {name: "Madrid", time: '10:23', temp: 31}],
    map: {
        coords: {lat: 50.4762467, long: 30.5081722}, 
        zoom: 10,
        markers: [],
    },
    settings: {
        temperature: 'celsius',
        speed: 'km/h',
        pressure: 'mm',
        precipitation:'mm',
        distance: 'km',
    },
    toggle: {
        notifications: false,
        time: true,
        location: false
    },
    screenWidth: 1280,
    dailyWeek:{
        time:[],
        temperature_2m_min:[],
        temperature_2m_max:[],
        weathercode:[]
    },
    mainLoading: false,
}


const mainSlice = createSlice({
    name: 'main',
    initialState: initialState,
    reducers: {
        changeCurrentPage: (state, action: PayloadAction<string>) => {
            state.currentPage = action.payload;
        },
        changeUnit: (state, action: PayloadAction<Unit>) => {
            state.settings[action.payload.objProp] = action.payload.value;
        },
        toggleSwitcher: (state, action: PayloadAction<ToggleProp>) => {
            state.toggle[action.payload] = !state.toggle[action.payload];
        },
        changeScreenWidth: (state, action: PayloadAction<number>) => {
            state.screenWidth = action.payload;
        },
        addGeolocation: (state, action: PayloadAction<Point>) => {
            state.geolocation = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(FetchMainForecast.pending, (state) =>{
            state.mainLoading = true;
        });
        builder.addCase(FetchMainForecast.fulfilled, (state, action) => {
            state.mainLoading = false;
            state.dailyWeek = action.payload.daily;

        });
        builder.addCase(FetchMainForecast.rejected, (state, action) => {
            state.mainLoading = false;
            state.error = action.error.message;
        })
    }
})


export const {changeCurrentPage,
              changeUnit,
              toggleSwitcher,
              changeScreenWidth,
              addGeolocation} = mainSlice.actions;


export default mainSlice.reducer