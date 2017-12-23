import React, { Component } from "react";

import List, { ListItem, ListItemAvatar,ListItemSecondaryAction, ListItemIcon, ListItemText } from "material-ui/List";

import PlaceIcon from 'material-ui-icons/Place';
import NavigationIcon from 'material-ui-icons/Navigation';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import DownArrowIcon from 'material-ui-icons/ArrowDownward'
import OpenIcon from 'material-ui-icons/OpenInNew'

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const PathList = props => {
  const pathMap = props.path

  const path = pathMap.get('currentPath')
  if(path === undefined || path === null) {
    return (<div></div>)
  }

  console.log(path)

  return (
    <List disablePadding style={{paddingLeft: '4em'}}>
      {path.map((node, i) => (

        <ListItem
          key={i}
        >
          <ListItemAvatar>
            <Avatar>
              <DownArrowIcon />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={node.props.Label}
            secondary={node.id}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Locate Node">
              <OpenIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};


const handleClick = (nodeId, props) => {
  props.commandActions.findPath([nodeId, props.rootId])
};

export default PathList
