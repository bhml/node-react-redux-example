import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Schedules from './Schedules'

render(
  <Provider store={store}>
    <Schedules />
  </Provider>,
  document.getElementById('react-root'),
)

// enable hot-reloading
if (module.hot) module.hot.accept()
