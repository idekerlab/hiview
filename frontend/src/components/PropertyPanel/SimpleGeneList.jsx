import React, {Component, PropTypes} from 'react'

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import OpenIcon from 'material-ui/svg-icons/action/open-in-new'

class SimpleGeneList extends Component {

  render() {

    let genes = this.props.genes
    if (genes === undefined || genes === null) {
      genes = []
    }

    return (

      <div>
        <List>
          <Subheader>Assigned Genes:</Subheader>

          {
            genes.map((gene, i) => {
            return (<ListItem key={i} hoverColor={'#80CBC4'} primaryText={gene}/>)
          })
}
        </List>
      </div>
    )
  }

  _handleTouchTap = id => {
    window.open('http://www.yeastgenome.org/locus/' + id);
  }

}

export default SimpleGeneList
