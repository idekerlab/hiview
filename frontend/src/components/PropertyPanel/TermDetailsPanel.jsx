import React, {Component} from 'react'

import Divider from 'material-ui/Divider';

import TitleBar from './TitleBar'
import Tabs, { Tab } from 'material-ui/Tabs';
import {CircularProgress} from 'material-ui/Progress';


import RawInteractionPanel from './RawInteractionPanel'
import PropListPanel from './PropListPanel'
import SimpleGeneList from './SimpleGeneList'


const descriptionStyle = {
  background: '#BEBEB4',
  padding: '0.2em'
}


class TermDetailsPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      subtree: {},
      scoreFilter: 1.0,
      subnet: {},
      selectedTab: 0
    }
  }

  componentDidMount() {}

  setScore = (val) => {
    this.setState({scoreFilter: val})
    console.log('New Score: ' + val)

    this.props.commandActions.filter({
      options: {
        type: 'numeric',
        range: 'edge[score > ' + val + ']'
      },
      target: 'subnet'
    })
  }

  render() {
    const raw = this.props.rawInteractions.toJS();
    const interactions = raw.interactions

    // Term property
    const details = this.props.currentProperty
    if (details === undefined || details === null || details.id === null || details.id === undefined) {
      return (
        <div></div>
      )
    }

    // Loading
    if (details.loading) {
      return (<CircularProgress />)
    }

    const data = details.data

    let entry = {}

    let subnet = null

    let nodeList = []
    if (data === undefined) {
      entry = {}
    } else {
      entry = data
      subnet = interactions

      if(subnet !== null && subnet !== undefined) {
        nodeList = subnet.elements.nodes.map(node=>(node.data.name))
      }
    }

    const keys = Object.keys(data)

    return (
        <div>
          {/*<RawInteractionPanel*/}
              {/*subnet={interactions}*/}
              {/*selectedTerm={this.props.currentProperty.id}*/}
              {/*handleClose={this.props.handleClose}*/}
              {/*commandActions={this.props.commandActions}*/}
              {/*loading={this.props.currentProperty.loading}*/}
          {/*/>*/}

          <Tabs value={this.state.selectedTab} onChange={this.handleChange}>
            <Tab label="Term Details">
              <TitleBar title={entry.name}/>

              <Divider/>

              {/*<PropListPanel data={entry}/>*/}
            </Tab>
            <Tab label="Assigned Genes">
              {/*<SimpleGeneList genes={nodeList}/>*/}
            </Tab>
            <Tab label="Interactions">
            </Tab>
          </Tabs>
        </div>
    )
  }

  handleChange = (event, value) => {
    this.setState({ selectedTab: value })
  }

  _handleTouchTap = id => {
    window.open('http://amigo.geneontology.org/amigo/term/' + id);
  }
}

export default TermDetailsPanel
