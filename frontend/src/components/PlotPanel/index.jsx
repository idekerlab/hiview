import React from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries,
} from "react-vis";

const PlotPanel = props => {

  const width = props.width
  const height = props.height
  if(props.data === null) {
    return (<div/>)
  }

  const kegg = props.data['KEGG_2016']
  const series = []
  for(let i = 0; i<20; i++) {
    const entry = kegg[i]
    console.log(entry)
    entry.forEach(d => {console.log(d)})
    const keggEntry = { y: entry[1].split('_')[0], x: entry[4] }
    series.push(keggEntry)
  }


  return(
    <div style={{paddingLeft: '2em'}}>
      <XYPlot
        width={width}
        height={height}
        yType="ordinal"
        stackBy="x"
      >
        <VerticalGridLines />

        <HorizontalGridLines />

        <XAxis />
        <YAxis title={"KEGG"} />

        <HorizontalBarSeries
          data={series}
          // data={[{ y: 'test1', x: 10 }, { y: 'test2', x: 5 }, { y: 4, x: 15 }, { y: 5, x: 7 }]}
        />
      </XYPlot>
    </div>
  );
}

export default PlotPanel
