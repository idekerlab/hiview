import React from 'react'

class SaveAsSvgButtonErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true })
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return null
    }

    return this.props.children
  }
}

export default SaveAsSvgButtonErrorBoundary
