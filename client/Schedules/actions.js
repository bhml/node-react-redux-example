import request from 'axios'

export const TYPES = {
  SCHEDULE_LOAD: 'SCHEDULE_LOAD',
  SCHEDULE_SAVE: 'SCHEDULE_SAVE',
}

const baseUri = '/schedules'

export const loadSchedules = callback => ({
  type: TYPES.SCHEDULE_LOAD,
  request: request.get(baseUri),
  callback,
})

export const saveSchedule = (text, callback) => ({
  type: TYPES.SCHEDULE_SAVE,
  request: request.post(
    baseUri,
    text,
    { headers: { 'Content-Type': 'application/json' } },
  ),
  callback,
})
