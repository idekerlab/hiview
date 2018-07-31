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

    const getName = (id, data) => {
      if (data === null || data === undefined) {
        return null
      }

      let name = data.Original_Name
      if (name === undefined) {
        name = data.name
      }

      return name
    }

    const getGeneIds = name => {
      const groups = this.props.groups
      if (groups === undefined) {
        return
      }

      return groups[name]
    }

    const hoverOutNode = (id, data) => {
      if (this.props.rawInteractions.get('selected').length !== 0) {
        this.props.rawInteractionsActions.setSelected([])
      }

      // const name = getName(id, data)
      // if (name === null) {
      //   return
      // }
      //
      // const geneIds = getGeneIds(name)
      // if (geneIds === null || geneIds === undefined) {
      //   return
      // }
      //
      // const subSelectionSet = this.props.selection.get('subSelection')
      //
      // // 1. No sub selection
      // if(subSelectionSet.size === 0) {
      //   this.props.interactionsCommandActions.unselectNodes({
      //     idList: geneIds
      //   })
      //   return
      // }
      //
      // if (subSelectionSet.has(name)) {
      //   this.props.interactionsCommandActions.selectNodes({
      //     idList: this.state.selectedGenes,
      //     selectedColor: 'green'
      //   })
      //   return
      // }
      //
      // // Case 2: Hover, but no permanent selection
      // this.props.interactionsCommandActions.unselectNodes({
      //   idList: geneIds
      // })
      //
      // if (subSelectionSet.size !== 0) {
      //   this.props.interactionsCommandActions.selectNodes({
      //     idList: this.state.selectedGenes,
      //     selectedColor: 'green'
      //   })
      // }

      // // Case 3: permanent selection is not empty
      // this.props.interactionsCommandActions.unselectNodes({
      //   idList: this.state.hoverNodes
      // })
      // this.setState({
      //   hover: null,
      //   hoverNodes: null
      // })
      //
      // this.props.interactionsCommandActions.selectNodes({
      //   idList: this.state.selectedGenes,
      //   color: 'red'
      // })

      // const hoverSelectionSet = Set(this.state.hoverNodes)
      // const permanentSelectionSet = this.state.selectedGenes

      // this.props.interactionsCommandActions.unselectNodes({
      //   idList: this.state.hoverNodes
      // })
      //
      // window.setTimeout(() => {
      //   this.props.interactionsCommandActions.selectNodes({
      //     idList: [...this.state.selectedGenes],
      //     selectedColor: 'green'
      //   })
      // }, 0)
    }

    const selectNodes = (nodeId, data) => {
      // const subSelectionSet = this.props.selection.get('subSelection')
      //
      // let name = data.Original_Name
      // if (name === undefined) {
      //   name = data.name
      // }
      //
      // const groups = this.props.groups
      // if (groups === undefined) {
      //   return
      // }
      //
      // let selectedSubsystems = null
      //
      // if (subSelectionSet.has(name)) {
      //   this.props.selectionActions.deselectSubNode(name)
      //   selectedSubsystems = subSelectionSet.delete(name)
      //   if(selectedSubsystems.size === 0) {
      //     this.props.interactionsCommandActions.unselectNodes({
      //       idList: groups[name]
      //     })
      //     return
      //   }
      // } else {
      //   this.props.selectionActions.selectSubNode(name)
      //   selectedSubsystems = subSelectionSet.add(name)
      // }
      //
      // const geneIds = []
      //
      // selectedSubsystems.forEach(subsystemName => {
      //   const genes = groups[subsystemName]
      //   genes.forEach(gene => {
      //     geneIds.push(gene.toString())
      //   })
      // })
      //
      // const geneSet = new Set(geneIds)
      // const idList = [...geneSet]
      //
      // this.setState({ selectedGenes: idList })
      //
      // this.props.interactionsCommandActions.selectNodes({
      //   idList,
      //   selectedColor: 'green'
      // })
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
