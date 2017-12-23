import React, {Component} from "react";

import Collapse from 'material-ui/transitions/Collapse';
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemIcon, ListItemText} from "material-ui/List";

import PlaceIcon from 'material-ui-icons/Place';
import NavigationIcon from 'material-ui-icons/Navigation';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import Card, {CardActions, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import PathList from './PathList'

class AliasList extends Component {

  state = {}

  render() {
    console.log(";;;;;;;;;;;;;;;;;;;;;;;; ")
    console.log(this.props)

    const aliases = this.props.aliases;
    const keys = Object.keys(aliases);

    return (
      <List disablePadding style={{paddingLeft: '4em'}}>
        {keys.map((key, i) => (

          <div>
            <ListItem
              key={i}
            >
              <ListItemAvatar>
                <Avatar>
                  <PlaceIcon/>
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={'Path ' + (i + 1)}
                secondary={'Node ID: ' + key}
              />
              <ListItemSecondaryAction>
                <Button
                  aria-label="Find path" raised color="secondary"
                  onClick={(e) => this.handleClick(key)}
                >
                  <NavigationIcon/>
                  Find Path
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse component="li" in={true} timeout="auto" unmountOnExit>
              <PathList
                path={this.props.currentPath}
              />
            </Collapse>
          </div>
        ))}
      </List>
    );
  }


  handleClick = (nodeId) => {
    this.props.commandActions.findPath([nodeId, this.props.rootId])
  }

}



export default AliasList;
