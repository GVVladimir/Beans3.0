import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { History, Page } from "../../types";

type HistoryState = Page & {
  isLoading: boolean;
  data: History[];
  isError: boolean;
};

const initialState: HistoryState = {
  isLoading: false,
  data: [],
  isError: false,
  currentPage: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
};

export const getHistory = createAsyncThunk("history", async (page: number) => {
  const { data } = await axios.get(
    `https://jellybellywikiapi.onrender.com/api/MileStones?pageIndex=${page}&pageSize=16`
  );
  return data;
});

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHistory.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getHistory.fulfilled, (state, { payload }) => {
      state.data = [...state.data, ...payload.items];
      state.isLoading = false;
      state.currentPage = payload.currentPage;
      state.pageSize = payload.pageSize;
      state.totalCount = payload.totalCount;
      state.totalPages = payload.totalPages;
    });
    builder.addCase(getHistory.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default historySlice.reducer;
