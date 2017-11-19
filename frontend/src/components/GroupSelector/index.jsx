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

const colorMap = d3Scale.scaleOrdinal(d3Scale.schemeCategory20c)


const styles = theme => ({
  root: {
    width: '30%',
    background: theme.palette.background.paper,
    overflow: 'auto',
    minWidth: '14em',
    color: '#333333',
    position: 'relative',
  },
  listSection: {
    background: 'inherit',
  },
  listItem: {
    height: '1.8em',
    margin: 0,
    padding: '0.2em'
  }
});


const titleStyle = {
  color: '#111111',
  fontWeight: 400,
  fontSize: '1em',
  paddingLeft: '1em'
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

  handleToggle = value => event => {

    const checked = event.target.checked
    const geneIds = this.props.groups[value]
    if(geneIds === undefined || geneIds.length === 0) {
      return
    }


    const selectedColor = colorMap(Object.keys(this.props.groups).indexOf(value))
    if(checked) {
      this.props.commandActions.selectNodes({idList: geneIds, selectedColor: selectedColor})
    } else {
      this.props.commandActions.unselectNodes({idList: geneIds})
    }
  };

  render() {
    const { classes } = this.props
    const groupNames = Object.keys(this.props.groups)


    let i = 0

    return(
      <div className={classes.root}>
        <div style={titleStyle}>
          Assigned gene selector:
        </div>

        <List>
          {
            groupNames.map(group => {

              const color = colorMap(i++)
              const avatarStyle = {
                // margin: 0,
                color: '#FFFFFF',
                backgroundColor: color,
                height: '1.2em',
                width: '1.2em'
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
                  <Avatar style={avatarStyle}>{this.props.groups[group].length}</Avatar>
                  <ListItemText primary={group} />

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
