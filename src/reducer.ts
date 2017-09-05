import { Map } from 'immutable'

import { ReduxFilterActionTypes, ReduxFilterAction } from './actions'

const initialState = Map()

export default (state = initialState, action: ReduxFilterAction) => {
  const { type } = action
  switch (type) {
    case ReduxFilterActionTypes.SET_SCHEMA:
      const { filter } = action.meta
      return state.setIn([filter, 'schema'], action.payload)
    default:
      return state
  }
}
