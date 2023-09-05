import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    bookList: [],
    bookCount: 0,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const getBooks = createAsyncThunk('library/getBooks', async (userId) => {
    try {
        const response = await axios.get('');
        return [...response.data];
    } catch (err) {
        console.log(err);
    }
});

export const addBook = createAsyncThunk('library/addBook', async (data) => {
    try {
        const response = await axios.post('/addBook', data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

export const removeBook = createAsyncThunk('library/removeBook', async (bookId) => {
    try {
        const response = await axios.delete('');
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        bookAdded: {
            reducer(state, action) {
                state.bookList.push(action.payload)
            },
        },
        ratingAdded(state, action) {
            const { bookId, rating } = action.payload
            const existingPost = state.bookList.find(book => book.id === bookId)
            if (existingBook) {
                existingBook.review = rating;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getBooks.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedBooks = action.payload.map(book => {
                    return book;
                });

                // Add any fetched books to the array
                state.posts = state.bookList.concat(loadedBooks)
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addBook.fulfilled, (state, action) => {
                const sortedBooks = state.bookList.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedBooks[sortedBooks.length - 1].id + 1;

                action.payload.bookId = Number(action.payload.bookId)

                console.log(action.payload)
                state.bookList.push(action.payload)
            })
    }
})

export const getBookList = state => state.library.bookList;
export const getBooksStatus = state => state.library.status;
export const getBooksError = state => state.library.error;

export const { bookAdded } = librarySlice.actions;

export default librarySlice.reducer;
