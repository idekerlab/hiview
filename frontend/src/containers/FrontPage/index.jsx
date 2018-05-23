import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import 'typeface-roboto'
import { MuiThemeProvider } from 'material-ui/styles'

import TopPage from '../../components/TopPage/index'
import * as dataSourceActions from '../../actions/datasource'

import { theme } from '../theme'

const FrontPage = props => (
  <MuiThemeProvider theme={theme}>
    <TopPage
      dataSource={props.dataSource}
      dataSourceActions={props.dataSourceActions}
    />
  </MuiThemeProvider>
)

const mapStateToProps = state => ({
  dataSource: state.datasource
})

function mapDispatchToProps(dispatch) {
  return {
    dataSourceActions: bindActionCreators(dataSourceActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
