import React, { Component } from 'react'

import { CirclePackingRenderer, CyTreeViewer } from 'cy-tree-viewer'

const TreeViewer = CyTreeViewer(CirclePackingRenderer)

class CirclePackingPanel extends Component {
  state = {
    tree: null
  }

  componentWillMount() {}

  componentDidMount() {
    // Initialization
  }

  componentWillReceiveProps(nextProps) {}

  getEventHandlers = () => {
    const selectNode = (id, data) => {
      console.log('Seleected = ' + id)
      this.setState({
        selected: id
      })
    }

    const hoverOnNode = (id, data) => {
      console.log('hover = ' + id)
      this.setState({
        hover: id
      })
    }

    return {
      selectNode,
      hoverOnNode
    }
  }

  render() {
    console.log('------------- Circle Packing ---------------')
    console.log(this.props)

    if (this.state.tree === null) {
      return <div />
    }

    return (
      <TreeViewer
        {...this.props}
        eventHandlers={this.getEventHandlers()}
        size={300}
      />
    )
  }
}

export default CirclePackingPanel
