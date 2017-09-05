import { Action } from 'redux'

import { Schema, Value } from './selectors'

export enum ReduxFilterActionTypes {
  ADD_INPUT = 'reduxFilter/ADD_INPUT',
  UPDATE_INPUT = 'reduxFilter/UPDATE_INPUT',
  REMOVE_INPUT = 'reduxFilter/REMOVE_INPUT',
  SET_SCHEMA = 'reduxFilter/SET_SCHEMA',
  UPDATE_SCHEMA = 'reduxFilter/UPDATE_SCHEMA',
}

export interface SetSchemaAction extends Action {
  type: ReduxFilterActionTypes.SET_SCHEMA
  meta: { filter: string }
  payload: Schema
}

export function setSchema(filter: string, schema: Schema): SetSchemaAction {
  return {
    type: ReduxFilterActionTypes.SET_SCHEMA,
    meta: { filter },
    payload: schema,
  }
}

export interface AddInputAction extends Action {
  type: ReduxFilterActionTypes.ADD_INPUT
  meta: { filter: string }
  payload: { name: string; field: string; value: Value }
}

export function addInput(
  filter: string,
  name: string,
  field: string,
  value: Value,
): AddInputAction {
  return {
    type: ReduxFilterActionTypes.ADD_INPUT,
    meta: { filter },
    payload: { name, field, value },
  }
}

export type ReduxFilterAction = SetSchemaAction | AddInputAction
