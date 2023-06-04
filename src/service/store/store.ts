import { configureStore, combineReducers } from "@reduxjs/toolkit";
import forecastReducer from '../slices/forecastSlice';
import mainReducer from "../slices/mainSlice";
import geocodingReducer from "../slices/geocodingSlice";
import statsReducer from "../slices/statsSlice";
import { persistStore,
         persistReducer,
         FLUSH,
         REHYDRATE,
         PAUSE,
         PERSIST,
         PURGE,
         REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
    mainReducer,
    forecastReducer,
    geocodingReducer,
    statsReducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persister = persistStore(store);
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store