import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface SettingsState {
  isLoggedIn: boolean;
}

const initialState: SettingsState = {
  isLoggedIn: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {setIsLoggedIn} = settingsSlice.actions;
