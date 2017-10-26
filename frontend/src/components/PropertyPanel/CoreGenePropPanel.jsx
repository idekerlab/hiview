import React, {Component} from 'react'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'

import OpenIcon from 'material-ui-icons/OpenInNew'
import ViewListIcon from 'material-ui-icons/ViewList'
import KeyIcon from 'material-ui-icons/VpnKey'

import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse'

import style from './style.css'

const CORE_PROPS = {
  symbol: 'symbol',
  name: 'name',
  other_names: 'other_names',
  alias: 'alias',
  pathway: 'pathway',
  entrezgene: 'entrezgene'
}

class CoreGenePropPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true,
      openAlias: true,
      openPathways: true
    }
  }

  checkType = (val) => {
    if(val === undefined) {
      return []
    } else if(typeof val === 'string') {
      return [val]
    } else {
      return val
    }
  }


  render() {
    // Entry from MyGene.info
    const geneInfo = this.props.geneInfo

    // required val
    const symbol = geneInfo[CORE_PROPS.symbol]
    const name = geneInfo[CORE_PROPS.name]

    // Array
    const otherNames = this.checkType(geneInfo[CORE_PROPS.other_names])
    const alias = this.checkType(geneInfo[CORE_PROPS.alias])

    const pathways = geneInfo[CORE_PROPS.pathway]

    // Keys
    const entrezgene = geneInfo[CORE_PROPS.entrezgene]
    const ensemblGene = geneInfo['ensembl']['gene']

    return (
      <div>
        <List dense={true} style={{margin: 0, padding: 0}}>

          <ListItem
          >
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText
              inset
              primary={entrezgene}
              secondary={'Entrez Gene ID'}
            />
          </ListItem>

          <ListItem
          >
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText
              inset
              primary={ensemblGene}
              secondary={'Ensembl Gene ID'}
            />
          </ListItem>

          <ListItem
            button
            onClick={this.handleExpand}
            style={{background: '#EEEEEE'}}
          >
            <ListItemIcon>
              <ViewListIcon/>
            </ListItemIcon>
            <ListItemText inset primary="Other Names:"/>
            {this.state.open ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
            {
              otherNames.map((otherName, i) =>

                (<ListItem
                  button
                  key={i}
                >
                  <ListItemText primary={otherName}/>
                </ListItem>))
            }
          </Collapse>

          <ListItem
            button
            onClick={this.handleExpandAlias}
            style={{background: '#EEEEEE'}}
          >
            <ListItemIcon>
              <ViewListIcon/>
            </ListItemIcon>
            <ListItemText inset primary="Alias:"/>
            {this.state.openAlias ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse in={this.state.openAlias} transitionDuration="auto" unmountOnExit>
            {
              alias.map((al, i) =>

                (<ListItem
                  button
                  key={i}

                >
                  <ListItemText
                    primary={al}
                  />
                </ListItem>))
            }
          </Collapse>

          <ListItem
            button
            onClick={this.handleExpandPathways}
            style={{background: '#EEEEEE'}}
          >
            <ListItemIcon>
              <ViewListIcon/>
            </ListItemIcon>
            <ListItemText inset primary="Pathways:"/>
            {this.state.openPathways ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse in={this.state.openPathways} transitionDuration="auto" unmountOnExit>
            {
              this.getPathwayList(pathways)
            }
          </Collapse>
        </List>
      </div>
    )
  }

  getPathwayList = (pathways) => {
    if (pathways === undefined) {
      return
    }

    const pathwayDbs = Object.keys(pathways)
    return pathwayDbs.map((pathwayDb, i) => {

      const entries = pathways[pathwayDb]

      if (typeof entries === 'object' && Array.isArray(entries)) {


        return (
          entries.map((ent, j) =>

            (
              <ListItem
                button
                key={j}
              >
                <OpenIcon
                  className={style.linkIcon}

                />
                <ListItemText
                  primary={ent.name}
                  secondary={pathwayDb + ': ' + ent.id}
                />

              </ListItem>
            ))
        )
      }

    })


  }

  handleExpand = () => {
    this.setState({open: !this.state.open});
  }

  handleExpandAlias = () => {
    this.setState({openAlias: !this.state.openAlias});
  }

  handleExpandPathways = () => {
    this.setState({openPathways: !this.state.openPathways});
  }
}


const handleClick = gene => () => {
  window.open(`http://www.genecards.org/cgi-bin/carddisp.pl?gene=${gene}`)
}


export default CoreGenePropPanel
