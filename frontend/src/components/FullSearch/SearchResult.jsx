import React, {Component} from 'react'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import OpenIcon from 'material-ui-icons/OpenInNew'


const resultStyle = {
  maxHeight: '30em',
  overflow: 'auto',
}


const buildNestedList = (idList, id2prop) => {

  const originals = []

  idList.forEach(id => {
    const props = id2prop[id]
    if(!props.Hidden) {
      originals.push(props.Label)
    }
  })
}



const SearchResult = (props) => {

  let results = props.search.result

  if (results === undefined || results === null) {
    return (
      <List style={resultStyle}>
        <ListItem>
          <ListItemText
            primary={"No result!"}
          />
        </ListItem>
      </List>
    )
  }

  const id2prop = props.id2prop

  let i = results.length
  const labels = new Array(i)

  while (--i) {
    labels[i] = id2prop[results[i]].Label
  }


  return (
    <List style={resultStyle}>
      {
        results.map((result, i) =>

          (<ListItem
            button
            onClick={handleClick(result, props.rootId, props.commandActions)}
            key={i}
          >
            <ListItemIcon>
              <OpenIcon/>
            </ListItemIcon>
            <ListItemText
              primary={id2prop[result].Label}
              secondary={id2prop[result].NodeType + '(' + id2prop[result].Hidden + ')'}
            />
          </ListItem>))
      }
    </List>
  )
}

const handleClick = (nodeId, rootId, action) => () => {
  console.log('------------------------------------------------------------------------------')
  action.zoomToNode(nodeId)
  action.findPath([nodeId, rootId])

}


export default SearchResult
