import { createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/auth';
import userApi from '../../api/user';
import { Admin } from '../../@types/entities/Admin';
import { Client } from '../../@types/entities/Client';
import { ROLE, Role } from '../../@types/entities/Role';
import { Specialist } from '../../@types/entities/Specialist';
import { RootState } from '../store';
import { readCookie } from '../../utils/cookie';

type AuthState = {
  isAuthorized: boolean;
  token: string | null;
  accesses: string[];
  roles: Role[];
  currentUser?: Client | Admin | Specialist;
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: false,
    token: null,
    accessToken: null,
    accesses: [],
    roles: [],
  } as AuthState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        authApi.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.isAuthorized = true;
        },
      )
      .addMatcher(
        userApi.endpoints.currentUser.matchFulfilled,
        (state, { payload }) => {
          state.accesses = payload.accesses;
          state.token = readCookie('AccessToken');
          state.roles = payload.roles;
          state.currentUser = payload;
          state.isAuthorized = true;
        },
      )
      .addMatcher(
        userApi.endpoints.currentUser.matchRejected,
        (state, action) => {
          if (action.error.name === 'ConditionError') return;
          state.isAuthorized = false;
        },
      )
      .addMatcher(authApi.endpoints.signOut.matchFulfilled, state => {
        state.isAuthorized = false;
      });
  },
});

export const selectUserAccesses = (state: RootState): string[] =>
  state.authSlice.accesses;
export const selectUserRoles = (state: RootState): Role[] =>
  state.authSlice.roles;
export const selectIsAuthorized = (state: RootState): boolean =>
  state.authSlice.isAuthorized;
export const selectCurrentUser = (
  state: RootState,
): Client | Admin | Specialist | undefined => state.authSlice.currentUser;
export const selectIsDoctor = (state: RootState): boolean =>
  state.authSlice.roles.some(it => it.name === ROLE.SPECIALIST);
export const selectIsAdmin = (state: RootState): boolean =>
  state.authSlice.roles.some(it => it.name === ROLE.ADMIN);
export const selectIsClient = (state: RootState): boolean =>
  state.authSlice.roles.some(it => it.name === ROLE.CLIENT);
export const selectAccessToken = (state: RootState): string | null =>
  state.authSlice.token;

export default slice.reducer;
