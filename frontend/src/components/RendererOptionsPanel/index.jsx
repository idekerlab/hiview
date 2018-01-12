import React, {Component} from 'react'


import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar
} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import HomeIcon from 'material-ui-icons/Home'
import TuneIcon from 'material-ui-icons/Tune';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import Input from 'material-ui/Input';
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import {deepOrange, blueGrey} from 'material-ui/colors';


import Avatar from 'material-ui/Avatar';


import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import {teal} from "material-ui/colors/index";

const createSliderWithTooltip = Slider.createSliderWithTooltip;

const SliderWithTooltip = createSliderWithTooltip(Slider);
const Range = createSliderWithTooltip(Slider.Range);


const baseStyle = {
  backgroundColor: blueGrey[50],
  width: '100%'
}

const sliderColor = teal[300];
const trackStyle= { backgroundColor: sliderColor}
const handleStyle={
  borderColor: sliderColor
}

class RendererOptionsPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleClose = () => {
    this.setState({open: false});
  };

  onAfterChange = value => {
    this.props.renderingOptionsActions.setNodeRatio(value)
  };

  onAfterLabelChange = value => {
    this.props.renderingOptionsActions.setNodeLabelRatio(value)
  };

  onAfterRangeChange = value => {
    const newRange = {
      min: value[0],
      max: value[1]
    }
    this.props.renderingOptionsActions.setNodeSizeRange(newRange)

    console.log('Update range:')
    console.log(value)
  };

  onAfterEdgeRangeChange = value => {
    const newRange = {
      min: value[0],
      max: value[1]
    }
    this.props.renderingOptionsActions.setEdgeWidthRange(newRange)

    console.log('Update edge range:')
    console.log(value)
  };

  render() {

    const nodeStyle = {
      color: 'white',
      backgroundColor: deepOrange[600]
    }

    const edgeStyle = {
      color: 'white',
      backgroundColor: blueGrey[300]
    }


    const marks = {
      0.00: 0.00,
      2.00: 2.00,
    };

    const rangeMarks = {
      0.0: 0.0,
      50.0: 50.0,
    };


    return (
      <div style={baseStyle}>


        <List>
          <ListItem>
            <ListItemIcon>
              <TuneIcon/>
            </ListItemIcon>
            <ListItemText primary='Hierarchy Viewer Options:'/>
          </ListItem>

          <Divider/>

          <ListItem>
            <ListItemAvatar>
              <Avatar style={nodeStyle}>N</Avatar>
            </ListItemAvatar>

            <ListItemText primary='Node Ratio:'/>
            <SliderWithTooltip
              style={{width: "55%"}}
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

            <ListItemText primary='Node Size:'/>

            <Range
              style={{width: "55%"}}
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

            <ListItemText primary='Label Size Ratio:'/>
            <SliderWithTooltip
              style={{width: "55%"}}
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

            <ListItemText primary='Edge Width:'/>

            <Range
              style={{width: "55%"}}
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
      </div>
    );
  }
}

export default RendererOptionsPanel