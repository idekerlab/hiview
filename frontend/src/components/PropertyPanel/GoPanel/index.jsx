import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ViewListIcon from '@material-ui/icons/ViewList'

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import GoCategoryPanel from './GoCategoryPanel'


const GoPanel = props => {
  const go = props.go

  if(go === undefined) {
    return <div />
  }

  const bp = go.BP
  const cc = go.CC
  const mf = go.MF

  return (

    <div>
      <ListItem
        button
        onClick={props.handleExpand}
        style={{background: '#EEEEEE'}}
      >
        <ListItemIcon>
          <ViewListIcon/>
        </ListItemIcon>
        <ListItemText inset primary="Gene Ontology:"/>

        {props.open ? <ExpandLess/> : <ExpandMore/>}

      </ListItem>

      <Collapse in={props.open} unmountOnExit>
        <GoCategoryPanel
          category={bp}
          name={"Biological Process"}
        />
        <GoCategoryPanel
          category={cc}
          name={"Cellular Component"}
        />
        <GoCategoryPanel
          category={mf}
          name={"Molecular Function"}
        />
      </Collapse>
    </div>
)


}

export default GoPanel

