import React, {Component} from 'react'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import OpenIcon from 'material-ui-icons/OpenInNew'


class SearchResult extends Component {

  render() {
    let results = this.props.search.result
    if (results === undefined || results === null) {
      results = []
    }

    console.log(results.sort())

    return (
      <List>
        {
          results.map((result, i) =>

            (<ListItem
              button
              onClick={this.handleClick(result)}
              key={i}
            >
              <ListItemIcon>
                <OpenIcon/>
              </ListItemIcon>
              <ListItemText
                primary={this.props.id2label[result]}
                secondary={result}
              />
            </ListItem>))
        }
      </List>
    )
  }

  handleClick = result => () => {
    console.log(result)
    this.props.commandActions.zoomToNode(result)
  }

}

export default SearchResult
