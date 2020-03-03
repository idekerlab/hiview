import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {ListItemAvatar} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";


const HOVER_TIMEOUT = 50 // Event will be fired after 180ms
let task = null

class SearchResult extends Component {
  state = {}

  buildNestedList = (resultArray, id2color) => {
    const nestedList = {}

    // Creates basic structure only with original nodes
    resultArray.forEach(entry => {
      if (!entry.Hidden) {
        nestedList[entry.Label] = {
          props: entry,
          color: id2color.get(entry.id),
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
    // this.props.commandActions.findPath([nodeId, rootId])
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
    const {results, id2color} = localSearch
    const windowHeight = window.innerHeight * 0.75

    const resultStyle = {
      height: windowHeight,
      overflow: 'auto'
    }

    if (results === undefined || results === null || results.size === 0) {

      return (
        <List style={resultStyle}>
          <ListItem>
            <ListItemText primary={'No result!'} />
          </ListItem>
        </List>
      )
    }

    const nestedList = this.buildNestedList(results, id2color)
    const parents = Object.keys(nestedList)

    return (
      <List style={resultStyle}>
        {parents.map((parent, i) => {
          const children = nestedList[parent].children
          const key = nestedList[parent].props.Label
          const geneColor = nestedList[parent].color

          return (
            <div key={'parent-' + i}>
              <ListItem
                button
                onMouseOver={e => this.handleMouseOver(key, children)}
                onMouseOut={e => this.handleMouseOut(key, children)}
                style={{ backgroundColor: this.state['hoverBgColor' + key] }}
              >
                <ListItemText
                  style={{ color: geneColor, fontWeight: 700 }}
                  primary={nestedList[parent].props.Label}
                  secondary={nestedList[parent].props.NodeType}
                />
                <ListItemSecondaryAction>
                  <ListItemAvatar>
                    <Avatar style={{backgroundColor: geneColor}}>G</Avatar>
                  </ListItemAvatar>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          )
        })}
      </List>
    )
  }

  handleMouseOver = (nodeId, children) => {
  
    task = setTimeout(() => this.runHighlight(nodeId, children), HOVER_TIMEOUT)
  }

  handleMouseOut = nodeId => {
    window.clearTimeout(task)
    
    this.props.selectionActions.removeHighlightNode()
    const colorId = 'hoverBgColor' + nodeId
    this.setState({ [colorId]: '#FFFFFF' })
  }

  runHighlight = (nodeId, children) => {
    const idList = Object.keys(children)
    this.props.selectionActions.highlightNode(idList)
    const colorId = 'hoverBgColor' + nodeId
    this.setState({ [colorId]: 'rgba(250, 250, 0, 0.3)' })
  }
}

export default SearchResult

let block = false