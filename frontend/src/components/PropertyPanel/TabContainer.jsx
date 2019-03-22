import React from 'react'
import PropTypes from 'prop-types'


const containerStyle = {
  width: '100%',
}


const TabContainer = props => (
  <div style={containerStyle}>
    {props.children}
  </div>
)

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}


export default TabContainer
