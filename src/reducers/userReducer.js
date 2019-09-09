import { RECEIVE_RISK } from "../actions/riskActions";
import { RECEIVE_PROFILE } from "../actions/formActions";

const userReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_RISK:
      return Object.assign({}, state, {
        riskprofile: action.risk
      });
    case RECEIVE_PROFILE:
      return Object.assign({}, state, {
        userProfile: action.payload
      });
    default:
      return state
  }
}

export default userReducer;
