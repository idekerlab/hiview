import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import DownArrowIcon from '@material-ui/icons/ArrowDownward'
import OpenIcon from '@material-ui/icons/OpenInNew'

const PathList = props => {
  const path = props.path
  if(path === undefined || path === null) {
    return (<div></div>)
  }

  return (
    <List disablePadding style={{paddingLeft: '1.5em'}}>
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
            <IconButton
              onClick={e => handleClick(node.id, props)}
              aria-label="Locate Node">
              <OpenIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};


const handleClick = (nodeId, props) => {
  props.commandActions.zoomToNode(nodeId)
};

export default PathList
