import React from 'react'
import {ListItem, ListItemText} from 'material-ui/List'
import OpenIcon from 'material-ui-icons/OpenInNew'
import Typography from 'material-ui/Typography';

import Divider from 'material-ui/Divider';

const GoCategory = (props) => {

  const category = props.category
  const categoryName = props.name

  if (category === undefined) {
    return <div/>
  }

  return (
    <div>
      <ListItem
        key={categoryName}
      >
        <Typography type={'headline'}>
          {categoryName}
        </Typography>
      </ListItem>

      <Divider/>

      {
        category.map((goTerm, i) =>
          (
            <ListItem
              key={i}
            >
              <OpenIcon
              />
              <ListItemText
                primary={goTerm.term}
                secondary={goTerm.id}
              />
            </ListItem>
          ))
      }
    </div>
  )
}

export default GoCategory