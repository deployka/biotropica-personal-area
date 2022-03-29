import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserEvent } from '../types/user-events';

export interface UserEventsState {
  list: UserEvent[];
}

const initialState: UserEventsState = {
  list: [],
};

const UserEventsSlice = createSlice({
  name: 'user-events',
  initialState,

  reducers: {
    signOut: (state, action: PayloadAction<UserEvent[]>) => {
      state.list = action.payload;
    },
  },
});

export default UserEventsSlice.reducer;
