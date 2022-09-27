import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ListSubheader, List, Tooltip, Typography } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import { parseProps, convertProps } from '../../../utils/edge-prop-util'
import EvidenceClassListItem from './EvidenceClassListItem'

// This is the special key value for encoded string
export const NDEX_EVIDENCE_KEY = 'ndex:evidence'

const TITLE_TOOLTIP =
  'SHapley Additive eXplanations, grouped by class of evidence (physical, co-expression, co-abundance, co-dependency). Click any interaction in the DAS network to see an explanation of the DAS score. The explanation comes in the form of Shapley values  [Lundberg, Scott M., and Su-In Lee. "A unified approach to interpreting model predictions." Advances in neural information processing systems 30 (2017)]. These SHAP scores shown indicate the contribution of the respective input feature to the DAS score. SHAP and DAS scores are on the same scale. Only the most important SHAP scores are shown (those that are more than one standard deviation from the mean). For features embedded with node2vec [], we also show the subnetwork supporting the interaction [Grover, Aditya, and Jure Leskovec. "node2vec: Scalable feature learning for networks." Proceedings of the 22nd ACM SIGKDD international conference on Knowledge discovery and data mining. 2016.]. Note that you can expand each class to see explanations at a higher granularity.'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '10em',
    backgroundColor: theme.palette.background.default,
  },
  subtitle: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  row: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    paddingLeft: theme.spacing(1)
  }
}))

const EdgeInfoPanel = ({
  selectedEdge,
  network,
  queryPathsActions,
  queryPaths,
}) => {
  const classes = useStyles()
  const [listData, setListData] = useState([])

  useEffect(() => {
    if (selectedEdge === null || selectedEdge === undefined) {
      setListData(null)
      return
    }

    const { edge } = selectedEdge
    if (edge === undefined || edge === null) {
      setListData(null)
      return
    }
    const evidence = edge[NDEX_EVIDENCE_KEY]
    if (
      evidence === undefined ||
      evidence === null ||
      !Array.isArray(evidence)
    ) {
      setListData(null)
      return
    }

    const evidences = evidence.map((ev) => parseProps(ev))
    const nestedList = convertProps(evidences)

    setListData(nestedList)
  }, [selectedEdge])

  if (
    listData === null ||
    listData === undefined ||
    listData.length === 0 ||
    selectedEdge === undefined ||
    selectedEdge === null
  ) {
    return null
  }

  return (
    <List
      dense={true}
      component="nav"
      aria-labelledby="nested-edge-property-list"
      subheader={
        <ListSubheader
          className={classes.subtitle}
          component="div"
          id="nested-list-subheader"
        >
          <div className={classes.row}>
            <Tooltip
              arrow
              title={<Typography style={{padding: '1em'}} variant={'body1'}>{TITLE_TOOLTIP}</Typography>}
            >
              <InfoIcon fontSize="small" />
            </Tooltip>
            <Typography
              variant="subtitle1"
              className={classes.title}
              color="textPrimary"
            >
              {`Selected evidence: ${selectedEdge.source} - ${selectedEdge.target}`}
            </Typography>
          </div>
        </ListSubheader>
      }
      className={classes.root}
    >
      {Object.keys(listData).map((key, idx) => {
        const entry = listData[key]
        return (
          <EvidenceClassListItem
            edgeClass={key}
            selectedEdge={selectedEdge}
            key={`evidence-${idx}`}
            evidenceList={entry}
            queryPaths={queryPaths}
          />
        )
      })}
    </List>
  )
}

export default EdgeInfoPanel
