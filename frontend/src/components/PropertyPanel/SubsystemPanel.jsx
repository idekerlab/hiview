import React from 'react'
import TitleBar from './TitleBar'
import Divider from 'material-ui/Divider';


const descriptionStyle = {
  color: '#555555',
  fontFamily: 'Roboto'
}

const SubsystemPanel = props => (
  <div>
    <TitleBar {...props} />

    <Divider />
  </div>
)


export default SubsystemPanel
