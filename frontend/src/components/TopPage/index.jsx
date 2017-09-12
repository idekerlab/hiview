import React, { Component } from 'react'

import Title from './Title'
import Footer from './Footer'

import style from './style.css'

class TopPage extends Component {
  render() {

    return (
      <div className={style.top}>
        <Title
          {...this.props}
        />
        <Footer />
      </div>
    )
  }
}

export default TopPage
