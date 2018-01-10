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

const createSliderWithTooltip = Slider.createSliderWithTooltip;

const SliderWithTooltip = createSliderWithTooltip(Slider);
const Range = createSliderWithTooltip(Slider.Range);


const baseStyle = {
  backgroundColor: blueGrey[100],
  width: '100%'
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

    console.log('Update: ' + value)
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

  render() {

    const nodeStyle = {
      color: 'white',
      backgroundColor: deepOrange[600]
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
            <ListItemText primary='Rendering Options:'/>
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
              marks={marks}
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
              marks={rangeMarks}
              onAfterChange={this.onAfterRangeChange}
            />
          </ListItem>

        </List>
      </div>
    );
  }
}

export default RendererOptionsPanel