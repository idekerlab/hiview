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
  constructor(props) {
    super(props)
    this.state = {
      idx: 0,
      barHeight: 0
    }
    this.tabRef = React.createRef()
  }

  componentDidMount() {
    const barHeight = this.tabRef.current
    this.setState({ barHeight })
  }

  handleChange = (event, idx) => {
    this.setState({ idx })
  }

  render() {
    const containerStyle = {
      width: '100%',
      height: this.props.height,
      backgroundColor: '#FFFFFF',
      padding: 0,
      margin: 0
    }
    const { idx } = this.state

    const titles = ['Enrichr']
    const panels = []
    panels.push(<PlotPanel {...this.props} barHeight />)

    return (
      <div style={containerStyle}>
        <Tabs
          value={idx}
          scrollable={true}
          onChange={this.handleChange}
          ref={this.tabRef}
        >
          {titles.map((title, i) => {
            return <Tab key={i} label={title} />
          })}
        </Tabs>

        <SettingsPanel style={settingStyle} />
        {panels[idx]}
      </div>
    )
  }
}

export default AnalysisPanel
