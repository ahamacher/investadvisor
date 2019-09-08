import { RECEIVE_RISK } from '../actions/riskActions'
import Investment from "../util/investmentutil";

const investmentReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_RISK:
      const investment = Investment[action.risk];
      const { stock, bond, gold, cash, realEstate } = investment;
      return Object.assign({}, state, {
        stock,
        bond,
        gold,
        cash,
        realEstate
      })
    default:
      return state
  }
}

export default investmentReducer;
