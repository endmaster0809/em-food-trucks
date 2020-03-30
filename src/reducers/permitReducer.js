import { FETCH_PERMITS } from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PERMITS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
