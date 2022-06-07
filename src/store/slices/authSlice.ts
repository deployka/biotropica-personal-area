import { createSlice, isAllOf, isAnyOf, isRejected } from '@reduxjs/toolkit';
import authApi from '../../api/auth';
import userApi from '../../api/user';
import { Admin } from '../../@types/entities/Admin';
import { Client } from '../../@types/entities/Client';
import { ROLE } from '../../@types/entities/Role';
import { Specialist } from '../../@types/entities/Specialist';
import { RootState } from '../store';

type AuthState = {
  isAuthorized: boolean;
  accessToken: string | null;
  token: string | null;
  accesses: string[];
  roles: ROLE[];
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
          state.token = payload.accessToken;
          state.isAuthorized = true;
          localStorage.setItem('token', payload.accessToken);
        },
      )
      .addMatcher(
        userApi.endpoints.currentUser.matchFulfilled,
        (state, { payload }) => {
          state.accesses = payload.accesses;
          state.roles = payload.roles;
          state.currentUser = payload;
          state.isAuthorized = true;
        },
      )
      .addMatcher(
        userApi.endpoints.currentUser.matchRejected,
        (state, action) => {
          if (action.error.name === 'ConditionError') return;
          console.log(action);
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
