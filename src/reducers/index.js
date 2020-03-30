import { combineReducers } from 'redux';
import permitReducer from './permitReducer';

export default combineReducers({
  permits: permitReducer
});
