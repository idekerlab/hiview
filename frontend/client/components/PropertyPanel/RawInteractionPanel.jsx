import React, {Component} from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CyViewer from 'cy-viewer'

import FlatButton from 'material-ui/FlatButton';



import FilterPanel from './FilterPanel'


class RawInteractionPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //
  //   if(nextProps.selectedTerm === undefined || this.props.selectedTerm === undefined) {
  //     return false
  //   }
  //
  //   if(nextProps.selectedTerm === this.props.selectedTerm) {
  //
  //     if(nextProps.loading !== this.props.loading) {
  //       return true
  //     }
  //
  //     if(nextProps.commands !== undefined) {
  //       return true
  //     }
  //
  //     return false;
  //   }
  //
  //
  //
  //   return true
  // }


  render() {

    console.log("%%%%%%%%%%%%%%%% Rendering RAW=====================================")
    console.log(this.props)

    const style = {
      width: '100%',
      height: '40em',
      background: '#000000'
    }

    const iconStyle = {
      color: 'white',
    }

    return (
      <div style={style}>

        {this.getMainContents()}

      </div>
    )
  }

  getMainContents = () => {

    console.log("%%%%%%%%%%%%%%%% Rendering Main contents =====================================")
    if(this.props.subnet === null || this.props.subnet === undefined) {
      return (<div></div>)
    }


    const networkAreaStyle = {
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      position: 'relative'
    }

    if(!this.props.loading) {

      return (
          <CyViewer
            key="subNetworkView"
            network={this.props.subnet}
            networkType={'cyjs'}
            networkStyle={this.getStyle()}
            style={networkAreaStyle}
            eventHandlers={this.getCustomEventHandlers()}
            rendererOptions={{layout: 'concentric'}}
            command={this.props.commands}
          />
      )
    } else {
      return (<h2>Loading networks...</h2>)
    }

  }

  getStyle = () => ({
    style: [ {
      "selector" : "node",
      "css" : {
        "width" : 15.0,
        "text-valign" : "center",
        "text-halign" : "right",
        "shape" : "ellipse",
        "color" : "white",
        "background-color" : "#CCCCCC",
        "height" : 15.0,
        "font-size" : '3em',
        "content" : "data(name)",
      }
    }, {
      "selector" : "node:selected",
      "css" : {
        "background-color" : "red",
        "font-size" : "4em",
        "color" : "orange",
        content: "data(name)",
        "text-max-width": '200px'
      }
    }, {
      "selector" : "edge",
      "css" : {
        "width" : "mapData(weight, 1.0, 8.0, 1, 10)",
        "line-color": 'white',
        "opacity": 0.8
      }
    }, {
      "selector" : "edge:selected",
      "css" : {
        "line-color" : "rgb(255,0,0)",
        "width": 14
      }
    } ]
  })


  selectNodes = (nodeIds, nodeProps) => {
    const node = nodeIds[0]
    const props = nodeProps[node]

    console.log('RAW ============================================================== Custom node select function called! ========');
    console.log('Selected Node ID: ' + node)
    console.log(props)
  }

  selectEdges = (edgeIds, edgeProps) => {
    console.log('====== Custom edge select function called! ========');
    console.log('Selected Edge ID: ' + edgeIds)
    console.log(edgeProps)
  }

// Then use it as a custom handler
  getCustomEventHandlers = () => ({
    selectNodes: this.selectNodes,
    selectEdges: this.selectEdges
  })
}

export default RawInteractionPanel
