import { createSelector } from 'reselect'

const REDUCER_KEY = 'filter'

export type Value = string | boolean | number
export type Condition = Schema | string

export enum LogicalOperator {
  AND,
  OR,
}

export enum InputOperator {
  IS,
  NOT,
  IN,
}

export interface Schema {
  operator: LogicalOperator
  conditions: Condition[]
}

interface Inputs {
  [name: string]: { field: string; value: Value; operator?: InputOperator }
}

interface Filter {
  schema: Schema
  inputs: Inputs
}

function resolveSchema(obj: any, schema: Schema, variables: Inputs) {
  switch (schema.operator) {
    case LogicalOperator.AND:
      return resolveAND(obj, schema.conditions, variables)
    case LogicalOperator.OR:
      return resolveOR(obj, schema.conditions, variables)
    default:
      return true
  }
}

function resolveInput(obj: any, key: string, inputs: Inputs) {
  const input = inputs[key]
  if (!input) return false

  const { field, operator, value } = input
  switch (operator) {
    case InputOperator.IS:
      return obj[field] === value
    case InputOperator.NOT:
      return obj[field] !== value
    case InputOperator.IN:
      return obj[field].includes(value)
    default:
      return obj[field] === value
  }
}

function isSchema(condition: any): condition is Schema {
  return !!condition.operator
}

function resolveAND(obj: any, conditions: Condition[], inputs: Inputs) {
  return conditions.every(
    condition =>
      isSchema(condition)
        ? resolveSchema(obj, condition, inputs)
        : resolveInput(obj, condition, inputs),
  )
}

function resolveOR(obj: any, conditions: Condition[], inputs: Inputs) {
  return conditions.some(
    condition =>
      isSchema(condition)
        ? resolveSchema(obj, condition, inputs)
        : resolveInput(obj, condition, inputs),
  )
}

function resolveFilter(filter: Filter) {
  return (obj: any) => resolveSchema(obj, filter.schema, filter.inputs)
}

export const getFilter = (name: string) => createSelector(
  state => state[REDUCER_KEY][name].schema,
  state => state[REDUCER_KEY][name].inputs,
  (schema, inputs) => (obj: any) => resolveSchema(obj, schema, inputs)
)

// EXAMPLE

const schema: Schema = {
  operator: LogicalOperator.AND,
  conditions: [{ operator: LogicalOperator.OR, conditions: ['select1', 'select2'] }, 'input1'],
}

const inputs: Inputs = {
  select1: { field: 'supporter', value: 'Pierre', operator: InputOperator.IS },
  select2: { field: 'supporter', value: 'Laura' },
  input1: { field: 'firstMonth', value: 26 },
}

const filter: Filter = { schema, inputs }
console.log(resolveFilter(filter)({ supporter: 'Pierre', firstMonth: 26 })) // true
