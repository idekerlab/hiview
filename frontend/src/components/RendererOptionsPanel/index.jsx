import React, { Component } from 'react'

import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar
} from 'material-ui/List'

import Divider from 'material-ui/Divider'
import Switch from 'material-ui/Switch'
import TuneIcon from 'material-ui-icons/Tune'

import { deepOrange, blueGrey } from 'material-ui/colors'

import Avatar from 'material-ui/Avatar'
import Slider from 'rc-slider'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import 'rc-slider/assets/index.css'
import { teal } from 'material-ui/colors/index'

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

class RendererOptionsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewer: CIRCLE_PACKING
    }
  }

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
      return <div />
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
            <ListItemText primary="Main Hierarchy Viewer Options:" />
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
