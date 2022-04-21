import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Avatar } from '../types/avatar';

const initialState: Avatar = {
  data: {
    createdAt: '',
    id: null,
    name: '',
    originalName: '',
    size: null,
    type: '',
    updatedAt: '',
  },
};

const AvatarSlice = createSlice({
  name: 'avatar',
  initialState,

  reducers: {

    setUserAvatar: (state, action) => {
      state.data = action.payload;
    },
  },

  extraReducers: {},
});

export const {
  setUserAvatar,
} = AvatarSlice.actions;

export default AvatarSlice.reducer;
