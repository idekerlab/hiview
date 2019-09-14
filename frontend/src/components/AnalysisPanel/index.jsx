import React, { Component } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PlotPanel from '../PlotPanel'


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
          variant="scrollable"
          onChange={this.handleChange}
          ref={this.tabRef}
        >
          {titles.map((title, i) => {
            return <Tab key={i} label={title} />
          })}
        </Tabs>

        {panels[idx]}
      </div>
    )
  }
}

export default AnalysisPanel
