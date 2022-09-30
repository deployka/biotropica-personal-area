import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseUser } from '../../@types/entities/BaseUser';
import { ROLE } from '../../@types/entities/Role';
import { TARIFF } from '../../@types/entities/Tariff';

export interface UsersState {
  list: BaseUser[];
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
    setUsers: (state, action: PayloadAction<BaseUser[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setUsers } = UsersSlice.actions;
export default UsersSlice.reducer;
