import React, {Component} from 'react'

import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import OpenIcon from 'material-ui-icons/OpenInNew'


class GeneList extends Component {

  render() {
    let genes = this.props.genes
    if (genes === undefined || genes === null) {
      genes = []
    }

    console.log(genes.sort())
    return (

      <List>
        {
          genes.map((gene, i) =>

            (<ListItem
              button
              onClick={this.handleClick(gene)}
              key={i}
            >
              <ListItemIcon>
                <OpenIcon/>
              </ListItemIcon>
              <ListItemText primary={gene}/>
            </ListItem>))
        }
      </List>
    )
  }

  handleClick = gene => () => {
    window.open(`http://www.genecards.org/cgi-bin/carddisp.pl?gene=${gene}`)
  }

}

export default GeneList
