import { call, put, takeLatest } from 'redux-saga/effects';
import RecommendationService from '../../../services/RecommendationService';
import { LoadingStatus } from '../../types';
import {
  setRecommendationsData,
  setRecommendationsLoadingStatus,
} from './actionCreators';
import {
  FetchRecommendationsDataActionInterface,
  RecommendationsActionsType,
} from './contracts/actionTypes';

export function* fetchRecommendationsDataRequest({}: FetchRecommendationsDataActionInterface): any {
  try {
    yield put(setRecommendationsLoadingStatus(LoadingStatus.LOADING));
    const { data, status } = yield call(RecommendationService.geAll);
    if (status === 200) {
      yield put(setRecommendationsData(data));
      yield put(setRecommendationsLoadingStatus(LoadingStatus.SUCCESS));
    } else {
      yield put(setRecommendationsLoadingStatus(LoadingStatus.ERROR));
    }
  } catch (error) {}
}

export function* recommendationsSaga(): any {
  yield takeLatest(
    RecommendationsActionsType.FETCH_RECOMMENDATIONS_DATA,
    fetchRecommendationsDataRequest
  );
}
