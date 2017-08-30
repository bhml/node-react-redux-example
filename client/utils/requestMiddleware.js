export default ({ dispatch, getState }) =>
  next => (action) => {
    // if action is a thunk
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const { request, type, callback, ...rest } = action

    // if action does not have a request object, let it go through
    if (!request) return next(action)

    // from here onwards the request promise action will be
    // split into a loading state, success or error state,
    // and dispatch each accordingly
    next({ ...rest, type: `${type}_REQUEST` })

    request
      .then((response) => {
        const data = response.data

        next({
          ...rest,
          data,
          res: response,
          type: `${type}_SUCCESS`,
        })

        if (callback) callback(null, data)
      })
      .catch((error) => {
        next({
          ...rest,
          res: error.response,
          error: error.response ? error.response.data : null,
          type: `${type}_ERROR`,
        })

        if (callback) callback(error)
      })
  }
