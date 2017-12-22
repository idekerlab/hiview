import React, { Component } from "react";

import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const AliasList = props => {
  const aliases = props.aliases;
  const keys = Object.keys(aliases);

  return (
    <List disablePadding style={{paddingLeft: '4em'}}>
      {keys.map((key, i) => (
        <Card key={i}>
          <CardContent>
            <Typography type="title">{key}</Typography>
            <Typography type="headline" component="h2">
              Path:
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense
              onClick={(e) => handleClick(key, props)}
            >Find Path</Button>
          </CardActions>
        </Card>
      ))}
    </List>
  );
};


const handleClick = (nodeId, props) => {
  props.commandActions.findPath([nodeId, props.rootId])
};

export default AliasList;
