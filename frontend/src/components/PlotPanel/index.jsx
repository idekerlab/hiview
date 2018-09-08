import React from 'react'

import Tabs, { Tab } from 'material-ui/Tabs'
import style from './style.css'

import BarPlot from './BarPlot'
import Progress from './Progress'

const containerStyle = {
  paddingTop: '0em',
  margin: 0,
  overflow: 'scroll',
  width: '100%',
  height: '100%',
}

class PlotPanel extends React.Component {
  state = {
    idx: 0
  }

  handleChange = (event, idx) => {
    this.setState({ idx })
  }

  render() {
    const { idx } = this.state

    const loading = this.props.enrichment.get('running')
    if (loading) {
      return <Progress />
    } else if (this.props.data === null) {
      return <div />
    } else {
      const titles = Object.keys(this.props.data)
      const plotList = plots(this.props)

      return (
        <div style={containerStyle}>
          <Tabs
            value={idx}
            scrollable={true}
            onChange={this.handleChange}>
            {titles.map((title, i) => {
              return <Tab key={i} label={title} />
            })}
          </Tabs>

          {this.getPanel(plotList, idx)}
        </div>
      )
    }
  }

  getPanel = (panels, idx) => {
    return panels[idx]
  }
}

const plots = props => {
  const plotList = []

  for (let [k, v] of Object.entries(props.data)) {
    plotList.push(
      <div className={style.plotContainer} key={k}>
        <BarPlot height={250} data={v} title={k} />
      </div>
    )
  }

  return plotList
}

export default PlotPanel
