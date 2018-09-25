import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import 'typeface-roboto'
import { MuiThemeProvider } from 'material-ui/styles'

import TopPage from '../../components/TopPage/index'

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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage)
