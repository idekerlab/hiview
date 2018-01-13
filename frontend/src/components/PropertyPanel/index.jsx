import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'

import TermDetailsPanel from './TermDetailsPanel'
import GenePropertyPanel from './GenePropertyPanel'

import CloseIcon from "material-ui-icons/KeyboardArrowRight";
import ExpandIcon from 'material-ui-icons/Fullscreen'
import ExitExpandIcon from 'material-ui-icons/FullscreenExit'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import {withStyles} from 'material-ui/styles';


import {blueGrey} from 'material-ui/colors'


const MAX_WIDTH = 450.0
const MIN_WIDTH = 350.0

const PANEL_TYPES = {
  GENE: 'gene',
  TERM: 'term'
}

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  expandButton: {
    marginLeft: 12,
    marginRight: -12,
  },
};

const drawerStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: MAX_WIDTH,
  height: '100%'
}


class PropertyPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      panelWidth: this.getWidth(),
      panelHeight: window.innerHeight * 0.4,
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

    if (expand) {
      this.setState({
        panelWidth: this.getWidth(),
        panelHeight: window.innerHeight * 0.4,
        expand: false
      })

    } else {
      this.setState({
        panelWidth: window.innerWidth,
        panelHeight: window.innerHeight,
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

    if (w < MIN_WIDTH) {
      w = MIN_WIDTH
    }

    return w
  }

  render() {
    const {classes} = this.props;

    // Width of this UI panel
    const w = this.state.panelWidth

    const propType = this.props.currentProperty.propType
    let label = '?'

    if (propType === PANEL_TYPES.TERM) {
      label = this.props.currentProperty.data.Label
    } else if (propType === PANEL_TYPES.GENE) {
      label = this.props.currentProperty.id
    }

    const barColor = (propType === PANEL_TYPES.GENE) ? 'orange' : blueGrey
    const barTitle = label


    const drawerContentsStyle = {
      width: w,
      height: '100%',
      overflowX: 'hidden',
    }

    let appBarPosition = "fixed"
    if(propType === PANEL_TYPES.GENE) {
      appBarPosition = 'absolute'
    }

    const fontType = (propType === PANEL_TYPES.GENE) ? 'display2': 'headline'

    return (
      <Drawer
        style={drawerStyle}
        type="persistent"
        anchor={'right'}
        open={this.state.open}>

        <div style={drawerContentsStyle}>
          <AppBar position={appBarPosition}>
            <Toolbar>
              <IconButton className={classes.menuButton} color="contrast">
                <CloseIcon
                  onClick={this.handleClose}
                />
              </IconButton>

              <Typography type={fontType} color="inherit" className={classes.flex}>
                {barTitle}
              </Typography>


              {propType === PANEL_TYPES.GENE ? (<div/>) : (
                <div>
                  <IconButton className={classes.expandButton} color="contrast">
                    {
                      this.state.expand ? (
                        <ExitExpandIcon
                          onClick={this.handleExpand}
                        />

                      ) : (

                        <ExpandIcon
                          onClick={this.handleExpand}
                        />
                      )
                    }
                  </IconButton>
                </div>
              )
              }
            </Toolbar>
          </AppBar>

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
      return (<div/>)
    }

    // This will be gene or term.
    const propType = this.props.currentProperty.propType

    if (propType === PANEL_TYPES.TERM) {
      return (
        <TermDetailsPanel
          {...this.props}
          width={this.state.panelWidth}
          height={this.state.panelHeight}
          expanded={this.state.expand}
        />
      )
    } else if (propType === PANEL_TYPES.GENE) {

      // Check namespace props here...

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

export default withStyles(styles)(PropertyPanel);
