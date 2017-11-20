import React from 'react'
import TitleBar from './TitleBar'
import Divider from 'material-ui/Divider';

import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import OpenIcon from 'material-ui-icons/OpenInNew'

const descriptionStyle = {
  color: '#555555',
  fontFamily: 'Roboto'
}

const SubsystemPanel = props => {


  const termData = props.selectedTerm.data

  const keys = Object.keys(termData)

  const filtered = keys.filter(key => {
    return (key.startsWith('Display'))
  })

  return (
    <div style={descriptionStyle}>
      <Divider/>

      <List>
        {
          filtered.map((key, i) =>

            (<ListItem
              button
              onClick={handleClick(key)}
              key={i}
            >
              <ListItemIcon>
                <OpenIcon/>
              </ListItemIcon>
              <ListItemText
                primary={termData[key]}
                secondary={key.replace('Display_', '')}
              />
            </ListItem>))
        }
      </List>
    </div>
  )
}

const handleClick = (key) => {

}


export default SubsystemPanel
