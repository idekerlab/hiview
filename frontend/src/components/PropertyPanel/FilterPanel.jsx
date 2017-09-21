import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List'

import FilterIcon from 'material-ui-icons/Tune'
import EdgeTypeIcon from 'material-ui-icons/FormatListBulleted'
import SliderIcon from 'material-ui-icons/NetworkCell'

import Checkbox from 'material-ui/Checkbox'

const style = {
  width: '100%',
  background: '#FAFAFA',
  zIndex: 1000
}

const edgeTypes = [
  'Protein-protein interactions (high-throughput)',
  'Domain co-occurrence',
  'Genomic context',
  'Phylogenetic similarity',
  'Predicted from 3D structure',
  'Protein-protein interactions (low-throughput)',
  'Co-citation'
]

const sliderStyle = {
  width: '80%',
  paddingLeft: '10%',
  margin: 0
}


class FilterPanel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sliderVal: 0,
      edgeTypeSelected: new Set(edgeTypes)
    }
  }

  render() {

    return (
      <div style={style}>
        <List>
          <ListItem
            key={0}
            primaryText="Filter:"
            leftIcon={<FilterIcon />}
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                key={1}
                primaryText="Edge Type"
                leftIcon={<EdgeTypeIcon />}
                nestedItems={this.getTypeList()}
              />,
              <ListItem
                key={2}
                primaryText={"Score Threshold: " + this.state.sliderVal}
                leftIcon={<SliderIcon />}
                nestedItems={[
                  <ListItem
                    key={1}
                    hoverColor={"white"}
                  >
                    {/*<Slide*/}
                      {/*style={sliderStyle}*/}
                      {/*axis="x"*/}
                      {/*defaultValue={0}*/}
                      {/*onChange={(event, value) => this.valueSet(event, value)}*/}
                      {/*onDragStop={this.filterByScore}*/}
                    {/*/>*/}
                  </ListItem>
                ]}
              />
            ]}
          />
        </List>
      </div>
    )
  }

  filterByScore = () => {
    console.log("#### Filter")
    console.log(this.state.sliderVal)
    this.props.setScore(this.state.sliderVal)

  }

  valueSet = (evt, value) => {
    this.state.sliderVal = value
  }

  getTypeList = () => {
    let index = 1
    return edgeTypes.map(eType => {

      const color = this.props.colorFunction(eType)
      const itemStyle = {
        color: color,
        fontWeight: 400
      }

      let selected = false
      if(this.state.edgeTypeSelected.has(eType)) {
        selected = true
      }

      return (
        <ListItem
          key={index++}
          style={itemStyle}
          primaryText={eType}
          leftCheckbox={
            <Checkbox
              defaultChecked={selected}
              onCheck={this.checked}
            />
          }
        />
      )
    })
  }

  checked = (evt, val) => {
    console.log(evt)
    console.log(val)
  }

}

export default FilterPanel
