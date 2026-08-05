import { configureStore } from "@reduxjs/toolkit";
import  animeReducer from './animeSlice'
import mangaReducer from './mangaSlice'

export const store = configureStore({
    reducer: {
        animeReducer,
        mangaReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
