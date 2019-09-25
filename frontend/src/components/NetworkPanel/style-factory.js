const getVisualStyle = (minSize, maxSize) => ({
  style: [
    {
      selector: 'node',
      css: {
        content: 'data(Label)',
        'text-valign': 'center',
        'text-halign': 'right',
        shape: 'ellipse',
        color: '#666666',
        'background-color': '#AAAAAA',
        height: 5,
        width: 5,
        'text-opacity': 0.8,
        'text-wrap': 'wrap',
        'z-index': 1,
        'text-margin-x': 2,
        'text-rotation': 'data(angle)',
        'min-zoomed-font-size': '0.2em'
      }
    },
    {
      selector:
        'node[angle <= ' +
        (Math.PI + Math.PI * 1.5) +
        '][angle >=' +
        (Math.PI + Math.PI / 2.0) +
        ']',
      css: {
        'text-halign': 'left'
      }
    },
    {
      selector: "node[Gene_or_Term = 'Gene']",
      css: {
        'font-size': 1,
        'text-rotation': 0,
        visibility: 'hidden'
      }
    },
    {
      selector: "node[Gene_or_Term = 'Term']",
      css: {
        'font-size': 'mapData(Size,' + minSize + ',' + maxSize + ', 0.1, 20)',
        height: 'mapData(Size,' + minSize + ',' + maxSize + ', 6, 50)',
        width: 'mapData(Size,' + minSize + ',' + maxSize + ', 6, 50)',
        'background-color': '#607D8B'
      }
    },
    {
      selector: "node[isRoot = 'True']",
      css: {
        'font-size': '3em',
        'background-color': 'darkorange',
        color: 'darkorange'
      }
    },
    {
      selector: 'node:selected',
      css: {
        'background-color': 'orange',
        'font-size': '1em',
        color: 'orange',
        'text-opacity': 1,
        'z-index': 999,
        visibility: 'visible'
      }
    },
    {
      selector: 'edge',
      css: {
        width: 1.0,
        opacity: 1,
        'mid-target-arrow-shape': 'triangle',
        'mid-target-arrow-color': '#777777',
        'line-color': '#777777'
      }
    },
    {
      selector: "edge[EdgeType = 'Gene-Term']",
      css: {
        'line-color': 'teal',
        opacity: 0.2,
        'mid-target-arrow-shape': 'none',
        width: 0.2
      }
    },
    {
      selector: 'edge:selected',
      css: {
        'line-color': 'orange',
        'mid-target-arrow-color': 'orange',
        'target-arrow-color': 'orange',
        width: 3,
        'z-index': 999,
        opacity: 1
      }
    },
    {
      selector: '.focused',
      css: {
        'background-color': 'teal',
        'font-size': '4em',
        color: 'teal',
        'text-opacity': 1,
        'text-max-width': '500px',
        'z-index': 999,
        'min-zoomed-font-size': 0,
        width: 50,
        height: 50
      }
    },
    {
      selector: '.faded',
      css: {
        'background-color': 'black',
        'line-color': 'black',
        color: 'black',
        opacity: 0.2
      }
    }
  ]
})

export default getVisualStyle
