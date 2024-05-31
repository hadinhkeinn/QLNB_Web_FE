import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredEmployees: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_SEARCH(state, action) {
            const { employees, search } = action.payload;
            const tempEmployees = employees.filter(
                (product) =>
                    product.name?.toLowerCase().includes(search.toLowerCase()) ||
                    product.category?.toLowerCase().includes(search.toLowerCase())
            );

            state.filteredEmployees = tempEmployees;
        },
    },
});

export const {
    FILTER_BY_SEARCH,
} = filterSlice.actions;

export const selectFilteredEmployees = (state) => state.filter.filteredEmployees;

export default filterSlice.reducer;
