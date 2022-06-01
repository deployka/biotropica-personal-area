import { createSlice } from '@reduxjs/toolkit';
import authApi from '../requests/auth';
import userApi from '../requests/user';
import { RootState } from '../../store';
import { ROLE } from '../../@types/User';

type AuthState = {
  isAuthorized: boolean;
  token: string | null;
  accesses: string[];
  roles: ROLE[];
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
export const selectUserRoles = (state: RootState): ROLE[] =>
  state.authSlice.roles;
export const selectIsAuthorized = (state: RootState): boolean =>
  state.authSlice.isAuthorized;
export const selectIsDoctor = (state: RootState): boolean =>
  state.authSlice.roles.includes(ROLE.SPECIALIST);
export const selectIsAdmin = (state: RootState): boolean =>
  state.authSlice.roles.includes(ROLE.ADMIN);
export const selectIsClient = (state: RootState): boolean =>
  state.authSlice.roles.includes(ROLE.CLIENT);

export default slice.reducer;
