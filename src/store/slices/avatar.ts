import { createSlice } from '@reduxjs/toolkit';
import { File } from '../../@types/entities/File';

export type FileState = {
  data: File | null;
};

const initialState: FileState = {
  data: null,
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

export const { setUserAvatar } = AvatarSlice.actions;

export default AvatarSlice.reducer;
