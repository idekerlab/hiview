import React from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'
import BarPlot from './BarPlot'
import Progress from './Progress'

const containerStyle = {
  paddingTop: '0em',
  margin: 0,
  overflow: 'scroll',
  width: '100%',
  height: '100%'
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

    const panelWrapperStyle = {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      height: this.props.height - 90
    }

    const progressWrapperStyle = {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      height: this.props.height - 90
    }

    const loading = this.props.enrichment.get('running')
    if (loading) {
      return <Progress style={progressWrapperStyle} />
    } else if (this.props.data === null) {
      return <div />
    } else {
      const titles = Object.keys(this.props.data)
      const plotList = plots(this.props)

      return (
        <div style={containerStyle}>
          <Tabs value={idx} scrollable={true} onChange={this.handleChange}>
            {titles.map((title, i) => {
              return <Tab key={i} label={title} />
            })}
          </Tabs>

          <div style={panelWrapperStyle}>{this.getPanel(plotList, idx)}</div>
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
    plotList.push(<BarPlot key={k} height={260} data={v} title={k} />)
  }

  return plotList
}

export default PlotPanel
