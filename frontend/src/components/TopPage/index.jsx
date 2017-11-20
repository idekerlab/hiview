import React from 'react'
import SourceSelector from './SourceSelector'

import style from './style.css'


const TopPage = props => (
  <div className={style.container}>

    <div className={style.menubar}/>

    <div className={style.row1}>
      <div className={style.title}>
        <div className={style.titleText}>
          HiView &alpha;
        </div>

        <div className={style.subtitle}>
          Universal browser for hierarchical data
        </div>
      </div>
    </div>

    <SourceSelector
      {...props}
    />

    <footer className={style.row3}>
      <a href='https://github.com/idekerlab/hiview' target='_blank'>
        &copy; 2017-2018 University of California, San Diego Trey Ideker Lab
      </a>
    </footer>
  </div>
)

export default TopPage
