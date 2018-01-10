import React, {Component} from 'react'

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import TitleBar from './TitleBar'

import PropTreePanel from './PropTreePanel'

import CoreGenePropPanel from './CoreGenePropPanel'

import Typography from "material-ui/Typography";


import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

import {CircularProgress} from 'material-ui/Progress';
import {blueGrey} from 'material-ui/colors'

const colorFunction = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeDark2)

const descriptionStyle = {
  background: blueGrey[100],
  padding: '1.5em',
  paddingRight: '2em',
}

const disabledStyle = {
  background: '#999999'
}


class GenePropertyPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      subtree: {},
      scoreFilter: 1.0,
      subnet: {}
    };
  }

  render() {
    const details = this.props.currentProperty
    if (details === undefined || details === null || details.id === null || details.id === undefined) {
      return (<div />)
    }

    // Loading
    if(details.loading) {
      return(<CircularProgress />)
    }

    const data = details.data
    const id = details.id

    if(data === undefined || data === null) {
        return(<div>no data</div>)
    }

    if(data.hits === undefined || data.hits.length === 0) {
      return(<div>no data</div>)
    }

    const entry = data.hits[0]

    return (

      <div style={{width: this.props.width, paddingTop: '5.5em'}}>

        <TitleBar
          title={entry.name}
          geneId={entry._id}
          geneSymbol={entry.symbol}
        />

        <div style={descriptionStyle}>
          <Typography type="title">Summary:</Typography>
          <Typography type="body2">
            {entry.summary}
          </Typography>
        </div>


        <CoreGenePropPanel
          geneInfo={entry}
        />


        {/*<PropTreePanel*/}
          {/*tree={entry}*/}
        {/*/>*/}
      </div>
    )
  }



  _handleTouchTap = id => {
    window.open('http://amigo.geneontology.org/amigo/term/' + id);
  }
}

export default GenePropertyPanel
