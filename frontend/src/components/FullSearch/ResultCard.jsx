class ResultCard extends Component {


  render() {
    return (
      <div>
        <CardActions disableActionSpacing>

          <Typography variant="title">
            Search Result
          </Typography>

          <div className={classes.flexGrow}/>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon/>
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent style={{padding: 0}}>

            <SearchResult
              search={this.props.search}
              commandActions={this.props.commandActions}
              id2prop={id2prop}
              rootId={rootId}
              currentPath={this.props.currentPath}
            />
          </CardContent>
        </Collapse>
      </div>
    )
  }
}
oexp