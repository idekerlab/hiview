import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import Divider from 'material-ui/Divider'
import SearchResult from './SearchResult'

import MainPanel from './MainPanel'

const styles = theme => ({

  card: {
    width: 400,
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
});

class SearchPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      expanded: false,
      id2label: {}
    }
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  componentWillReceiveProps(nextProps) {

    const nextResult = nextProps.search.result
    if(nextResult !== undefined && nextResult !== null) {
      if(nextResult.length !== 0) {
        this.setState({ expanded: true })

      } else {
        this.setState({ expanded: false })
      }
    } else {
      this.setState({ expanded: false })

    }

    const uuid = nextProps.datasource.uuid
    const networkKey = Object.keys(nextProps.network)

    let networkData = null
    networkKey.forEach(key=> {
      if(key.includes(uuid)) {
        networkData = nextProps.network[key]
      }
    })

    if(networkData !== null) {
      const id2label = networkData.id2label
      this.setState({id2label: id2label})
    }
  }


  render() {
    const { classes } = this.props;

    const titleStyle = {
      width: '100%',
      fontSize: '1.2em',
      fontWeight: 400,
      textAlign: 'center'
    }

    return (
      <div>

        <Card className={classes.card}>
          <MainPanel
            {...this.props}
          />

          <Divider/>

          <CardActions disableActionSpacing>

            <Typography type="title">
              Search Result
            </Typography>

            <div className={classes.flexGrow} />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>

              <SearchResult
                search={this.props.search}
                commandActions={this.props.commandActions}
                id2label={this.state.id2label}
              />
            </CardContent>
          </Collapse>

        </Card>
      </div>
    );
  }
}

SearchPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchPanel)