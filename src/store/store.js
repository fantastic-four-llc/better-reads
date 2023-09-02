import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from '../features/librarySlice';
// import { userReducer } from '../features/userSlice';

export const store = configureStore({
    reducer: {
        library: libraryReducer,
        // user: userSlice,
    },
    devTools: true,
});

export default store;
