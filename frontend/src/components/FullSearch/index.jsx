import React from 'react'
import SearchPanel from './SearchPanel'

const baseStyle = {
  position: 'fixed',
  top: '0.5em',
  left: '0.5em',
  zIndex: 900,

}


const FullSearch = props => (
  <div style={baseStyle}>
    <SearchPanel
      {...props}
    />
  </div>
)

export default FullSearch
