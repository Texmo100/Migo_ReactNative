// src/store/animeSlice.ts
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
  query,
  where,
} from "@react-native-firebase/firestore";

import type { AnimeManga, AnimeMangaInput } from "../types/migoTypes";
import type { RootState } from "./store";

const db = getFirestore();
const COLLECTION = "media_items";
const ITEM_TYPE_NAME = "anime";

export const fetchAnimes = createAsyncThunk<
    AnimeManga[], 
    void, 
    { rejectValue: string }
>("anime/fetchAnimes", async (_, { rejectWithValue }) => {
  try {
    const snapshot = await getDocs(
        query(collection(db, COLLECTION), where("itemType", "==", ITEM_TYPE_NAME)),
    );
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as AnimeMangaInput),
    })) as AnimeManga[];
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const addAnime = createAsyncThunk<
  AnimeManga,
  AnimeMangaInput,
  { rejectValue: string }
>("anime/addAnime", async (input, { rejectWithValue }) => {
  try {
    const ref = await addDoc(collection(db, COLLECTION), input);
    return { id: ref.id, ...input } as AnimeManga;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const editAnime = createAsyncThunk<
  AnimeManga,
  AnimeManga,
  { rejectValue: string }
>("anime/editAnime", async (anime, { rejectWithValue }) => {
  try {
    const { id, ...data } = anime;
    await updateDoc(doc(db, COLLECTION, id), data);
    return anime;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const deleteAnime = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("anime/deleteAnime", async (id, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
    return id;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

interface AnimeState {
  isLoading: boolean;
  animes: AnimeManga[];
  error: string | null;
}

const initialState: AnimeState = {
  isLoading: false,
  animes: [],
  error: null,
};

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    animeAddedLocally: (state, action: PayloadAction<AnimeManga>) => {
      state.animes.push(action.payload);
    },
    animeRemovedLocally: (state, action: PayloadAction<string>) => {
      state.animes = state.animes.filter((a) => a.id !== action.payload);
    },
    clearAnimeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------- fetchAnimes --------
      .addCase(fetchAnimes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnimes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.animes = action.payload;
      })
      .addCase(fetchAnimes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to fetch animes";
      })

      // -------- addAnime --------
      .addCase(addAnime.fulfilled, (state, action) => {
        state.animes.push(action.payload);
      })
      .addCase(addAnime.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to add anime";
      })

      // -------- editAnime --------
      .addCase(editAnime.fulfilled, (state, action) => {
        const idx = state.animes.findIndex((a) => a.id === action.payload.id);
        if (idx !== -1) state.animes[idx] = action.payload;
      })
      .addCase(editAnime.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to edit anime";
      })

      // -------- deleteAnime --------
      .addCase(deleteAnime.fulfilled, (state, action) => {
        state.animes = state.animes.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteAnime.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete anime";
      });
  },
});

export const { animeAddedLocally, animeRemovedLocally, clearAnimeError } = animeSlice.actions;

export default animeSlice.reducer;

// Selectors
export const selectAnimes = (state: RootState) => state.anime.animes;
export const selectAnimeLoading = (state: RootState) => state.anime.isLoading;
export const selectAnimeError = (state: RootState) => state.anime.error;
