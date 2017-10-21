import React, {Component} from 'react'

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import TitleBar from './TitleBar'
import PropListPanel from './PropListPanel'

import PropTreePanel from './PropTreePanel'


import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

import {CircularProgress} from 'material-ui/Progress';

const colorFunction = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeDark2)

const descriptionStyle = {
  background: '#BEBEB4',
  padding: '1em'
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

    console.log(entry)
    return (
      <div style={{height: '100%', width: this.props.width}}>

        <TitleBar
          title={entry.name}
          geneId={id}
        />
        <div style={descriptionStyle}>
          <h3>{entry.summary}</h3>
        </div>


        < Divider/>


        <PropTreePanel
          tree={entry}
        />
      </div>
    )
  }



  _handleTouchTap = id => {
    window.open('http://amigo.geneontology.org/amigo/term/' + id);
  }
}

export default GenePropertyPanel
