import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import TermDetailsPanel from './TermDetailsPanel'
import GenePropertyPanel from './GenePropertyPanel'

import CloseIcon from 'material-ui-icons/Close'
import ExpandIcon from 'material-ui-icons/Fullscreen'
import ExitExpandIcon from 'material-ui-icons/FullscreenExit'

const MAX_WIDTH = 500.0
const MIN_WIDTH = 350.0


const PANEL_TYPES = {
  GENE: 'gene',
  TERM: 'term'
}

class PropertyPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      panelWidth: this.getWidth(),
      expand: false
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
      expand: false,
      panelWidth: this.getWidth(),
    })
  }

  handleExpand = () => {
    const expand = this.state.expand

    if(expand) {
      this.setState({
        panelWidth: this.getWidth(),
        interactionPanelHeight: 300,
        expand: false
      })

    } else {
      this.setState({
        panelWidth: window.innerWidth,
        interactionPanelHeight: 300,
        expand: true
      })

    }

  }


  componentWillReceiveProps(nextProps) {

    const selected = this.props.events.get('selected')
    const selectedNew = nextProps.events.get('selected')
    const currentProperty = this.props.currentProperty
    const newProperty = nextProps.currentProperty

    if (selected !== selectedNew || currentProperty !== newProperty) {
      this.setState({
        open: true,
      })
    }
  }

  getWidth = () => {

    let w = window.innerWidth * 0.45

    if (w > MAX_WIDTH) {
      w = MAX_WIDTH
    }

    if(w < MIN_WIDTH) {
      w = MIN_WIDTH
    }

    return w
  }

  render() {
    // Width of this UI panel
    const w = this.state.panelWidth

    const propType = this.props.currentProperty.propType
    const label = this.props.currentProperty.data.Label

    const drawerStyle = {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: MAX_WIDTH,
    }

    const closeIconStyle = {
      marginLeft: '0.7em',
      alignSelf: 'center',
      color: '#777777'
    }

    const barColor = (propType === PANEL_TYPES.GENE) ? 'orange' : '#FAFAFA'
    const barTitle = label

    const closeIconPanelStyle = {
      display: 'inline-flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: '2.5em',
      backgroundColor: barColor
    }

    const drawerContentsStyle = {
      width: w,
      height: '100%',
      overflowX: 'hidden',
    }

    const titleStyle = {
      color: '#333333',
      fontSize: '1.3em',
      fontWeight: 500,
      paddingLeft: '0.8em',
    }

    return (
      <Drawer
        style={drawerStyle}
        type="persistent"
        anchor={'right'}
        open={this.state.open}>

        <div style={drawerContentsStyle}>

          <div style={closeIconPanelStyle}>
            <CloseIcon
              style={closeIconStyle}
              onClick={this.handleClose}
            />
            {
              this.state.expand ? (
                <ExitExpandIcon
                  style={closeIconStyle}
                  onClick={this.handleExpand}
                />

              ) : (

                <ExpandIcon
                  style={closeIconStyle}
                  onClick={this.handleExpand}
                />
              )
            }
            <div style={titleStyle}>{barTitle}</div>
          </div>

          {this.getPanel(w)}

        </div>
      </Drawer>
    )
  }

  /**
   * Currently supporting two types of networks only.
   */
  getPanel = (w) => {

    // Do not return any component if nothing is selected.
    if (this.props.currentProperty.id === null) {
      return (<div></div>)
    }

    // This will be gene or term.
    const propType = this.props.currentProperty.propType

    if (propType === PANEL_TYPES.TERM) {
      return (
        <TermDetailsPanel
          {...this.props}
          width={this.state.panelWidth}
        />
      )
    } else if (propType === PANEL_TYPES.GENE) {
      return (
        <GenePropertyPanel
          {...this.props}
          width={w}
        />
      )
    } else {

      // Unsupported type
      return (<div><h2>Unknown prop type</h2></div>)
    }
  }

}

export default PropertyPanel
