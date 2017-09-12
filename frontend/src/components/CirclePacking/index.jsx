import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import {Map} from 'immutable'

import * as d3Hierarchy from 'd3-hierarchy'
import * as d3Selection from 'd3-selection'

class CirclePacking extends Component {

  // Initialize
  componentWillMount() {}

  hovered = hover => {
    return d => {
      d3Selection.selectAll(d.ancestors().map(d => {
        return d.node;
      })).classed("node--hover", hover);
    }
  }

  componentDidMount() {
    const tree = this.props.network
    const root = this.getTree('CLIXO:141', tree)

    const d3tree = d3Hierarchy.tree().size([800, 800]).separation(function(a, b) {
      return (a.parent == b.parent
        ? 1
        : 2) / a.depth;
    });

    d3tree(root)
    console.log('---------- Done! -------------')
    console.log(root)
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    console.log('------------- Circle Packing ---------------')
    console.log(this.props)

    const networkAreaStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    };

    return (
      <svg></svg>
    )
  }

  getTree = (root, tree) => {
    const nodes = tree.elements.nodes
    let rootId = null;
    const nodeMap = {}
    for (let node of nodes) {
      nodeMap[node.data.id] = node.data.name

      if (node.data.name === root) {
        rootId = node.data.id
      }
    }

    console.log(nodeMap)

    const csv = []
    csv.push({name: rootId, parent: ""})

    const edges = tree.elements.edges
    edges.forEach(edge => {
      const source = edge.data.source
      const target = edge.data.target

      csv.push({name: source, parent: target})
    })

    console.log('********** ROOT: ' + rootId)
    console.log(csv)
    const d3tree = d3Hierarchy.stratify().id(function(d) {
      return d.name;
    }).parentId(function(d) {
      return d.parent;
    })(csv);

    console.log(d3tree)
    return d3tree
  }

}

export default CirclePacking
