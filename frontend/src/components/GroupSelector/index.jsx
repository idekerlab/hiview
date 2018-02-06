import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Checkbox from "material-ui/Checkbox";
import List, {
  ListItem,
  ListItemText
} from "material-ui/List";
import Avatar from "material-ui/Avatar";

import Typography from "material-ui/Typography";
import * as d3Scale from "d3-scale";

const PANEL_TITLE = 'Subsystems'


const colorMap = d3Scale.scaleOrdinal(d3Scale.schemeCategory20c);

const styles = theme => ({
  root: {
    width: "30%",
    background: 'inherit',
    minWidth: "14em",
    color: "#333333",
    position: "relative"
  },
  title: {
    height: '2em'
  },
  list: {
    overflow: "auto",
    height: '13em'
  },
  listItem: {
    height: "1.8em",
    margin: 0,
    padding: "0.2em"
  }
});


class GroupSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedGroups: new Map(),
      groupColors: new Map()
    };

    const selectedGroups = this.state.selectedGroups;
    const groupColors = this.state.groupColors;
    const groupNames = Object.keys(this.props.groups);

    let i = 0
    for(const groupName of groupNames) {
      selectedGroups.set(groupName, false);
      groupColors.set(groupName, colorMap(i))
      i++;
    }
  }

  handleToggle = value => event => {
    const checked = event.target.checked;
    const geneIds = this.props.groups[value];
    const selectionMap = this.state.selectedGroups;
    selectionMap.set(value, checked);
    this.setState({ selectedGroups: selectionMap });

    if (geneIds === undefined || geneIds.length === 0) {
      return;
    }

    const selectedColor = this.state.groupColors.get(value)

    // Create map of selected values
    const selectedColors = new Map()

    for(let [groupName, selected] of this.state.selectedGroups) {
      if(selected) {
        selectedColors.set(groupName, this.state.groupColors.get(groupName))
      }
    }

    if (checked) {
      this.props.commandActions.selectNodes({
        idList: geneIds,
        selectedColor: selectedColor,
        groupColors: this.state.groupColors
      });
    } else {
      this.props.commandActions.unselectNodes({ idList: geneIds });
    }
  };

  render() {
    const { classes } = this.props;
    const groupNames = Object.keys(this.props.groups);
    let i = 0;
    return (
      <div className={classes.root}>

        <Typography variant="title" className={classes.title}>{PANEL_TITLE}</Typography>

        <List className={classes.list}>
          {groupNames.map(group => {
            const color = colorMap(i++);
            const avatarStyle = {
              // margin: 0,
              color: "#FFFFFF",
              backgroundColor: color,
              height: "1.4em",
              width: "1.4em"
            };

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
                <Avatar style={avatarStyle}>
                  {this.props.groups[group].length}
                </Avatar>
                <ListItemText primary={group} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(GroupSelector);
