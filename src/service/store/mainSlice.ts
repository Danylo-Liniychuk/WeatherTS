import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { cityInfo } from "../../pages/CitiesPage"

type Point = {lat: number, long:number}
type Unit = {objProp: SettingsProp, value: string}
export type SettingsProp = keyof Settings;

interface mapData {
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

interface weatherState {
    currentPage: string;
    cities: Array<cityInfo>;
    map: mapData;
    settings: Settings;
    toggle: {
        notifications: boolean,
        time: boolean,
        location: boolean
    }
    screenWidth: number
}


const initialState: weatherState = {
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
    screenWidth: 1280
}


const mainSlice = createSlice({
    name: 'main',
    initialState: initialState,
    reducers: {
        changeCurrentPage: (state, action: PayloadAction<string>) => {
            state.currentPage = action.payload
        },
        changeUnit: (state, action: PayloadAction<Unit>) => {
            state.settings[action.payload.objProp] = action.payload.value
        }
    }
})


export const {changeCurrentPage,
              changeUnit} = mainSlice.actions;

export default mainSlice.reducer