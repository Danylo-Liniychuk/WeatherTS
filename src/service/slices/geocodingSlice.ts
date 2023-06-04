import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import type {AutoCompleteResponse, Matches} from '../slices/geocodingSliceTypes';
import type { OneCityForecast,ReverseGeocodingResponse,OneDayForecastResponse } from "./forecastSliceTypes";
import type { LatLngLiteral } from "leaflet";
import { RootState } from "../store/store";
import { Point } from "./mainSlice";


interface GeocodingState {
    apiKey: string;
    pending?: boolean;
    matches?: Array<Matches>;
    errorMess?: string;
    mapMarkers: Array<OneCityForecast>;
    mapMarkersCoords: Array<LatLngLiteral>;
    mapMarkerForecastLoading: boolean;
    searchPanelCoords: LatLngLiteral | null;
}


const geocodingState: GeocodingState = {
    apiKey: "pk.f4f5083978dc2335798c47f9b1970518",
    mapMarkers: [],
    mapMarkerForecastLoading: false,
    mapMarkersCoords: [],
    searchPanelCoords: null,
}

export const fetchAutoComplete = createAsyncThunk<Array<AutoCompleteResponse>, string, {rejectValue: string}>(
    'geocoding/fetchAutompleate',
    async (text, {rejectWithValue}) => {
        const response = await fetch(`https://api.locationiq.com/v1/autocomplete?key=pk.f4f5083978dc2335798c47f9b1970518&q=${text}&tag=place:city, place:town&limit=8`);
        if(!response.ok){
            return rejectWithValue('invalid address')
        }
        return response.json();
    }
)

export const fetchMarkerForecast = createAsyncThunk<[ReverseGeocodingResponse,OneDayForecastResponse, LatLngLiteral], LatLngLiteral, {rejectValue: string, state: RootState}>(
    'geocoding/fetchMarkerWeather',
    async (coords, {rejectWithValue, getState}) => {
        const state = getState();
        const key = state.geocodingReducer.apiKey,
              {temperature} = state.mainReducer.settings;
        const response1 = await fetch(`https://us1.locationiq.com/v1/reverse?key=${key}&lat=${coords.lat}&lon=${coords.lng}&format=json&accept-language=en`);
        const response2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&timezone=Europe/Moscow&current_weather=true&temperature_unit=${temperature}`);
        if(!response1.ok && !response2.ok) {
            return rejectWithValue('Error in fetchMarkerForecast')
        }
        const data1 = await response1.json(),
              data2 = await response2.json();

        return [data1, data2, coords]
    }
)

const geocodingSlice = createSlice({
    name: 'geocoding',
    initialState: geocodingState,
    reducers: {
        cleanMatches: (state) => {
            state.matches = [];
        },
        removeMarker: (state, action: PayloadAction<LatLngLiteral>) => {
            state.mapMarkers = state.mapMarkers.filter(el => el.coords.lat !== action.payload.lat && el.coords.long !== action.payload.lng);
            state.mapMarkersCoords = state.mapMarkersCoords.filter(el => el.lat !== action.payload.lat && el.lng !== action.payload.lng)
        },
        addMarker: (state, action: PayloadAction<LatLngLiteral>) => {
            state.mapMarkersCoords.push(action.payload);
        }, 
        addSearchPanelCoords: (state, action: PayloadAction<LatLngLiteral>) => {
            state.searchPanelCoords = action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchAutoComplete.pending, state => {
            state.pending = true;
        });
        builder.addCase(fetchAutoComplete.fulfilled, (state, action) => {
            state.matches = action.payload.map(el =>  ({display_name: el.display_name,
                                                        display_place:el.display_place,
                                                        coords:{lat: +el.lat, long: +el.lon}}))
        });
        builder.addCase(fetchAutoComplete.rejected, (state, action) => {
            state.errorMess = action.payload;
        });
        builder.addCase(fetchMarkerForecast.pending, state => {
            state.mapMarkerForecastLoading = true;
        });
        builder.addCase(fetchMarkerForecast.fulfilled, (state, action) => {
            const {current_weather} = action.payload[1],
                  {address} = action.payload[0],
                  {lat, lng} = action.payload[2]
            state.mapMarkerForecastLoading = false;
            if(address?.city || address?.town || address?.village) {
                state.mapMarkers.push({coords: {lat, long: lng},
                    name: address?.city || address?.town || address?.village,
                    temperature: current_weather.temperature,
                    weathercode: current_weather.weathercode})
            } else {
                state.mapMarkersCoords = state.mapMarkersCoords.filter(el => el.lat !== lat && el.lng !== lng)
            }

        });
        builder.addCase(fetchMarkerForecast.rejected, state => {
            state.mapMarkerForecastLoading = false;
        })
    },
})

export const {cleanMatches, removeMarker, addMarker, addSearchPanelCoords} = geocodingSlice.actions;

export default geocodingSlice.reducer