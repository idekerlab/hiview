import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

import OpenIcon from 'material-ui-icons/OpenInNew'
import ViewListIcon from 'material-ui-icons/ViewList'
import KeyIcon from 'material-ui-icons/VpnKey'

import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Collapse from 'material-ui/transitions/Collapse'

import GoPanel from './GoPanel'

import style from './style.css'

const CORE_PROPS = {
  symbol: 'symbol',
  name: 'name',
  other_names: 'other_names',
  alias: 'alias',
  pathway: 'pathway',
  entrezgene: 'entrezgene',
  go: 'go'
}

const PATHWAY_DB = {
  kegg: 'http://www.kegg.jp/entry/',
  reactome: 'https://reactome.org/content/detail/',
  wikipathways: 'https://www.wikipathways.org/index.php/Pathway:'
}

class CoreGenePropPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      openGo: true,
      openAlias: true,
      openPathways: true
    }
  }

  checkType = val => {
    if (val === undefined) {
      return []
    } else if (typeof val === 'string') {
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

    const geneOntology = geneInfo[CORE_PROPS.go]

    // Array
    const otherNames = this.checkType(geneInfo[CORE_PROPS.other_names])
    const alias = this.checkType(geneInfo[CORE_PROPS.alias])

    const pathways = geneInfo[CORE_PROPS.pathway]

    // Keys
    const entrezgene = geneInfo[CORE_PROPS.entrezgene]

    const ensembl = geneInfo['ensembl']
    let ensemblGene = 'N/A'
    if (ensembl !== undefined) {
      ensemblGene = ensembl['gene']
    }

    return (
      <div>
        <List dense={true} style={{ margin: 0, padding: 0 }}>
          <ListItem>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText
              inset
              primary={entrezgene}
              secondary={'Entrez Gene ID'}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText
              inset
              primary={ensemblGene}
              secondary={'Ensembl Gene ID'}
            />
          </ListItem>

          <GoPanel
            go={geneOntology}
            open={this.state.openGo}
            handleExpand={this.handleExpandGo}
          />

          <ListItem
            button
            onClick={this.handleExpand}
            style={{ background: '#EEEEEE' }}
          >
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText inset primary="Other Names:" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} unmountOnExit>
            {otherNames.map((otherName, i) => (
              <ListItem key={i}>
                <ListItemText primary={otherName} />
              </ListItem>
            ))}
          </Collapse>

          <ListItem
            button
            onClick={this.handleExpandAlias}
            style={{ background: '#EEEEEE' }}
          >
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText inset primary="Alias:" />
            {this.state.openAlias ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openAlias} unmountOnExit>
            {alias.map((al, i) => (
              <ListItem key={i}>
                <ListItemText primary={al} />
              </ListItem>
            ))}
          </Collapse>

          <ListItem
            button
            onClick={this.handleExpandPathways}
            style={{ background: '#EEEEEE' }}
          >
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText inset primary="Pathways:" />
            {this.state.openPathways ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openPathways} unmountOnExit>
            {this.getPathwayList(pathways)}
          </Collapse>
        </List>
      </div>
    )
  }

  getPathwayList = pathways => {
    if (pathways === undefined) {
      return
    }

    const pathwayDbs = Object.keys(pathways)
    return pathwayDbs.map((pathwayDb, i) => {
      const entries = pathways[pathwayDb]

      if (typeof entries === 'object' && Array.isArray(entries)) {
        return entries.map((ent, j) => (
          <ListItem
            button
            key={j}
            onMouseEnter={e => this.handlePathwayHover(pathwayDb, ent.id)}
          >
            <OpenIcon
              className={style.linkIcon}
              onClick={e => this.handlePathwayClick(pathwayDb, ent.id)}
            />
            <ListItemText
              primary={ent.name}
              secondary={pathwayDb + ': ' + ent.id}
            />
          </ListItem>
        ))
      }
    })
  }

  handleExpand = () => {
    this.setState({ open: !this.state.open })
  }

  handleExpandGo = () => {
    this.setState({ openGo: !this.state.openGo })
  }

  handleExpandAlias = () => {
    this.setState({ openAlias: !this.state.openAlias })
  }

  handleExpandPathways = () => {
    this.setState({ openPathways: !this.state.openPathways })
  }

  handlePathwayClick = (databaseName, pathwayId) => {
    const url = PATHWAY_DB[databaseName]
    if (url !== undefined) {
      window.open(url + pathwayId)
    }
  }

  handlePathwayHover = (databaseName, pathwayId) => {
    const url = PATHWAY_DB[databaseName]
  }
}

export default CoreGenePropPanel
