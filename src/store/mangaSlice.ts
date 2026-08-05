import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AnimeManga } from "../types/migoTypes";
import { fakeMangaList } from "../types/fakeDatabase";

interface mangaState {
    isLoading: boolean
    mangas: AnimeManga[]
}

const initialState: mangaState = {
    isLoading: false,
    mangas: []
}

export const mangaSlice = createSlice({
    name: 'manga',
    initialState,
    reducers: {
        fetchMangas: (state) => {
            state.mangas = fakeMangaList;
        },
        addManga: (state, action: PayloadAction<AnimeManga>) => {
            state.mangas.push(action.payload);
        },
        editManga: (state, action: PayloadAction<AnimeManga>) => {
            const index = state.mangas.findIndex(manga => manga.id === action.payload.id);
            if (index !== -1) {
                state.mangas[index] = action.payload;
            }
        },
        deleteManga: (state, action: PayloadAction<number>) => {
            let newMangaList = state.mangas.filter(manga => manga.id !== action.payload);
            state.mangas = newMangaList;
        },
    }
})

export const { fetchMangas, addManga, editManga, deleteManga } = mangaSlice.actions;

export default mangaSlice.reducer;
