import React, {Component} from 'react'

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import TitleBar from './TitleBar'
import PropListPanel from './PropListPanel'

import RawInteractionPanel from './RawInteractionPanel'
import GeneList from './GeneList'
import Immutable from 'immutable'
import FilterPanel from './FilterPanel'


import Loading from '../Loading'
import OpenIcon from 'material-ui/svg-icons/action/open-in-new'

import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

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
      return(<Loading style={descriptionStyle} />)
    }

    const data = details.data
    const parts = details.url.split('/')
    const id = parts[parts.length-1]

    if(data === undefined || data === null) {
        return(<div>no data</div>)
    }

    const entry = data

    return (
      <div>

        <TitleBar
          title={entry.symbol}
          geneId={id}
        />
        <div style={descriptionStyle}>
          <h3>{entry.summary}</h3>
        </div>


        < Divider/>

        <PropListPanel data={entry}/>

      </div>
    )
  }



  _handleTouchTap = id => {
    window.open('http://amigo.geneontology.org/amigo/term/' + id);
  }
}

export default GenePropertyPanel
