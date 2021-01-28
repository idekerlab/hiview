import React, { Component } from 'react'
import { CirclePackingRenderer, CyTreeViewer } from '@cytoscape/cy-tree-viewer'
import cyjs2tree from './cyjs2tree'
import { Set } from 'immutable'
import { findPath } from './path-finder'

const TreeViewer = CyTreeViewer(CirclePackingRenderer)

// For hover on node timeout
const HOVER_TIMEOUT = 200 // Event will be fired after 180ms
let task = null
let clearTask = null
let memberCount = 0
let expandId = null

class CirclePackingPanel extends Component {
  state = {
    hover: null,
    hoverNodes: null,
    selectedGroups: Set(),
    selectedGenes: []
  }

  componentDidMount() {
    const cyjs = this.props.network.get('cyjs')
    const tree = cyjs2tree(cyjs, this.props.networkActions)
    this.props.networkActions.setHierarchy(tree)
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
    const selectNode = (id, data, zoom, node) => {
      if (id === expandId) {
        return
      }
      expandId = id

      this.props.rawInteractionsActions.clearAll()

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

        const path = findPath(node)
        const reorderedPath = path.reverse()
        this.props.networkActions.setCurrentPath(reorderedPath)

        const positions = extractPositions(node)
        this.props.rawInteractionsActions.setGroupPositions(positions)
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

    const runHighlight = (id, data, groups) => {
      // Set selected state
      // this.props.selectionActions.enterNode(data)

      const currentSelection = this.props.selection.get('main').nodeId
      if (id === currentSelection) {
        // this.props.rawInteractionsActions.setSelected([])
        return
      }
      let name = data.props.Original_Name
      if (name === undefined) {
        name = data.props.name
      }

      const geneIds = groups[name]

      if (!geneIds) {
        // this.props.rawInteractionsActions.setSelected([])
      } else {
        memberCount = geneIds.length
        console.log(
          '# Actual Highlight start: id and count',
          id,
          geneIds.length
        )
        this.props.rawInteractionsActions.setSelected(geneIds)
      }
    }

    const hoverOnNode = (id, data, parent) => {
      window.clearTimeout(clearTask)
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
      task = setTimeout(() => runHighlight(id, data, groups), HOVER_TIMEOUT)
    }

    const hoverOutNode = (id, data) => {
      window.clearTimeout(task)
      clearTask = setTimeout(() => clear(), 500)
    }

    const clear = () => {
      this.props.rawInteractionsActions.setSelected([])
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
    const searchResults = this.props.localSearch
    let highlight = this.props.selection.get('highlight')

    let id2color = searchResults.id2color

    const treeData = this.props.network.get('hierarchy')
    return (
      <div
        ref={containerElement => (this.containerElement = containerElement)}
        style={this.props.style}
      >
        <TreeViewer
          command={this.props.command}
          selected={id2color}
          highlight={highlight}
          tree={treeData}
          eventHandlers={this.getEventHandlers()}
          width={this.props.style.width}
          height={this.props.style.height}
          rendererOptions={this.props.renderingOptions}
          depth={this.props.depth}
          setHierarchy={this.props.networkActions.setHierarchy}
        />
      </div>
    )
  }
}

const extractPositions = parent => {
  const positions = {}
  const children = parent.children
  if (children === undefined) {
    return positions
  }

  children.forEach(node => {
    // Extract ID of current node
    let id = node.data.data.props.name
    if (node.data.data.props.NodeType === 'Gene') {
      id = node.data.data.props.Label
    }
    positions[id] = {
      r: node.r,
      x: node.x,
      y: node.y
    }
  })

  return positions
}

export default CirclePackingPanel
