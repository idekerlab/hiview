import React, { Component } from 'react'
import SettingsPanel from './SettingsPanel'
import Tabs, { Tab } from 'material-ui/Tabs'
import { withStyles } from 'material-ui/styles'

import PlotPanel from '../PlotPanel'

const styles = theme => ({
  root: {
    width: '100%',
    margin: 0,
    padding: 0,
    background: '#EFEFEF'
  }
})

const settingStyle = {
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: 0,
  top: 0
}


class AnalysisPanel extends Component {
  state = {
    idx: 0
  }

  handleChange = (event, idx) => {
    this.setState({ idx })
  }

  render() {
    const containerStyle = {
      height: this.props.height,
      backgroundColor: '#FFFFFF',
      padding: 0,
      margin: 0,
    }
    const tabsStyle = {

    }


    const { classes } = this.props
    const { idx } = this.state

    const titles = ['panel 1', 'panel 2']
    const panels = []
    panels.push(<PlotPanel {...this.props} />)
    panels.push(
      <div>
        <h1>Test 2</h1>
      </div>
    )

    return (
      <div style={containerStyle}>
        <Tabs style = {tabsStyle} classes={{root: classes.root}}
          value={idx}
          scrollable={true}
          onChange={this.handleChange}
        >
          {titles.map((title, i) => {
            return <Tab key={i} label={title} />
          })}
        </Tabs>

        <SettingsPanel style={settingStyle}/>
        {panels[idx]}
      </div>
    )
  }
}

export default withStyles(styles)(AnalysisPanel)
