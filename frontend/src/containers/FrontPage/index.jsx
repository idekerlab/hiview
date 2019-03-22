import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import 'typeface-roboto'
import { MuiThemeProvider } from '@material-ui/core/styles'

import TopPage from '../../components/TopPage/index'
import * as networkActions from '../../actions/network'

import { theme } from '../theme'

const FrontPage = props => (
  <MuiThemeProvider theme={theme}>
    <TopPage {...props} />
  </MuiThemeProvider>
)

const mapStateToProps = state => ({
})

function mapDispatchToProps(dispatch) {
  return {
    networkActions: bindActionCreators(networkActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage)
