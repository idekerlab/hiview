import React, { Component } from "react";
import List, { ListItem } from "material-ui/List";

import ContinuousFilter from "./ContinuousFilter";
import BooleanFilter from "./BooleanFilter";

import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";


// Color map for 5 categorical data
const COLORS = ['#d01c8b','#0571b0','#f7f7f7','#66c2a5','#4dac26']
const colorMap = idx => COLORS[idx];

const FILTER_TYPES = {
  CONTINUOUS: "continuous",
  BOOLEAN: "boolean"
};

const styles = theme => ({
  root: {
    height: "inherit",
    position: "relative",
    background: 'inherit',
    flexGrow: 2,
    paddingRight: '0.6em'
  },
  title: {
    height: '2em'
  },
  list: {
    overflow: "auto",
    height: '13em'

  },
  listItemLarge: {
    height: "1.3em",
    margin: 0,
    padding: "0.3em"
  },
  listItem: {
    height: "1.5em",
    margin: 0,
    padding: "0.2em",
    paddingLeft: 0

  }
});

class EdgeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      selected: new Array(5)
    };
  }

  onAfterChange = value => {
    console.log(value);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClick = event => {
    const isOpen = this.state.open;

    this.setState({
      open: !isOpen
    });
  };

  render() {
    const { classes } = this.props;
    const filters = this.props.filters;

    if (filters === null || filters.length === 0) {
      return <div />;
    }

    let primaryFilter = null;
    const filterNames = [];
    const filterMap = {};

    filters.forEach(filter => {
      const isPrimary = filter.isPrimary;
      if (isPrimary) {
        primaryFilter = filter;
      } else {
        filterNames.push(filter.attributeName);
        filterMap[filter.attributeName] = filter;
      }
    });

    const sortedNames = filterNames.sort();

    return (
      <div className={classes.root}>
        <Typography variant="title" className={classes.title}>Interaction Features:</Typography>

          <List className={classes.list}>
            {sortedNames.map(filterName => (
              <ListItem className={classes.listItem} key={filterName}>
                {this.getFilter(filterMap[filterName])}
              </ListItem>
            ))}
          </List>
      </div>
    );
  }

  getFilter(filter) {
    const filterType = filter.type;

    if (filterType === FILTER_TYPES.CONTINUOUS) {
      return (
        <ContinuousFilter
          key={filter.attributeName}
          label={filter.attributeName}
          min={Number(filter.min)}
          max={Number(filter.max)}
          value={Number(filter.min)}
          enabled={filter.enabled}
          step={0.001}
          filtersActions={this.props.filtersActions}
          commandActions={this.props.commandActions}
          commands={this.props.commands}
          isPrimary={false}
          selected={this.state.selected}
          colorMap={colorMap}
        />
      );
    } else if (filterType === FILTER_TYPES.BOOLEAN) {
      return (
        <BooleanFilter
          key={filter.attributeName}
          label={filter.attributeName}
          enabled={filter.enabled}
          filtersActions={this.props.filtersActions}
          commandActions={this.props.commandActions}
          selected={this.state.selected}
          colorMap={colorMap}
        />
      );
    }
  }
}

export default withStyles(styles)(EdgeFilter);
