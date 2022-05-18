import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ROLE } from '../../@types/User';

import { TARIFF, User } from '../types/user';

export interface UsersState {
  list: User[];
  q: string;
  filters: {
    roles: ROLE[];
    tariff: TARIFF[];
  };
}

const initialState: UsersState = {
  list: [],
  q: '',
  filters: {
    roles: [],
    tariff: [],
  },
};

const UsersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setUsers } = UsersSlice.actions;
export default UsersSlice.reducer;
