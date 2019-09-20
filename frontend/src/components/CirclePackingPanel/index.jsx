import React, { Component } from 'react'
import { CirclePackingRenderer, CyTreeViewer } from '@cytoscape/cy-tree-viewer'
import cyjs2tree from './cyjs2tree'
import { Set } from 'immutable'

const TreeViewer = CyTreeViewer(CirclePackingRenderer)

class CirclePackingPanel extends Component {
  state = {
    tree: null,
    hover: null,
    hoverNodes: null,
    selectedGroups: Set(),
    selectedGenes: []
  }

  componentDidMount() {
    const tree = cyjs2tree(this.props.network, this.props.networkActions)
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

    const name = data.props.name.split('.')[0]
    const geneIds = groups[name]

    if (geneIds === null || geneIds === undefined) {
      return
    }

    this.setState({
      selectedGroups: this.state.selectedGroups.add(id)
    })

    geneIds.forEach(gene => this.state.selectedGenes.add(gene))
  }

  getEventHandlers = () => {
    const selectNode = (id, data, zoom) => {
      const wrappedData = {
        props: data
      }

      if (zoom) {
        // Move focus to new node

        // Clear all selected nodes
        this.setState({
          hover: null,
          hoverNodes: null,
          selectedGroups: Set(),
          selectedGenes: Set()
        })

        this.props.selectPrimaryNode([id], { [id]: wrappedData })
        this.props.rawInteractionsActions.clearSelectedPerm()
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

    const deselectNode = (id, data) => {
      if (!id || !data) {
        return
      }

      if (!data.name) {
        return
      }

      const groups = this.props.groups
      if (!groups) {
        return
      }

      let name = data.Original_Name
      if (name === undefined) {
        name = data.name
      }

      this.props.selectionActions.deselectSubNode(id)
      const subNodes = this.props.selection.get('subSelection').toJS()
      const currentSelection = this.props.rawInteractions.get('selectedPerm')
      const subNodeKeys = Object.keys(subNodes)
      let remaining = Set()
      subNodeKeys.forEach(key => {
        remaining = remaining.union(Set(subNodes[key]))
      })
      const toBeRemoved = currentSelection.subtract(remaining)
      this.props.rawInteractionsActions.deselectPerm(toBeRemoved.toJS())
    }

    const hoverOutNode = (id, data) => {
      if (this.props.rawInteractions.get('selected').length !== 0) {
        this.props.rawInteractionsActions.setSelected([])
      }
    }

    const selectNodes = (nodeId, data) => {
      // This will be called only when CTR-click is called in renderer.
      if (!data) {
        return
      }

      if (!data.name) {
        return
      }

      const groups = this.props.groups
      if (!groups) {
        return
      }

      let name = data.Original_Name
      if (name === undefined) {
        name = data.name
      }

      const geneIds = groups[name]
      this.props.rawInteractionsActions.setSelectedPerm(geneIds)
      this.props.selectionActions.selectSubNode({
        nodeId,
        geneIds
      })
    }

    const hoverOnNode = (id, data, parent) => {
      const t1 = performance.now()
      // Check invalid parameter.  Name is always required
      if (
        data === null ||
        data.props === null ||
        data.props.name === undefined
      ) {
        return
      }

      const groups = this.props.groups
      if (!groups) {
        return
      }

      // Set selected state
      this.props.selectionActions.enterNode(data)
      const currentSelection = this.props.selection.get('main').nodeId
      if (id === currentSelection) {
        this.props.rawInteractionsActions.setSelected([])
        return
      }
      let name = data.props.Original_Name
      if (name === undefined) {
        name = data.props.name
      }

      const geneIds = groups[name]
      if (!geneIds) {
        this.props.rawInteractionsActions.setSelected([])
      } else {
        this.props.rawInteractionsActions.setSelected(geneIds)
      }
    }

    return {
      selectNode,
      selectNodes,
      hoverOutNode,
      hoverOnNode,
      deselectNode
    }
  }

  render() {
    // Search result is the selected ones.

    const selected = this.props.localSearch.ids
    return (
      <div
        ref={containerElement => (this.containerElement = containerElement)}
        style={this.props.style}
      >
        {this.state.tree === null ? (
          <div />
        ) : (
          <TreeViewer
            command={this.props.command}
            selected={selected}
            highlight={this.props.selection.get('highlight')}
            tree={this.state.tree}
            eventHandlers={this.getEventHandlers()}
            width={this.props.style.width}
            height={this.props.style.height}
            rendererOptions={this.props.renderingOptions}
            depth={this.props.depth}
          />
        )}
      </div>
    )
  }
}

export default CirclePackingPanel
