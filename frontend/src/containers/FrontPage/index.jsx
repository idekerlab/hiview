import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TopPage from '../../components/TopPage/index'
import * as dataSourceActions from '../../actions/datasource'


class FrontPage extends Component {

  render() {

    return (
      <MuiThemeProvider>
        <TopPage
          dataSource={this.props.dataSource}
          dataSourceActions={this.props.dataSourceActions}
        />
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => (
  {
    dataSource: state.datasource
  }
)

function mapDispatchToProps(dispatch) {
  return {
    dataSourceActions: bindActionCreators(dataSourceActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage)
