import { configureStore } from "@reduxjs/toolkit";
import forecastReducer from '../slices/forecastSlice';
import mainReducer from "../slices/mainSlice";


const store = configureStore({
    reducer: {mainReducer, forecastReducer},
    devTools: process.env.NODE_ENV !== 'production',
})
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store