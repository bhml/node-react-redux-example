import request from 'axios'

export const TYPES = {
  SCHEDULE_LOAD: 'SCHEDULE_LOAD',
  SCHEDULE_SAVE: 'SCHEDULE_SAVE',
}

const baseUri = '/schedules'

export const loadSchedules = callback =>
  (dispatch) => {
    dispatch({ type: `${TYPES.SCHEDULE_LOAD}_REQUEST` })

    return request.get(baseUri)
      .then((response) => {
        dispatch({
          type: `${TYPES.SCHEDULE_LOAD}_SUCCESS`,
          schedules: response.data,
        })
        if (callback) callback(null, response.data)
      })
      .catch((error) => {
        dispatch({
          type: `${TYPES.SCHEDULE_LOAD}_ERROR`,
          error: error.response.data,
        })
        if (callback) callback(error)
      })
  }

export const saveSchedule = (text, callback) =>
  (dispatch) => {
    dispatch({ type: `${TYPES.SCHEDULE_SAVE}_REQUEST` })

    return request.post(baseUri, text, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        dispatch({
          type: `${TYPES.SCHEDULE_SAVE}_SUCCESS`,
          schedule: response.data,
        })
        if (callback) callback(null, response.data)
      })
      .catch((error) => {
        dispatch({
          type: `${TYPES.SCHEDULE_SAVE}_ERROR`,
          error: error.response.data,
        })
        if (callback) callback(error)
      })
  }
