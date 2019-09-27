import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Collapse from '@material-ui/core/Collapse'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import AliasList from './AliaseList'

class SearchResult extends Component {
  state = {}

  buildNestedList = resultArray => {
    const nestedList = {}

    // Creates basic structure only with original nodes
    resultArray.forEach(entry => {
      if (!entry.Hidden) {
        nestedList[entry.Label] = {
          props: entry,
          children: {
            [entry.id]: entry
          }
        }
      }
    })

    resultArray.forEach(entry => {
      if (entry.Hidden) {
        const label = entry.Label
        const parent = nestedList[label]
        if (parent !== undefined) {
          parent.children[entry.id] = entry
        }
      }
    })

    return nestedList
  }

  handleClick = (nodeId, rootId) => {
    this.props.commandActions.findPath([nodeId, rootId])
  }

  handleToggle = label => {
    if (this.state[label] === undefined) {
      this.setState({ [label]: true })
    } else {
      this.setState({ [label]: !this.state[label] })
    }
  }

  render() {
    const { localSearch } = this.props
    const results = localSearch.results

    const windowHeight = window.innerHeight * 0.75

    const resultStyle = {
      height: windowHeight,
      overflow: 'auto'
    }

    if (!results || results === []) {
      return (
        <List style={resultStyle}>
          <ListItem>
            <ListItemText primary={'No result!'} />
          </ListItem>
        </List>
      )
    }

    const nestedList = this.buildNestedList(results)
    const parents = Object.keys(nestedList)

    return (
      <List style={resultStyle}>
        {parents.map((parent, i) => {
          const children = nestedList[parent].children
          const key = nestedList[parent].props.Label
          return (
            <div key={'parent-' + i}>
              <ListItem
                button
                onMouseOver={e => this.handleMouseOver(key, children)}
                onMouseOut={e => this.handleMouseOut(key, children)}
                style={{ backgroundColor: this.state['hoverBgColor' + key] }}
              >
                <ListItemText
                  primary={nestedList[parent].props.Label}
                  secondary={nestedList[parent].props.NodeType}
                />
              </ListItem>
            </div>
          )
        })}
      </List>
    )
  }

  handleMouseOver = (nodeId, children) => {
    const idList = Object.keys(children)
    this.props.selectionActions.highlightNode(idList)
    const colorId = 'hoverBgColor' + nodeId
    this.setState({ [colorId]: 'rgba(250, 250, 0, 0.3)' })
  }

  handleMouseOut = nodeId => {
    this.props.selectionActions.removeHighlightNode()
    const colorId = 'hoverBgColor' + nodeId
    this.setState({ [colorId]: '#FFFFFF' })
  }
}

export default SearchResult
