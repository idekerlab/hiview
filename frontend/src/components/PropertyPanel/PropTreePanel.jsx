import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';

export default class PropTreePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: this.convertToTree(this.props.tree),

    };
  }


  render() {

    const treeAreaStyle = {
      backgroundColor: 'red',
      height: 'inherit'
    }

    const nodeStyle = {
      color: '#444444',
      fontSize: '1.2em',
      // lineHeight: '2em',
      // marginBottom: '1em',
      // overflowY: 'hidden'

    }
    const innerStyle = {
      overflowY: 'hidden',
      borderRadius: 0,

    }

    return (
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          canDrag={false}
          style={nodeStyle}
          innerStyle={innerStyle}
          slideRegionSize={300}
          scaffoldBlockPxWidth={34}
        />
    );
  }

  convertToTree = treeOriginal => {

    const tree = []
    const keys = Object.keys(treeOriginal)
    keys.forEach(key => {
      const value = treeOriginal[key]
      const entry = expand(key, value)

      tree.push(entry)
    })

    return tree
  }

}

const expand = (key, entry) => {
  if (typeof entry === 'number' || typeof entry === 'string' || typeof entry === 'boolean') {
    return {
      title: entry,
      subtitle: key
    }
  } else if (typeof entry === 'object') {

    if (Array.isArray(entry)) {

      const children = entry.map(val => {
        if(typeof val === 'object') {
          const valKey = Object.keys(val)
          if(valKey)
          return expand(val[valKey[0]], val)
        } else {
          return expand('', val)
        }
      })

      return {
        title: key,
        children: children
      }
    } else {
      // This is an standard object
      const objKeys = Object.keys(entry)
      const children = objKeys.map(objKey => expand(objKey, entry[objKey]))
      return {
        title: key,
        children: children
      }
    }
  }
}
