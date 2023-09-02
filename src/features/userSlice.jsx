import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

const USER_URL = '';

const initialState = {
  // username:
  // pw:
};

// export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
//   const response = await axios.get(USER_URL);
//   return response.data;
// });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUser = state => state.users;

export default userSlice.reducer;
