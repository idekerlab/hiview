import React from 'react'
import OpenIcon from 'material-ui-icons/OpenInNew'
import Typography from 'material-ui/Typography';

import style from './style.css'

const titleContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  margin: 0,
  padding: '1.5em'
}

const TitleBar = props => (

  <div style={titleContainerStyle}>
    <OpenIcon
      className={style.linkIcon}
      onClick={handleClick(props.geneSymbol)}
    />
    <Typography variant="display1" align="center" style={{fontSize: '1.6em'}}>
      {props.title}
    </Typography>
  </div>
)


const handleClick = gene => () => {
  window.open(`http://www.genecards.org/cgi-bin/carddisp.pl?gene=${gene}`)
}


export default TitleBar
