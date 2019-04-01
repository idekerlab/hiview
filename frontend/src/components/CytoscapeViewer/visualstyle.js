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
      'font-size': 10
    }
  },
  {
    selector: 'edge',
    style: {
      'line-color': 'green',
      width: 2,
      opacity: 0.7
    }
  },
  {
    selector: 'node:selected',
    style: {
      'font-size': 24,
      color: '#FF0000'
    }
  }
]

export default DEFAULT_STYLE
