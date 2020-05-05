import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import helloReducer from './helloReducer';
import authReducer from './authReducer';

// surveys piece of state will be produced by the surveys reducer.
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  hello: helloReducer,
});
