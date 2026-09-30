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
const ITEM_TYPE_NAME = "manga";

export const fetchMangas = createAsyncThunk<
    AnimeManga[], 
    void, 
    { rejectValue: string }
>("manga/fetchMangas", async (_, { rejectWithValue }) => {
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

export const addManga = createAsyncThunk<
  AnimeManga,
  AnimeMangaInput,
  { rejectValue: string }
>("manga/addManga", async (input, { rejectWithValue }) => {
  try {
    const ref = await addDoc(collection(db, COLLECTION), input);
    return { id: ref.id, ...input } as AnimeManga;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const editManga = createAsyncThunk<
  AnimeManga,
  AnimeManga,
  { rejectValue: string }
>("manga/editManga", async (manga, { rejectWithValue }) => {
  try {
    const { id, ...data } = manga;
    await updateDoc(doc(db, COLLECTION, id), data);
    return manga;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const deleteManga = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("manga/deleteManga", async (id, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
    return id;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

interface MangaState {
  isLoading: boolean;
  mangas: AnimeManga[];
  error: string | null;
}

const initialState: MangaState = {
  isLoading: false,
  mangas: [],
  error: null,
};

export const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {
    mangaAddedLocally: (state, action: PayloadAction<AnimeManga>) => {
      state.mangas.push(action.payload);
    },
    mangaRemovedLocally: (state, action: PayloadAction<string>) => {
      state.mangas = state.mangas.filter((a) => a.id !== action.payload);
    },
    clearMangaError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------- fetchMangas --------
      .addCase(fetchMangas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMangas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mangas = action.payload;
      })
      .addCase(fetchMangas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to fetch mangas";
      })

      // -------- addManga --------
      .addCase(addManga.fulfilled, (state, action) => {
        state.mangas.push(action.payload);
      })
      .addCase(addManga.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to add manga";
      })

      // -------- editAnime --------
      .addCase(editManga.fulfilled, (state, action) => {
        const idx = state.mangas.findIndex((a) => a.id === action.payload.id);
        if (idx !== -1) state.mangas[idx] = action.payload;
      })
      .addCase(editManga.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to edit manga";
      })

      // -------- deleteManga --------
      .addCase(deleteManga.fulfilled, (state, action) => {
        state.mangas = state.mangas.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteManga.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete manga";
      });
  },
});

export const { mangaAddedLocally, mangaRemovedLocally, clearMangaError } = mangaSlice.actions;

export default mangaSlice.reducer;

// Selectors
export const selectMangas = (state: RootState) => state.manga.mangas;
export const selectMangaLoading = (state: RootState) => state.manga.isLoading;
export const selectMangaError = (state: RootState) => state.manga.error;
