import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import OpenIcon from '@material-ui/icons/OpenInNew'
import Typography from '@material-ui/core/Typography'

import Divider from '@material-ui/core/Divider'
import style from '../style.css'

const GO_URL = 'http://amigo.geneontology.org/amigo/term/'

const GoCategory = props => {
  let category = props.category
  const categoryName = props.name

  if (category === undefined || category === null) {
    return <div />
  }

  if (!Array.isArray(category)) {
    category = [category]
  }

  return (
    <div>
      <ListItem key={categoryName}>
        <Typography type={'h5'}>{categoryName}</Typography>
      </ListItem>

      <Divider />

      {category.map((goTerm, i) => (
        <ListItem key={i}>
          <OpenIcon
            className={style.linkIcon}
            onClick={e => handleGoClick(goTerm.id)}
          />
          <ListItemText primary={goTerm.term} secondary={goTerm.id} />
        </ListItem>
      ))}
    </div>
  )
}

const handleGoClick = goId => {
  window.open(GO_URL + goId)
}
export default GoCategory
