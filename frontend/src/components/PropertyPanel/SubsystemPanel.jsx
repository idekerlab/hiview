import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import OpenIcon from '@material-ui/icons/OpenInNew'
import InfoIcon from '@material-ui/icons/InfoOutlined'

import BrowserTargets from '../../assets/browser-targets'

const descriptionStyle = {
  color: '#555555',
  fontFamily: 'Roboto',
}

const GO_LINK = 'http://amigo.geneontology.org/amigo/term/'

class SubsystemPanel extends Component {
  render() {
    let displayOrder = null
    const networkData = this.props.networkData
    if (networkData) {
      const displayOrderStr = networkData.Display
      if (displayOrderStr) {
        displayOrder = displayOrderStr.split('|')
        displayOrder = displayOrder.map(key => ('Display_' + key).replace(/ /g, '_'))
      }
    }

    // This contains all property for the term
    const termData = this.props.selectedTerm.data
    const keys = Object.keys(termData)

    let filteredKeys = keys.filter(key => key.startsWith('Display'))

    // Force to add special key: name
    filteredKeys.push('name')

    if (displayOrder) {
      filteredKeys = displayOrder
    }

    return (
      <List>
        {filteredKeys.map((key, i) => {
          const label = key.replace('Display_', '').replace(/_/g, ' ')
          const value = termData[key]
          if (!value) {
            return
          }

          return (
            <ListItem button onClick={this.handleClick(value)} key={i}>
              <ListItemIcon>{value.toString().startsWith('GO:') ? <OpenIcon /> : <InfoIcon />}</ListItemIcon>
              <ListItemText primary={value} secondary={label} />
            </ListItem>
          )
        })}
      </List>
    )
  }

  handleClick = value => () => {
    if (value.toString().startsWith('GO')) {
      window.open(GO_LINK + value.toString(), BrowserTargets.GeneOntology)
    }
  }
}

export default SubsystemPanel
