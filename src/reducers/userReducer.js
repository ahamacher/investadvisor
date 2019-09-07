import { RECEIVE_RISK } from "../actions/riskActions";

const userReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_RISK:
      return Object.assign({}, state, {
        riskprofile: action.risk
      })
    default:
      return state
  }
}

export default userReducer;
