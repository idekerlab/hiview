import React from 'react'
import OpenIcon from 'material-ui-icons/OpenInNew'

import style from './style.css'

const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  color: '#333333',
  margin: 0,
  padding: '1em',
  minHeight: '3em',
}

const titleStyle = {
  color: '#333333',
  fontSize: '2.5em',
  fontWeight: 700,
  lineHeight: 1.2,
  margin: 0,
  padding: 0,
}

const subtitleStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#777777',
  fontSize: '2em',
  padding: '0.5em',
  fontWeight: 400
}


const titleContainerStyle = {
  textAlign: 'center',
  margin: 0,
  padding: '0.5em'
}

const TitleBar = props => (
  <div style={baseStyle}>

    <div style={titleContainerStyle}>
      <div style={titleStyle}>
        {props.title}
      </div>

      <div style={subtitleStyle}>
        <OpenIcon
          className={style.linkIcon}
          onClick={handleClick(props.geneSymbol)}/>{props.geneSymbol} ({props.geneId})
      </div>

    </div>
  </div>
)


const handleClick = gene => () => {
  window.open(`http://www.genecards.org/cgi-bin/carddisp.pl?gene=${gene}`)
}


export default TitleBar
