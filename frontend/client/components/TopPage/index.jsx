import React, { Component } from 'react'

import Title from './Title'
import Footer from './Footer'

import style from './style.css'

class TopPage extends Component {
  render() {

    console.log('---------------DSA222222222')
    console.log(this.props)
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
