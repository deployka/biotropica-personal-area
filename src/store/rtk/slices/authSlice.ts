import { createSlice } from '@reduxjs/toolkit';
import authApi from '../requests/auth';
import userApi from '../requests/user';
import { RootState } from '../../store';

type Role = 'USER' | 'ADMIN' | 'DOCTOR';

type AuthState = {
  isAuthorized: boolean;
  token: string | null;
  accesses: string[];
  roles: Role[];
  currentUser?: User;
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: false,
    token: null,
    accesses: [],
    roles: [],
  } as AuthState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        authApi.endpoints.requestSignIn.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          localStorage.setItem('token', payload.token);
        },
      )
      .addMatcher(
        userApi.endpoints.requestUserData.matchFulfilled,
        (state, { payload }) => {
          state.accesses = payload.accesses;
          state.roles = payload.roles;
          state.currentUser = payload;
          state.isAuthorized = true;
        },
      )
      .addMatcher(
        userApi.endpoints.requestUserData.matchRejected,
        (state, { payload }) => {
          state.isAuthorized = false;
        },
      );
  },
});

export const selectUserAccesses = (state: RootState): string[] =>
  state.authSlice.accesses;
export const selectUserRoles = (state: RootState): Role[] =>
  state.authSlice.roles;
export const selectIsAuthorized = (state: RootState): boolean =>
  state.authSlice.isAuthorized;
export const selectIsDoctor = (state: RootState): boolean =>
  state.authSlice.roles.includes('DOCTOR');

export default slice.reducer;
