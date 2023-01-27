import React from 'react'
import OpenIcon from '@material-ui/icons/OpenInNew'
import { Typography, Button } from '@material-ui/core'

import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      boxSizing: 'border-box',
      margin: 0,
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      width: '100%',
    },
    linkIcon: {
      marginRight: theme.spacing(1),
      color: '#222222',
      '&:hover': {
        color: 'dodgerblue',
      },
    },
    buttons: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: theme.spacing(0.5),
      textTransform: 'none'

    },
    button: {
      marginRight: theme.spacing(1),
    },
    title: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    geneSymbol: {
      color: '#333333',
      marginRight: theme.spacing(2),
    },
  }),
)

const TitleBar = props => {
  const { geneSymbol, altSymbol, title } = props
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.buttons}>
        <Typography variant="h4" className={classes.geneSymbol}>
          {altSymbol === undefined ? geneSymbol : altSymbol}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<OpenIcon />}
          onClick={_handleGeneCardsClick(props.geneSymbol)}
        >
          GeneCards
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<OpenIcon />}
          onClick={_handlePdbClick(props.geneSymbol)}
        >
          PDB
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<OpenIcon />}
          onClick={_handleAlphaClick(props.geneSymbol)}
        >
          AlphaFold
        </Button>
      </div>
      <div className={classes.title}>
        <Typography variant="h6">{props.title}</Typography>
      </div>
    </div>
  )
}

const _handleGeneCardsClick = gene => () => {
  window.open(`https://www.genecards.org/cgi-bin/carddisp.pl?gene=${gene}`)
}

const _handlePdbClick = gene => () => {
  window.open(`https://www.ebi.ac.uk/pdbe/entry/search/index?view=macromolecules&gene_name:${gene}`)
}

const _handleAlphaClick = gene => () => {
  window.open(`https://alphafold.ebi.ac.uk/search/text/${gene}?organismScientificName=Homo%20sapiens`)
}

export default TitleBar
