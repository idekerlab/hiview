
import React, {Component} from 'react'
import { Mosaic } from 'react-mosaic-component'

const ELEMENT_MAP = {
  a: (<div>Left Window</div>),
  b: (<div>Top Right Window</div>),
  c: (<div>Bottom Right Window</div>)
}

const Windows = () => (
  <Mosaic
    renderTile={ id => ELEMENT_MAP[id] }
    initialValue={{
      direction: 'row',
      first: 'a',
      second: {
        direction: 'column',
        first: 'b',
        second: 'c'
      }
    }}
  />
)