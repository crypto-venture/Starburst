import { DISCUSSIONS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case DISCUSSIONS:
      return action.payload;
    default:
      return state;
  }
}
