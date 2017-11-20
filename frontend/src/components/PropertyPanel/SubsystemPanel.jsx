import React, {Component} from 'react'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import OpenIcon from 'material-ui-icons/OpenInNew'
import InfoIcon from 'material-ui-icons/InfoOutline'

const descriptionStyle = {
  color: '#555555',
  fontFamily: 'Roboto',
}

const GO_LINK = 'http://amigo.geneontology.org/amigo/term/'


class SubsystemPanel extends Component {


  render() {
    const termData = this.props.selectedTerm.data
    const keys = Object.keys(termData)
    const filtered = keys.filter(key => ( key.startsWith('Display')))

    return (
      <div style={descriptionStyle}>

        <List>
          {
            filtered.map((key, i) => {

              const label = key.replace('Display_', '').replace(/_/g, ' ')
              const value = termData[key]

              return (
                <ListItem
                  button
                  onClick={this.handleClick(value)}
                  key={i}
                >
                  <ListItemIcon>
                    {value.toString().startsWith('GO:') ? <OpenIcon/>: <InfoIcon/>}
                  </ListItemIcon>
                  <ListItemText
                    primary={value}
                    secondary={label}
                  />
                </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }

  handleClick = value => () => {

    console.log(value)
    window.open(GO_LINK + value.toString())
  }
}



export default SubsystemPanel
