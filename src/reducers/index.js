import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import priceReducer from './priceReducer';
import authReducer from './authReducer';
import discussionReducer from './discussionReducer';

// surveys piece of state will be produced by the surveys reducer.
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  prices: priceReducer,
  discussions: discussionReducer,
});
