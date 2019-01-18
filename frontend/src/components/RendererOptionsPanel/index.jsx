import React, { Component } from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Divider from '@material-ui/core/Divider'
import Switch from '@material-ui/core/Switch'
import TuneIcon from '@material-ui/icons/Tune'

import { deepOrange, blueGrey } from '@material-ui/core/colors'

import Avatar from '@material-ui/core/Avatar'
import Slider from 'rc-slider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css'
import { teal } from '@material-ui/core/colors/index'

import { ChromePicker } from 'react-color'
import Button from '@material-ui/core/Button'

const CIRCLE_PACKING = 'Circle Packing'
const NODE_LINK = 'Node-Link Diagram'

const createSliderWithTooltip = Slider.createSliderWithTooltip

const SliderWithTooltip = createSliderWithTooltip(Slider)
const Range = createSliderWithTooltip(Slider.Range)

const baseStyle = {
  backgroundColor: blueGrey[50],
  width: '100%'
}

const sliderColor = teal[300]
const trackStyle = { backgroundColor: sliderColor }
const handleStyle = {
  borderColor: sliderColor
}

const popover = {
  position: 'absolute',
  zIndex: '2'
}
const cover = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px'
}

class RendererOptionsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewer: CIRCLE_PACKING,
      displayColorPickerRoot: false,
      displayColorPickerLeaf: false
    }
  }

  handleColorPickerOpenRoot = () => {
    this.setState({ displayColorPickerRoot: !this.state.displayColorPickerRoot })
  }

  handleColorPickerOpenLeaf = () => {
    this.setState({ displayColorPickerLeaf: !this.state.displayColorPickerLeaf })
  }

  handleColorPickerClose = () => {
    this.setState({
      displayColorPickerRoot: false,
      displayColorPickerLeaf: false
    })
  }

  handleChangeCompleteRoot = (color, event) => {
    this.props.renderingOptionsActions.setRootColor(color.hex)
  };

  handleChangeCompleteLeaf = (color, event) => {
    this.props.renderingOptionsActions.setLeafColor(color.hex)
  };

  handleClose = () => {
    this.setState({ open: false })
  }

  handleViewerChange = event => {
    const val = event.target.value

    console.log('VIEWER: ', val)

    if (val === 'Node-Link Diagram') {
      this.props.uiStateActions.changeViewer(true)
    } else {
      this.props.uiStateActions.changeViewer(false)
    }

    this.setState({ viewer: val })
  }

  handleEnrichmentChange = event => {
    const val = this.props.uiState.get('runEnrichment')

    console.log('GSEA: ', val)
    this.props.uiStateActions.runEnrichment(!val)
  }

  onAfterChange = value => {
    this.props.renderingOptionsActions.setNodeRatio(value)
  }

  onAfterLabelChange = value => {
    this.props.renderingOptionsActions.setNodeLabelRatio(value)
  }

  onAfterRangeChange = value => {
    const newRange = {
      min: value[0],
      max: value[1]
    }
    this.props.renderingOptionsActions.setNodeSizeRange(newRange)

    console.log('Update range:')
    console.log(value)
  }

  onAfterEdgeRangeChange = value => {
    const newRange = {
      min: value[0],
      max: value[1]
    }
    this.props.renderingOptionsActions.setEdgeWidthRange(newRange)

    console.log('Update edge range:')
    console.log(value)
  }

  getOptions = () => {
    const nodeStyle = {
      color: 'white',
      backgroundColor: deepOrange[600]
    }

    const edgeStyle = {
      color: 'white',
      backgroundColor: blueGrey[300]
    }

    const marks = {
      0.0: 0.0,
      2.0: 2.0
    }

    const rangeMarks = {
      0.0: 0.0,
      50.0: 50.0
    }

    if (this.state.viewer === CIRCLE_PACKING) {

      const rootColor = this.props.renderingOptions.get('rootColor')
      const leafColor = this.props.renderingOptions.get('leafColor')

      const rootColorStyle = {
        backgroundColor: rootColor
      }

      const leafColorStyle = {
        backgroundColor: leafColor
      }


      return (
        <List>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <TuneIcon />
            </ListItemIcon>
            <ListItemText primary="Circle background colors:" />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar style={rootColorStyle}></Avatar>
            </ListItemAvatar>

            <ListItemText primary="Root Node Color" />
            <Button
              variant="contained"
              color="default"
              onClick={this.handleColorPickerOpenRoot}
            >
              Change
            </Button>
            {this.state.displayColorPickerRoot ? (
              <div style={popover}>
                <div style={cover} onClick={this.handleColorPickerClose} />
                <ChromePicker
                  disableAlpha={true}
                  color={rootColor}
                  onChangeComplete={this.handleChangeCompleteRoot}
                />
              </div>
            ) : null}
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={leafColorStyle}></Avatar>
            </ListItemAvatar>

            <ListItemText primary="Leaf Node Color" />
            <Button
              onClick={this.handleColorPickerOpenLeaf}
              variant="contained" color="default">
              Change
            </Button>
            {this.state.displayColorPickerLeaf ? (
              <div style={popover}>
                <div style={cover} onClick={this.handleColorPickerClose} />
                <ChromePicker
                  disableAlpha={true}
                  color={leafColor}
                  onChangeComplete={this.handleChangeCompleteLeaf}
                />
              </div>
            ) : null}
          </ListItem>
        </List>
      )
    }

    return (
      <List>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar style={nodeStyle}>N</Avatar>
          </ListItemAvatar>

          <ListItemText primary="Node Ratio:" />
          <SliderWithTooltip
            style={{ width: '55%' }}
            defaultValue={this.props.renderingOptions.get('nodesPowRatio')}
            min={0.001}
            max={2.0}
            step={0.001}
            // marks={marks}
            trackStyle={trackStyle}
            handleStyle={[handleStyle]}
            onAfterChange={this.onAfterChange}
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar style={nodeStyle}>N</Avatar>
          </ListItemAvatar>

          <ListItemText primary="Node Size:" />

          <Range
            style={{ width: '55%' }}
            defaultValue={[
              this.props.renderingOptions.get('minNodeSize'),
              this.props.renderingOptions.get('maxNodeSize')
            ]}
            min={0.0}
            max={50.0}
            step={0.1}
            allowCross={false}
            // marks={rangeMarks}
            trackStyle={[trackStyle]}
            handleStyle={[handleStyle]}
            onAfterChange={this.onAfterRangeChange}
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar style={nodeStyle}>N</Avatar>
          </ListItemAvatar>

          <ListItemText primary="Label Size Ratio:" />
          <SliderWithTooltip
            style={{ width: '55%' }}
            defaultValue={this.props.renderingOptions.get('labelSizeRatio')}
            min={0.0}
            max={5.0}
            step={0.001}
            // marks={marks}
            trackStyle={trackStyle}
            handleStyle={[handleStyle]}
            onAfterChange={this.onAfterLabelChange}
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar style={edgeStyle}>E</Avatar>
          </ListItemAvatar>

          <ListItemText primary="Edge Width:" />

          <Range
            style={{ width: '55%' }}
            defaultValue={[
              this.props.renderingOptions.get('minEdgeSize'),
              this.props.renderingOptions.get('maxEdgeSize')
            ]}
            min={0.0}
            max={5.0}
            step={0.01}
            allowCross={false}
            // marks={rangeMarks}
            trackStyle={[trackStyle]}
            handleStyle={[handleStyle]}
            onAfterChange={this.onAfterEdgeRangeChange}
          />
        </ListItem>
      </List>
    )
  }

  render() {
    return (
      <div style={baseStyle}>
        <List>
          <ListItem>
            <ListItemIcon>
              <TuneIcon />
            </ListItemIcon>
            <ListItemText primary="Main Options:" />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>H</Avatar>
            </ListItemAvatar>

            <ListItemText primary="Viewer Type:" />
            <Select
              style={{ width: '55%' }}
              value={this.state.viewer}
              onChange={this.handleViewerChange}
            >
              <MenuItem value={NODE_LINK}>{NODE_LINK}</MenuItem>
              <MenuItem value={CIRCLE_PACKING}>{CIRCLE_PACKING}</MenuItem>
            </Select>
          </ListItem>

          {this.getOptions()}
        </List>

        <Divider />

        <List>
          <ListItem>
            <ListItemIcon>
              <TuneIcon />
            </ListItemIcon>
            <ListItemText primary="Enrichment Options:" />
          </ListItem>

          <ListItem>
            <ListItemText primary="Automatically run gene set analysis with Enricher:" />
            <Switch
              checked={this.props.uiState.get('runEnrichment')}
              onChange={this.handleEnrichmentChange}
            />
          </ListItem>
        </List>
      </div>
    )
  }
}

export default RendererOptionsPanel
