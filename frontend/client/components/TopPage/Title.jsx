import React, {Component} from 'react'


import OntologySelector from './OntologySelector'

import style from './style.css'


export default class Title extends Component {


  render() {
    return (
      <div className={style.title}>

        <div className={style.col2}>
          <section className={style.titleText}>
            HiView &beta;
          </section>

          <section className={style.description}>
            Universal browser for hierarchical data
          </section>


          <OntologySelector
            {...this.props}
          />

        </div>
      </div>
    )
  }
}
