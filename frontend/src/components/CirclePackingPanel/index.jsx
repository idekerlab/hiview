import React, { Component } from 'react'

import { CirclePackingRenderer, CyTreeViewer } from 'cy-tree-viewer'

import cyjs2tree from './cyjs2tree'

const TreeViewer = CyTreeViewer(CirclePackingRenderer)

class CirclePackingPanel extends Component {
  state = {
    tree: null,
    hover: null,
    hoverNodes: null
  }

  componentDidMount() {
    // Initialization
    const tree = cyjs2tree(this.props.network)
    this.setState({
      tree
    })
  }

  getEventHandlers = () => {
    const selectNode = (id, data) => {
      console.log('Seleected = ' + id)
      console.log(data)
      const wrappedData = {
        props: data
      }
      this.props.selectNodes([id], { [id]: wrappedData })
      this.props.commandActions.zoomToNode(id)
    }

    const hoverOnNode = (id, data) => {
      if (id === null) {
        if (this.state.hoverNodes !== null) {
          this.props.interactionsCommandActions.unselectNodes({
            idList: this.state.hoverNodes
          })
        }

        return
      }

      if (data.props.name === undefined) {
        return
      }

      const name = data.props.name.split('.')[0]

      const groups = this.props.groups
      if (groups === undefined) {
        return
      }

      const geneIds = groups[name]

      if (geneIds === null || geneIds === undefined) {
        return
      }

      this.setState({
        hover: id,
        hoverNodes: geneIds
      })

      window.setTimeout(() => {
        this.props.interactionsCommandActions.selectNodes({
          idList: geneIds,
          selectedColor: 'red'
        })
      }, 0)

      // this.props.rawInteractionsActions.selectNodes({
      //   idList: geneIds,
      //   selectedColor: selectedColor,
      //   groupColors: this.state.groupColors
      // });
    }

    return {
      selectNode,
      hoverOnNode
    }
  }

  render() {
    return (
      <div
        ref={containerElement => (this.containerElement = containerElement)}
        style={this.props.style}
      >
        {this.state.tree === null ? (
          <div />
        ) : (
          <TreeViewer
            tree={this.state.tree}
            eventHandlers={this.getEventHandlers()}
            width={this.props.style.width}
            height={this.props.style.height}
          />
        )}
      </div>
    )
  }
}

const handleClick = (nodeId, props) => {
  props.commandActions.zoomToNode(nodeId)
}

export default CirclePackingPanel
