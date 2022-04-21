import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState, User } from '../types/user';
import { TARIFF } from '../../../services/UserService';
import { createCookie, eraseCookie } from '../../../utils/cookie';

const initialState: UserState = {
  data: {
    profilePhoto: '',
    banReason: null,
    banned: null,
    confirmed: false,
    confirmedHash: '',
    createdAt: '',
    dob: null,
    email: '',
    gender: null,
    id: null,
    isOnline: null,
    lastname: '',
    name: '',
    paid: false,
    password: '',
    patronymic: null,
    phone: '',
    questionHash: '',
    refreshToken: '',
    restoreToken: '',
    roles: [],
    specialist: {
      courses: [],
      createdAt: '',
      education: '',
      experience: '',
      id: 2,
      price: 1000,
      specializations: [],
      updatedAt: '',
    },
    tariff: TARIFF.BASE,
    updatedAt: '',
    apiUserUuid: '',
  },
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
