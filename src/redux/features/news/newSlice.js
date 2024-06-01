import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import newService from "./newService";

const initialState = {
    news: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getNews = createAsyncThunk(
    "news/getNews",
    async (_, thunkAPI) => {
        try {
            return await newService.getNews();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const newSlice = createSlice({
    name: "news",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // get news
            .addCase(getNews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.news = action.payload;
            })
            .addCase(getNews.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
    },
});

export default newSlice.reducer;