import * as React from 'react'

import { connect } from 'react-redux'

export default (name: string) => (WrappedComponent: React.ComponentClass) => {
  const mapStateToProps = state => {}
  const mapDispatchToProps = {}

  class Filter extends React.PureComponent {
    public render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Filter)
}
