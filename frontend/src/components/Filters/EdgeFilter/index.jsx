import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import OpenIcon from 'material-ui-icons/OpenInNew'
import Collapse from 'material-ui/transitions/Collapse'

import KeyIcon from 'material-ui-icons/VpnKey'

import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'

import ContinuousFilter from './ContinuousFilter'
import BooleanFilter from './BooleanFilter'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import ViewListIcon from 'material-ui/SvgIcon/SvgIcon';

// Color map for 5 categorical data
const COLORS = ['#7570b3', '#0571b0', '#aaaaaa', '#66c2a5', '#018571']
const colorMap = idx => COLORS[idx]

const EDGE_GROUP_TAG = 'edge groups'

const FILTER_TYPES = {
  CONTINUOUS: 'continuous',
  BOOLEAN: 'boolean'
}

const styles = theme => ({
  root: {
    position: 'relative',
    background: 'inherit',
    flexGrow: 2,
    paddingRight: '0.6em'
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

  handleExpand = () => {
    this.setState({ open: !this.state.open })
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
    console.log('CAT list', bothMap)

    return bothMap
  }

  render() {
    const { classes } = this.props
    const filters = this.props.filters
    const networkData = this.props.networkData

    console.log('FILTER NDL ', networkData)

    let edgeGroupsText = null
    let categories = {}

    if (networkData !== undefined) {
      edgeGroupsText = networkData[EDGE_GROUP_TAG]

      if (edgeGroupsText !== undefined) {
        categories = this.createCategories(edgeGroupsText)
      }
    }

    if (!filters || filters.length === 0) {
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

    // Now creates sub-categories

    return (
      <div className={classes.root}>
        <Typography variant="title" className={classes.title}>
          Interaction Features:
        </Typography>

        {this.generateFilterList(
          sortedNames,
          filterMap,
          categories.filter2cat,
          categories.cat2filter
        )}

        {/*<List className={classes.list}>*/}
        {/*{sortedNames.map(filterName => (*/}
        {/*<ListItem className={classes.listItem} key={filterName}>*/}
        {/*{this.getFilter(filterMap[filterName])}*/}
        {/*</ListItem>*/}
        {/*))}*/}
        {/*</List>*/}
      </div>
    )
  }

  generateFilterList = (sortedNames, filterMap, filter2cat, cat2filter) => {
    if (!filter2cat) {
      return <List />
    }
    const tags = new Set(Object.values(filter2cat))
    const sortedCategoryNames = [...tags].sort()

    console.log(sortedCategoryNames, filter2cat, cat2filter)

    const filterListMap = this.getExistingFilters(
      sortedNames,
      cat2filter,
      filter2cat,
      filterMap
    )

    console.log('FINAl MAP = ', filterListMap)

    const filterList = (
      <List>
        {sortedCategoryNames.map((categoryName, i) => (
          <ListItem key={i}>
            <ListItem
              button
              onClick={this.handleExpand}
              style={{ background: '#EEEEEE' }}
            >
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText inset primary={categoryName} />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>


            <Collapse in={this.state.open} unmountOnExit>
              {filterListMap[categoryName]}
            </Collapse>
          </ListItem>
        ))}
      </List>
    )

    return filterList
  }

  getExistingFilters = (allFilterNames, cat2filter, filter2cat, filterMap) => {
    const newFilters = {}
    console.log('Mapping data', filter2cat, cat2filter)

    allFilterNames.forEach(filterName => {
      // Check this filter has parent category or not
      let categoryName = filter2cat[filterName]
      if (categoryName === undefined) {
        // This one does not have parent category
        return
      }

      const filterSet = cat2filter[categoryName]

      // console.log('name and set = ',filterName, categoryName, filterSet)

      if (filterSet.has(filterName)) {
        let listForCategory = newFilters[categoryName]

        if (listForCategory === undefined) {
          listForCategory = []
        }
        const filterListItem = (
          <ListItem key={filterName}>
            {this.getFilter(filterMap[filterName])}
          </ListItem>
        )
        listForCategory.push(filterListItem)

        newFilters[categoryName] = listForCategory
      }
    })

    return newFilters
  }

  getFilter(filter) {
    if (filter === undefined) {
      return null
    }
    const filterType = filter.type

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
      )
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
      )
    }
  }
}

export default withStyles(styles)(EdgeFilter)
