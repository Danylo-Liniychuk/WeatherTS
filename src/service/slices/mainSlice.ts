import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import type { MapData, Settings, Toggle, SettingsProp, ToggleProp} from "./mainSliceTypes";


export type Point = {lat: number, long:number}
type Unit = {objProp: SettingsProp, value: string}




export interface WeatherState {
    currentPage: string;
    map: MapData;
    settings: Settings;
    toggle: Toggle;
    screenWidth: number;
}


const initialState: WeatherState = {
    currentPage: 'Weather',
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
        }
    }
})


export const {changeCurrentPage,
              changeUnit,
              toggleSwitcher,
              changeScreenWidth} = mainSlice.actions;


export default mainSlice.reducer