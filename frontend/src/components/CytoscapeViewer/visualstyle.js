const DEFAULT_STYLE = [
  {
    selector: 'node',
    style: {
      'background-opacity': 0,
      // 'border-width': 2,
      // 'border-color': '#FFFFFF',
      shape: 'roundrectangle',
      width: 50,
      height: 18,
      label: 'data(name)',
      color: '#FFFFFF',
      'text-halign': 'center',
      'text-valign': 'center',
      'font-size': 18,
      'font-weight': 400
    }
  },
  {
    selector: 'edge',
    style: {
      'line-color': '#EEEEEE',
      width: 1,
      opacity: 0.4
    }
  },
  {
    selector: 'node[found]',
    style: {
      'background-opacity': 1,
      'background-color': '#33a02c',
      color: '#FFFFFF'
    }
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': 0,
      'font-size': 20,
      'background-color': '#FF0000',
      width: 80,
      height: 28,
      color: '#FFFFFF'
    }
  },
]

export default DEFAULT_STYLE
