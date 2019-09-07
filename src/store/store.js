import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from '../reducers/root_reducer'

const configureStore = (preloadedState = {}) => {
  // if this was really to make api calls I would include a thunk in the
  // middleware, as it is now it is just initialized as an empty array
  let middleware = [];
  
  // this allows for a redux logger only in the dev environment
  if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger]
  }
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  )
}
export default configureStore
