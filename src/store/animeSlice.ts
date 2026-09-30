import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AnimeManga, AnimeMangaInput } from "../types/migoTypes";

import { doc, addDoc, updateDoc, deleteDoc, collection, getFirestore } from '@react-native-firebase/firestore';
const db = getFirestore();

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
        fetchAnimes: (state, action: PayloadAction<AnimeManga[]>) => {
            state.animes = action.payload;
        },
        addAnime: (state, action: PayloadAction<AnimeMangaInput>) => {
            addDoc(collection(db, 'media_items'), action.payload)
            .then(() => {console.log('AnimeManga added!') });
        },
        editAnime: (state, action: PayloadAction<AnimeManga>) => {
            updateDoc(
                doc(collection(db, 'media_items'), action.payload.id),
                { ...action.payload }
            )
            .then(() => { console.log('AnimeManga updated!') });
        },
        deleteAnime: (state, action: PayloadAction<string>) => {
            const mediaItemRef = doc(getFirestore(), `media_items/${action.payload}`);
            deleteDoc(mediaItemRef).then(() => {
                console.log('AnimeManga deleted!');
            });
        },
    }
})

export const { fetchAnimes, addAnime, editAnime, deleteAnime } = animeSlice.actions;

export default animeSlice.reducer;
