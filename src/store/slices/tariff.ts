import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import tariffApi from '../../api/tariffs';
import { Accesses } from '../../@types/entities/Tariff';

type TariffState = {
  restOfFreeConsultationsCount: number;
  freeConsultationsCount: number;
  accesses: Accesses[];
  chatAccesses: Accesses[];
};

const slice = createSlice({
  name: 'tariff',
  initialState: {
    restOfFreeConsultationsCount: 0,
    freeConsultationsCount: 0,
    accesses: [],
    chatAccesses: [],
  } as TariffState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      tariffApi.endpoints.getCurrentTariff.matchFulfilled,
      (state, { payload }) => {
        const count =
          payload.remindedAccess.find(a => a.key === 'CONSULTATION')
            ?.reminded || 0;

        state.freeConsultationsCount = payload.isPaid ? count : 0;
        state.freeConsultationsCount = payload.isPaid
          ? payload.tariff.access.find(a => a.key === 'CONSULTATION')?.value ||
            0
          : 0;

        state.accesses = payload.isPaid
          ? payload.tariff.access.map(it => it.key)
          : [];

        state.chatAccesses = payload.tariff.access
          .filter(it => it.key.split('_').includes('CHAT'))
          .map(it => it.key);
      },
    );
  },
});

export const selectCurrentTariffAccesses = (state: RootState): Accesses[] =>
  state.tariff.accesses;
export const selectChatAccesses = (state: RootState): Accesses[] =>
  state.tariff.chatAccesses;
export const selectRestOfFreeConsultationsCount = (state: RootState): number =>
  state.tariff.freeConsultationsCount;
export const selectFreeConsultationsCount = (state: RootState): number =>
  state.tariff.freeConsultationsCount;

export default slice.reducer;
