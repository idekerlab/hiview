import React, { Component } from 'react'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

import List from '@material-ui/core/List'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import ContinuousFilter from './ContinuousFilter'
import BooleanFilter from './BooleanFilter'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ViewListIcon from '@material-ui/icons/ViewList'
import PrimaryEdgeSwitch from './PrimaryEdgeSwitch'

// 5 will be used at once
const COLORS = d3ScaleChromatic.schemeTableau10

const colorMap = idx => COLORS[idx]

const EDGE_GROUP_TAG = 'edge groups'

const OTHERS_TAG = 'Others'

const FILTER_TYPES = {
  CONTINUOUS: 'continuous',
  BOOLEAN: 'boolean'
}

const styles = theme => ({
  root: {
    position: 'relative',
    background: 'inherit',
    flexGrow: 2,
    padding: '0.6em'
  },
  title: {
    height: '2em'
  },
  list: {
    overflow: 'auto'
  },
  listItemLarge: {
    height: '1.3em',
    margin: 0,
    padding: '0.3em'
  },
  listItem: {
    height: '1.7em',
    margin: 0,
    padding: '0.3em'
    // paddingLeft: 0
  }
})

const getColor = idx => {
  const colorSpaceSize = COLORS.length
  return COLORS[idx % colorSpaceSize]
}

class EdgeFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      selected: new Array(5)
    }
  }

  onAfterChange = value => {
    console.log(value)
  }

  handleExpand = (event, val) => {
    this.setState({ [val]: !this.state[val] })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  handleClick = event => {
    const isOpen = this.state.open

    this.setState({
      open: !isOpen
    })
  }

  createCategories = edgeGroupString => {
    const parts = edgeGroupString.split('|')

    const result = {}
    const cat2filter = {}

    parts.forEach(entry => {
      const subCategories = entry.split(',')
      const header = subCategories[0]
      const categories = subCategories.slice(1, subCategories.length)

      cat2filter[header] = new Set(categories)

      categories.forEach(cat => {
        result[cat.replace('-', '_')] = header
      })
    })

    const bothMap = {
      filter2cat: result,
      cat2filter
    }
    return bothMap
  }

  render() {
    const { classes } = this.props
    const { filters, networkData, uiState, uiStateActions } = this.props
    const filterState = uiState.get('filterState')

    let edgeGroupsText = null
    let categories = {}

    if (networkData !== undefined) {
      edgeGroupsText = networkData[EDGE_GROUP_TAG]

      if (edgeGroupsText !== undefined) {
        categories = this.createCategories(edgeGroupsText)
      }
    }

    if (!filters || filters.length === 0 || !Array.isArray(filters)) {
      return <div />
    }

    let primaryFilter = null
    const filterNames = []
    const filterMap = {}

    filters.forEach(filter => {
      const isPrimary = filter.isPrimary
      if (isPrimary) {
        primaryFilter = filter
      } else {
        filterNames.push(filter.attributeName)
        filterMap[filter.attributeName] = filter
      }
    })

    const sortedNames = filterNames.sort()

    if (edgeGroupsText === undefined) {
      // Old data format.  Just render plain list
      return (
        <div className={classes.root}>
          <Typography variant="subtitle1" className={classes.title}>
            Interaction Features:
          </Typography>
          <PrimaryEdgeSwitch
            uiState={uiState}
            uiStateActions={uiStateActions}
          />

          <List>
            {sortedNames.map((filterName, idx) => (
              <ListItem key={filterName}>
                {this.getFilter(
                  idx,
                  filterMap[filterName],
                  filterState,
                  uiStateActions
                )}
              </ListItem>
            ))}
          </List>
        </div>
      )
    }

    // Now creates sub-categories
    return (
      <div className={classes.root}>
        <Typography variant="subtitle1" className={classes.title}>
          Interaction Features:
        </Typography>

        {this.generateFilterList(
          sortedNames,
          filterMap,
          categories.filter2cat,
          categories.cat2filter,
          filterState,
          uiStateActions
        )}
      </div>
    )
  }

  generateFilterList = (
    sortedNames,
    filterMap,
    filter2cat,
    cat2filter,
    filterState,
    uiStateActions
  ) => {
    if (!filter2cat) {
      return <List />
    }
    const tags = new Set(Object.values(filter2cat))
    let sortedCategoryNames = [OTHERS_TAG, ...tags].sort()

    const filterListMap = this.getExistingFilters(
      sortedNames,
      cat2filter,
      filter2cat,
      filterMap,
      filterState,
      uiStateActions
    )

    // Remove if no children
    const catNameSet = new Set(sortedCategoryNames)
    sortedCategoryNames.forEach(cat => {
      if (filterListMap[cat] === undefined) {
        catNameSet.delete(cat)
      }
    })

    sortedCategoryNames = [...catNameSet].sort()

    return (
      <List dense={true} style={{ margin: 0, padding: 0 }}>
        {sortedCategoryNames.map((categoryName, i) => (
          <div key={i}>
            <ListItem
              button
              onClick={d => this.handleExpand(d, categoryName)}
              style={{ background: '#EEEEEE' }}
            >
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText
                primary={categoryName.replace(/_/g, ' ')}
                style={{ fontSize: '1.2em' }}
              />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state[categoryName]} unmountOnExit>
              {filterListMap[categoryName]}
            </Collapse>
          </div>
        ))}
      </List>
    )
  }

  getExistingFilters = (
    allFilterNames,
    cat2filter,
    filter2cat,
    filterMap,
    filterState,
    uiStateActions
  ) => {
    const newFilters = {}

    // All filters without parent categories will be here.
    newFilters[OTHERS_TAG] = []

    allFilterNames.forEach((filterName, idx) => {
      // Check this filter has parent category or not
      let categoryName = filter2cat[filterName]
      if (categoryName === undefined) {
        // This one does not have parent category
        const newFilterListItem = (
          <ListItem key={filterName}>
            {this.getFilter(
              idx,
              filterMap[filterName],
              filterState,
              uiStateActions
            )}
          </ListItem>
        )

        const othersList = newFilters[OTHERS_TAG]
        othersList.push(newFilterListItem)
        newFilters[OTHERS_TAG] = othersList

        return
      }
      const filterSet = cat2filter[categoryName]

      if (filterSet.has(filterName)) {
        let listForCategory = newFilters[categoryName]

        if (listForCategory === undefined) {
          listForCategory = []
        }
        const filterListItem = (
          <ListItem key={filterName}>
            {this.getFilter(
              idx,
              filterMap[filterName],
              filterState,
              uiStateActions
            )}
          </ListItem>
        )
        listForCategory.push(filterListItem)

        newFilters[categoryName] = listForCategory
      }
    })

    return newFilters
  }

  getFilter(idx, filter, filterState, uiStateActions) {
    if (filter === undefined) {
      return null
    }

    const networkData = this.props.networkData
    let currentSystem = null
    if (networkData !== undefined && networkData !== null) {
      currentSystem = networkData.name
    }

    const filterType = filter.type
    const defValue = Number(filter.min)
    let enabled = false
    const color = getColor(idx)

    if (filterType === FILTER_TYPES.CONTINUOUS) {
      const name = filter.attributeName
      let value = defValue
      const currentState = filterState.get(name)

      if (currentState) {
        value = currentState.value
        enabled = currentState.enabled
      }

      return (
        <ContinuousFilter
          key={filter.attributeName}
          label={filter.attributeName}
          min={Number(filter.min)}
          max={Number(filter.max)}
          value={value}
          enabled={enabled}
          step={0.001}
          filtersActions={this.props.filtersActions}
          commandActions={this.props.commandActions}
          commands={this.props.commands}
          isPrimary={false}
          selected={this.state.selected}
          uiStateActions={uiStateActions}
          color={color}
          currentSystem={currentSystem}
        />
      )
    } else if (filterType === FILTER_TYPES.BOOLEAN) {
      return (
        <BooleanFilter
          key={filter.attributeName}
          label={filter.attributeName}
          enabled={enabled}
          filtersActions={this.props.filtersActions}
          commandActions={this.props.commandActions}
          selected={this.state.selected}
          color={color}
          uiStateActions={uiStateActions}
          currentSystem={currentSystem}
        />
      )
    }
  }
}

export default withStyles(styles)(EdgeFilter)
