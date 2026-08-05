import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AnimeManga } from "../types/migoTypes";
import { fakeAnimeList } from "../types/fakeDatabase";

interface animeState {
    isLoading: boolean
    animes: AnimeManga[]
}

const initialState: animeState = {
    isLoading: false,
    animes: []
}

export const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        fetchAnimes: (state) => {
            state.animes = fakeAnimeList;
        },
        addAnime: (state, action: PayloadAction<AnimeManga>) => {
            state.animes.push(action.payload);
        },
        editAnime: (state, action: PayloadAction<AnimeManga>) => {
            const index = state.animes.findIndex(anime => anime.id === action.payload.id);
            if (index !== -1) {
                state.animes[index] = action.payload;
            }
        },
        deleteAnime: (state, action: PayloadAction<number>) => {
            let newAnimeList = state.animes.filter(anime => anime.id !== action.payload);
            state.animes = newAnimeList;
        },
    }
})

export const { fetchAnimes, addAnime, editAnime, deleteAnime } = animeSlice.actions;

export default animeSlice.reducer;
