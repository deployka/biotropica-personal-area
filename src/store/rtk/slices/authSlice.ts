import { createSlice } from '@reduxjs/toolkit';
import authApi from '../requests/auth';
import userApi from '../requests/user';
import { RootState } from '../../store';

type Role = 'CLIENT' | 'ADMIN' | 'SPECIALIST';

type AuthState = {
    isAuthorized: boolean;
    token: string | null;
    accesses: string[];
    roles: Role[];
    currentUser?: User;
}

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
    builder.addMatcher(
      authApi.endpoints.requestSignIn.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        localStorage.setItem('token', payload.token);
      },
    ).addMatcher(
      userApi.endpoints.requestUserData.matchFulfilled,
      (state, { payload }) => {
        console.log('!!!');
        state.accesses = payload.accesses;
        state.roles = payload.roles;
        state.currentUser = payload;
        state.isAuthorized = true;
        console.log('state', state);
      },
    ).addMatcher(
      userApi.endpoints.requestUserData.matchRejected,
      (state, { payload }) => {
        console.log('!!!');
        state.isAuthorized = false;
        console.log('state', state);
      },
    );
  },
});

export const selectUserAccesses = (state: RootState): string[] => state.authSlice.accesses;
export const selectUserRoles = (state: RootState): Role[] => state.authSlice.roles;
export const selectIsAuthorized = (state: RootState): boolean => state.authSlice.isAuthorized;
export const selectIsDoctor = (state: RootState): boolean => state.authSlice.roles.includes('SPECIALIST');

export default slice.reducer;
