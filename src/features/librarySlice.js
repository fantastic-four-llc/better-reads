import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookList: [],
    bookCount: 0,
};

export const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        addBook: (state, action) => {
            // state.bookList.push(action.payload);
            state.bookCount += 1;
        },
        removeBook: (state, action) => {
            state.bookCount -= 1;
        },
        editBook: (state, action) => { },
    },
});

export const { addBook, removeBook, editBook } = librarySlice.actions;

export default librarySlice.reducer

