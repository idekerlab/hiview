import React, { Component } from 'react'
import TitleBar from './TitleBar'
import CoreGenePropPanel from './CoreGenePropPanel'
import Typography from '@material-ui/core/Typography'

import CircularProgress from '@material-ui/core/CircularProgress';
import { blueGrey } from '@material-ui/core/colors'


const descriptionStyle = {
  background: blueGrey[50],
  padding: '1.2em'
}

class GenePropertyPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subtree: {},
      scoreFilter: 1.0,
      subnet: {}
    }
  }

  render() {
    const details = this.props.currentProperty
    if (
      details === undefined ||
      details === null ||
      details.id === null ||
      details.id === undefined
    ) {
      return <div />
    }

    // Loading
    if (details.loading) {
      return <CircularProgress />
    }

    const data = details.data
    const id = details.id

    if (data === undefined || data === null) {
      return <div>no data</div>
    }

    if (data.hits === undefined || data.hits.length === 0) {
      return <div>no data</div>
    }

    const entry = data.hits[0]

    return (
      <div>
        <TitleBar
          title={entry.name}
          geneId={entry._id}
          geneSymbol={entry.symbol}
        />

        <div style={descriptionStyle}>
          <Typography
            variant="title"
            style={{ borderBottom: '1px solid #666666', marginBottom: '0.2em' }}
          >
            Summary:
          </Typography>
          <Typography type="subtitle1" style={{ fontSize: '1.2em' }}>
            {entry.summary}
          </Typography>
        </div>

        <CoreGenePropPanel geneInfo={entry} />
      </div>
    )
  }

  _handleTouchTap = id => {
    window.open('http://amigo.geneontology.org/amigo/term/' + id)
  }
}

export default GenePropertyPanel
