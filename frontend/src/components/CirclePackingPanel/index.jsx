import React, { Component } from 'react'

import { CirclePackingRenderer, CyTreeViewer } from 'cy-tree-viewer'

import cyjs2tree from './cyjs2tree'

const TreeViewer = CyTreeViewer(CirclePackingRenderer)

class CirclePackingPanel extends Component {
  state = {
    tree: null,
    hover: null,
    hoverNodes: null,
    selectedGroups: new Set()
  }

  componentDidMount() {
    // Initialization
    const tree = cyjs2tree(this.props.network)
    this.setState({
      tree
    })
  }

  selectGroups = (id, data, groups, actions) => {
    if (data.props === undefined) {
      return
    }

    if (data.props.name === undefined) {
      return
    }

    console.log(data)
    const name = data.props.name.split('.')[0]
    const geneIds = groups[name]

    if (geneIds === null || geneIds === undefined) {
      return
    }

    console.log('$$$$$$$$$$$$$$$$ADDED ID')
    this.setState({
      selectedGroups: this.state.selectedGroups.add(id)
    })

    console.log(this.state.selectedGroups)

    window.setTimeout(() => {
      actions.selectNodes({
        idList: geneIds,
        selectedColor: 'green'
      })
    }, 0)
  }

  getEventHandlers = () => {
    const selectNode = (id, data, zoom) => {
      const wrappedData = {
        props: data
      }

      if (zoom) {
        this.props.selectNodes([id], { [id]: wrappedData })
      } else {
        this.selectGroups(
          id,
          wrappedData,
          this.props.groups,
          this.props.interactionsCommandActions
        )
      }
      // this.props.commandActions.zoomToNode(id)
    }

    const deselectNode = id => {
      if (id === null) {
        return
      }

      if (this.state.hoverNodes !== null) {
        if (!this.state.selectedGroups.has(id)) {
          this.props.interactionsCommandActions.unselectNodes({
            idList: this.state.hoverNodes
          })
        }
      }
    }

    const hoverOnNode = (id, data) => {
      // Special case: gene
      // if(data !== null) {
      //   const nodeType = data.NodeType
      //   if(nodeType === "Gene") {
      //     this.props.interactionsCommandActions.selectNodes({
      //       idList: [id],
      //       selectedColor: 'red'
      //     })
      //
      //     return
      //   }
      // }


      if (data === null || data.props === null || data.props.name === undefined) {
        return
      }

      console.log(data)
      const name = data.props.name.split('.')[0]

      const groups = this.props.groups
      if (groups === undefined) {
        return
      }

      const geneIds = groups[name]

      if (geneIds === null || geneIds === undefined) {
        return
      }

      if(this.state.selectedGroups.has(id)) {
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
      hoverOnNode,
      deselectNode
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
