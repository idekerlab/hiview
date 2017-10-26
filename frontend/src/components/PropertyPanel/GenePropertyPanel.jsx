import React, {Component} from 'react'

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import TitleBar from './TitleBar'

import PropTreePanel from './PropTreePanel'

import CoreGenePropPanel from './CoreGenePropPanel'



import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

import {CircularProgress} from 'material-ui/Progress';

const colorFunction = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeDark2)

const descriptionStyle = {
  background: '#BEBEB4',
  padding: '1em',
  color: '#333333',
  fontSize: '1.1em',
  fontWeight: 300
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
    console.log("%%%%%%%%%%%%%%%% Rendering Gene Panel")
    console.log(this.props)

    const details = this.props.currentProperty
    if (details === undefined || details === null || details.id === null || details.id === undefined) {
      return (<div></div>)
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


    const labelStyle = {
      fontWeight: 700,
      fontSize: '1em',
      color: '#444444',
      paddingBottom: '0.5em'
    }

    console.log(entry)
    return (

      <div style={{width: this.props.width}}>

        <TitleBar
          title={entry.name}
          geneId={entry._id}
          geneSymbol={entry.symbol}
        />

        <div style={descriptionStyle}>
          <div style={labelStyle}>Summary:</div>
          {entry.summary}
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
