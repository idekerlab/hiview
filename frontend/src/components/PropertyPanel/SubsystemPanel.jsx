import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import BrowserTargets from '../../assets/browser-targets'

const GO_LINK = 'http://amigo.geneontology.org/amigo/term/'

const HIDDEN_TAGS = [
  'x_pos',
  'y_pos',
  'Vis_Shape',
  'Vis_Fill_Color',
  'Vis_Border_Paint',
]

const hiddenSet = new Set(HIDDEN_TAGS)
class SubsystemPanel extends Component {
  render() {
    const { selectedTerm } = this.props

    // This contains all property for the term
    const termData = selectedTerm.data
    const keys = Object.keys(termData)
    let filteredKeys = keys.filter((key) => !hiddenSet.has(key))
    // Sort the keys
    filteredKeys = filteredKeys.sort()

    return (
      <List>
        {filteredKeys.map((key, i) => {
          const value = termData[key]
          if (!value) {
            return
          }

          return (
            <ListItem button onClick={this.handleClick(value)} key={i}>
              <ListItemText primary={value} secondary={key} />
            </ListItem>
          )
        })}
      </List>
    )
  }

  handleClick = (value) => () => {
    if (value.toString().startsWith('GO')) {
      window.open(GO_LINK + value.toString(), BrowserTargets.GeneOntology)
    }
  }
}

export default SubsystemPanel
