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
    console.log('################### local res array:', resultArray)
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
    console.log('################### local search:', localSearch)
    const results = localSearch.results

    const windowHeight = window.innerHeight * 0.75

    const resultStyle = {
      height: windowHeight,
      overflow: 'auto'
    }

    // let results = this.props.search.result

    if (results === undefined || results === null || results === {}) {
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
        {parents.map((parent, i) => (
          <div key={'parent-' + i}>
            <ListItem>
              <ListItemText
                primary={nestedList[parent].props.Label}
                secondary={nestedList[parent].props.NodeType}
              />
              {this.state[parent] ? (
                <ExpandLess onClick={e => this.handleToggle(parent)} />
              ) : (
                <ExpandMore onClick={e => this.handleToggle(parent)} />
              )}
            </ListItem>

            <Collapse
              component="li"
              in={this.state[parent]}
              timeout="auto"
              unmountOnExit
            >
              <AliasList
                rootId={this.props.rootId}
                aliases={nestedList[parent].children}
                commandActions={this.props.commandActions}
                selectionActions={this.props.selectionActions}
                currentPath={this.props.currentPath}
                uiState={this.props.uiState}
              />
            </Collapse>
          </div>
        ))}
      </List>
    )
  }
}

export default SearchResult
