import { createSlice } from '@reduxjs/toolkit';

import { Admin } from '../../@types/entities/Admin';
import { Client } from '../../@types/entities/Client';
import { Specialist } from '../../@types/entities/Specialist';
import { createCookie, eraseCookie } from '../../utils/cookie';

type UserState = {
  data: Client | Admin | Specialist | null;
  isLogged: boolean;
};

const initialState: UserState = {
  data: null,
  isLogged: false,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setIsLogged: state => {
      createCookie('isLogged', 'true', 365);
      state.isLogged = true;
    },

    setIsLoggedOut: state => {
      eraseCookie('isLogged');
      state.isLogged = false;
    },

    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },

  extraReducers: {},
});

export const { setIsLogged, setIsLoggedOut, setUserData } = UserSlice.actions;

export default UserSlice.reducer;
