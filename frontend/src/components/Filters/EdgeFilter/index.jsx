import React, {Component} from 'react'

import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css'


class EdgeFilter extends Component {
  render() {

    return (
      <div>
        <Slider/>
        <Range/>
      </div>
    )

  }
}

export default EdgeFilter