import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface SettingsState {
  isLoggedIn: boolean;
  vendorData: IVendorData | [];
}

interface IVendorData {
  id: number;
  location: {
    area: string;
    latitude: number;
    longitude: number;
    menu: [];
    name: string;
    openingHours: string;
    rating: string;
    reviews: [];
  };
}

const initialState: SettingsState = {
  isLoggedIn: false,
  vendorData: [],
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setVendorData: (state, action: PayloadAction<IVendorData>) => {
      state.vendorData = action.payload;
    },
    signOut: () => {
      return initialState;
    },
  },
});

export const {setIsLoggedIn, setVendorData, signOut} = settingsSlice.actions;
