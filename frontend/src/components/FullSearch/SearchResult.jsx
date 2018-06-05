import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import OpenIcon from 'material-ui-icons/OpenInNew'

import Collapse from 'material-ui/transitions/Collapse'

import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'

import AliasList from './AliaseList'

class SearchResult extends Component {
  state = {}

  buildNestedList = (idList, id2prop) => {
    const nestedList = {}

    // Creates basic structure only with original nodes
    idList.forEach(id => {
      const props = id2prop[id]
      if (!props.Hidden) {
        nestedList[props.Label] = {
          props: props,
          children: {
            [id]: props
          }
        }
      }
    })

    idList.forEach(id => {
      const props = id2prop[id]
      if (props.Hidden) {
        const label = props.Label
        const parent = nestedList[label]
        if (parent !== undefined) {
          parent.children[id] = props
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
    const windowHeight = window.innerHeight * 0.75

    const resultStyle = {
      height: windowHeight,
      overflow: 'auto'
    }

    let results = this.props.search.result

    if (results === undefined || results === null) {
      return (
        <List style={resultStyle}>
          <ListItem>
            <ListItemText primary={'No result!'} />
          </ListItem>
        </List>
      )
    }

    const id2prop = this.props.id2prop
    const nestedList = this.buildNestedList(results, id2prop)
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
