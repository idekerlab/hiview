
import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import BrowserTargets from '../../assets/browser-targets'

const GO_LINK = 'http://amigo.geneontology.org/amigo/term/'

// This contains filter information as serialized 
const ATTR_TAG = 'ndex:node_attrs_legend'

class SubsystemPanel extends Component {
  render() {
    const { selectedTerm, networkData } = this.props

    // This contains all property for the term
    const termData = selectedTerm.data
    const attrLegendStr = networkData[ATTR_TAG]
    const attrLegend = JSON.parse(attrLegendStr)
    const attrKeys = Object.keys(attrLegend)
    const sortedKeys = attrKeys.sort()

    return (
      <List>
        {sortedKeys.map((key, i) => {
          const value = termData[key]
          if (!value) {
            return
          }
          return (
            <ListItem button onClick={this.handleClick(value)} key={i}>
              <ListItemText primary={value} secondary={attrLegend[key].displayName} />
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
