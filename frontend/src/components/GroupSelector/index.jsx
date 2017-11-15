import React, {Component} from 'react'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';
import ListSubheader from 'material-ui/List/ListSubheader';

import deepOrange from 'material-ui/colors/deepOrange';
import Avatar from 'material-ui/Avatar'

import * as d3ScaleChromatic from 'd3-scale-chromatic'
import * as d3Scale from 'd3-scale'

const colorMap = d3Scale.scaleOrdinal(d3Scale.schemeCategory20)


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 300,
    background: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 200,
  },
  listSection: {
    background: 'inherit',
  },
  orangeAvatar: {
    margin: 0,
    color: '#fff',
    height: 10,
    width: 10,
    backgroundColor: deepOrange[500],
  },
});

const baseStyle = {
  width: '100%',
  padding: '1em',
  color: '#333333'
}

const titleStyle = {
  color: '#111111',
  fontWeight: 400
}

class GroupSelector extends Component {


  handleChange = name => event => {



    const checked = event.target.checked
    const toBeSelected = this.props.groups[name]

    console.log(toBeSelected)

    if(checked) {
      // Select nodes
      // this.props.commandActions.select({idList: toBeSelected})
    }
  }

  handleToggle = value => () => {

    const geneIds = this.props.groups[value]
    if(geneIds === undefined || geneIds.length === 0) {
      return
    }


    console.log(geneIds)


    const selectedColor = colorMap(Object.keys(this.props.groups).indexOf(value))
    this.props.commandActions.selectNodes({idList: geneIds, selectedColor: selectedColor})
  };

  render() {
    const { classes } = this.props
    const groupNames = Object.keys(this.props.groups)


    let i = 0

    return(
      <div style={baseStyle}>
        <div style={titleStyle}>
          Assigned gene selector:
        </div>
        <List className={classes.root}>
          {
            groupNames.map(group => {

              const color = colorMap(i++)
              console.log(color)
              const avatarStyle = {
                margin: 0,
                color: '#333333',
                backgroundColor: color,
              }

              return (
                <ListItem
                  key={group}
                  dense={true}
                  button
                  disableRipple
                  className={classes.listItem}
                >
                  <Checkbox
                    onClick={this.handleToggle(group)}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={group} />

                  <ListItemSecondaryAction>
                    <Avatar style={avatarStyle} />
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(GroupSelector)
