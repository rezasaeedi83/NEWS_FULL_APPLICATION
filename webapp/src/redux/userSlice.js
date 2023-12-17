import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  name: '',
  token: '',
  isLoggedIn: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAccountLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setAccountLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.username = '';
      state.name = '';
      state.token = '';
    }
  }
});

export const {
  setUsername,
  setName,
  setToken,
  setAccountLoggedIn,
  setAccountLoggedOut
} = userSlice.actions;

export const selectUser = (state) => state;

export default userSlice.reducer;


