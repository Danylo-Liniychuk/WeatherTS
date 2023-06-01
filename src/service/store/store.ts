import { configureStore } from "@reduxjs/toolkit";
import forecastReducer from '../slices/forecastSlice';
import mainReducer from "../slices/mainSlice";
import geocodingReducer from "../slices/geocodingSlice";
import statsReducer from "../slices/statsSlice";

const store = configureStore({
    reducer: {mainReducer, forecastReducer, geocodingReducer, statsReducer},
    devTools: process.env.NODE_ENV !== 'production',
})
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store