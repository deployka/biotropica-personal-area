import { combineReducers } from 'redux';
import { userReducer } from './ducks/user/reducer';
import { chatReducer } from './ducks/chat/reducer';
import { goalReducer } from './ducks/goal/reducer';
import { goalsReducer } from './ducks/goals/reducer';
import { progressReducer } from './ducks/progress/reducer';
import { recommendationsReducer } from './ducks/recommendations/reducer';
import { recommendationReducer } from './ducks/recommendation/reducer';
import { analyzesReducer } from './ducks/analyzes/reducer';
import { analyzeReducer } from './ducks/analyze/reducer';
import { specialistReducer } from './ducks/specialist/reducer';
import { specialistsReducer } from './ducks/specialists/reducer';
import { consultationReducer } from './ducks/consultation/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  specialist: specialistReducer,
  specialists: specialistsReducer,
  consultation: consultationReducer,
  chat: chatReducer,
  goal: goalReducer,
  goals: goalsReducer,
  progress: progressReducer,
  recommendations: recommendationsReducer,
  recommendation: recommendationReducer,
  analyze: analyzeReducer,
  analyzes: analyzesReducer,
});
