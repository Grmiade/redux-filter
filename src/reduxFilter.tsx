import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { addInput, setSchema } from './actions'
import { getFilter, Schema, Value } from './selectors'

export interface Options {
  initialSchema?: Schema
}

export interface Props {
  filter: (obj: any) => boolean
  addInput: (name: string, field: string, value: Value) => any
  setSchema: (schema: Schema) => any
}

export default (filterName: string, options?: Options) => (
  WrappedComponent: React.ComponentClass,
) => {
  const mapStateToProps = state => ({
    filter: getFilter(name)(state),
  })

  const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
    addInput: (name: string, field: string, value: Value) =>
      dispatch(addInput(filterName, name, field, value)),
    setSchema: (schema: Schema) => dispatch(setSchema(filterName, schema)),
  })

  class Filter extends React.PureComponent<Props> {
    public componentDidMount() {
      this.props.setSchema(options.initialSchema)
    }

    public render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Filter)
}
