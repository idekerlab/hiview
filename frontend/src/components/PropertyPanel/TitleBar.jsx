import React, {Component} from 'react'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  color: '#333333',
  margin: 0,
  padding: '1em',
  minHeight: '3em',
}

const descriptionStyle = {
  color: '#555555',
  fontSize: '1.2em'
}

const TitleBar = props => (
  <div style={style}>
    <h1 style={{textAlign: 'center', lineHeight: 1.3}}>
      {props.title}
    </h1>

    <div style={descriptionStyle}>
      Description: {props.description}
    </div>
  </div>
)


export default TitleBar
