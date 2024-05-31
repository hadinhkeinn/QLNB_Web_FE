import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import filterReducer from "../redux/features/employee/filterSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        filter: filterReducer,
    },
});