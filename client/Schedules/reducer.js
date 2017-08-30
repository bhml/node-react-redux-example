import { TYPES } from './actions'

const initialState = {
  items: [],
  errors: {
    list: null,
    create: null,
  },
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case `${TYPES.SCHEDULE_LOAD}_REQUEST`:
    case `${TYPES.SCHEDULE_SAVE}_REQUEST`:
      return {
        ...state,
        loading: true,
        errors: {
          list: null,
          create: null,
        },
      }

    case `${TYPES.SCHEDULE_LOAD}_ERROR`:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          list: action.error,
        },
      }

    case `${TYPES.SCHEDULE_SAVE}_ERROR`:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          create: action.error,
        },
      }

    case `${TYPES.SCHEDULE_LOAD}_SUCCESS`:
    case `${TYPES.SCHEDULE_SAVE}_SUCCESS`:
      return {
        ...state,
        loading: false,
        items: action.data,
      }

    default:
      return state
  }
}
