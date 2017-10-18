import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import TermDetailsPanel from './TermDetailsPanel'
import GenePropertyPanel from './GenePropertyPanel'
import CloseIcon from 'material-ui-icons/Close'

const MAX_WIDTH = 800


class PropertyPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }


  componentWillReceiveProps(nextProps) {
    const selected = this.props.events.get('selected')
    const selectedNew = nextProps.events.get('selected')

    const currentProperty = this.props.currentProperty
    const newProperty = nextProps.currentProperty


    console.log('--------- Opening props ------------')
    console.log(this.props)

    if (selected !== selectedNew || currentProperty !== newProperty) {
      this.setState({
        open: true,
      })
    }
  }


  render() {

    const drawerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }

    const closeIconPanelStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      width: '100%',
      height: '3em',
      backgroundColor: 'teal',
    }

    const closeIconStyle = {
      marginLeft: '0.7em',
      alignSelf: 'center',
    }


    const currentNet = this.props.currentNetwork.id

    let w = window.innerWidth * 0.35
    if (w >= MAX_WIDTH) {
      w = MAX_WIDTH
    }

    const drawerContentsStyle = {
      width: w
    }

    const titleStyle = {
      fontWeight: 300,
      fontSize: '2em',
      color: 'white',
      marginLeft: '0.5em'
    }


    return (
      <Drawer
        width={w}
        style={drawerStyle}
        type="persistent"
        anchor={'right'}
        open={this.state.open}>


        <div style={drawerContentsStyle}>
          <div style={closeIconPanelStyle}>
            <CloseIcon
              style={closeIconStyle}
              onClick={this.handleClose}
              color={'white'}
            />
            <div style={titleStyle}>{this.props.currentProperty.data.Label}</div>
          </div>

          {this.getPanel(currentNet)}

        </div>
      </Drawer>
    )
  }


  /**
   * Currently supporting two types of networks only.
   */
  getPanel = curNet => {

    // Do not return any component if nothing is selected.
    if (this.props.currentProperty.id === null) {
      return (<div></div>)
    }

    const propType = this.props.currentProperty.propType

    if (propType === 'term') {
      return (
        <TermDetailsPanel
          {...this.props}
        />
      )
    } else if (propType === 'gene') {
      return (
        <GenePropertyPanel
          {...this.props}
        />
      )
    } else {
      return (<div><h2>Unknown prop type</h2></div>)
    }
  }

}

export default PropertyPanel
