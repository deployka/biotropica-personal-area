import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { format } from 'date-fns';
import { RootState } from '../index';

interface TasksPageSliceState {
    currentMonth: string;
}

const initialState: TasksPageSliceState = {
  currentMonth: format(new Date(), 'yyyy-MM'),
};

const TasksPageSlice = createSlice({
  name: 'tasksPage',
  initialState,
  reducers: {
    setCurrentMonth: (state, action: PayloadAction<string>) => {
      state.currentMonth = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  // Для преобразования редьюсера в экшен - нужно использовать такую конструкцию
  setCurrentMonth,
} = TasksPageSlice.actions;

export const selectTasksPageCurrentMonth = (state: RootState) => state.tasksPageSlice.currentMonth;

export default TasksPageSlice.reducer;
