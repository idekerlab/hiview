import React, { Component } from "react";
import List, { ListItem, ListItemAvatar,ListItemSecondaryAction, ListItemText } from "material-ui/List";
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import DownArrowIcon from 'material-ui-icons/ArrowDownward'
import OpenIcon from 'material-ui-icons/OpenInNew'

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
