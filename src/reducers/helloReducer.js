import { HELLO } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case HELLO:
      return action.payload;
    default:
      return state;
  }
}
