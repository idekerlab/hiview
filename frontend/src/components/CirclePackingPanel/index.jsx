import React, { Component } from 'react'
import { CirclePackingRenderer, CyTreeViewer } from 'cy-tree-viewer'
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

    const name = data.props.name.split('.')[0]
    const geneIds = groups[name]

    if (geneIds === null || geneIds === undefined) {
      return
    }

    this.setState({
      selectedGroups: this.state.selectedGroups.add(id)
    })

    geneIds.forEach(gene => this.state.selectedGenes.add(gene))

    // window.setTimeout(() => {
    //   actions.selectNodes({
    //     idList: [...this.state.selectedGenes],
    //     selectedColor: 'green'
    //   })
    // }, 0)
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

      if(!data.name) {
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
      this.props.rawInteractionsActions.deselectPerm(geneIds)
      this.props.selectionActions.deselectSubNode(id)

      const subSelection = this.props.selection.get('subSelection')
      console.log('deselect called: GENES:::', geneIds, subSelection)

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

      if(!data.name) {
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
      this.props.selectionActions.selectSubNode(nodeId)

      const subSelection = this.props.selection.get('subSelection')
      console.log('Selected called: GENES:::', geneIds, subSelection)

    }

    const hoverOnNode = (id, data, parent) => {
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

      // this.props.interactionsCommandActions.selectNodes({
      //   idList: geneIds,
      //   selectedColor: 'red'
      // })
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
            selected={this.props.search.result}
            tree={this.state.tree}
            eventHandlers={this.getEventHandlers()}
            width={this.props.style.width}
            height={this.props.style.height}
            rendererOptions={this.props.renderingOptions}
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
