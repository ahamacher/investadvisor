import { RECEIVE_RISK } from '../actions/riskActions'
import Investment from "../util/investmentutil";

const investmentReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_RISK:
      return Object.assign({}, state, {
        investment: Investment[action.risk]
      })
    default:
      return state
  }
}

export default investmentReducer;
