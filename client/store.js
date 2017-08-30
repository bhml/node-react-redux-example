import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import requestMiddleware from './utils/requestMiddleware'
import reducers from './reducers'

const middlewares = [
  thunk,
  requestMiddleware,
]

const store = createStore(reducers, compose(
  applyMiddleware(...middlewares),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
    window.devToolsExtension() : f => f,
))

export default store
