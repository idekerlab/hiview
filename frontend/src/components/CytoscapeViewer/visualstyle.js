const DEFAULT_STYLE = [
  {
    selector: 'node',
    style: {
      'background-opacity': 1,
      'background-color': 'teal',
      shape: 'roundrectangle',
      width: 45,
      height: 18,
      label: 'data(name)',
      color: '#FFFFFF',
      'text-halign': 'center',
      'text-valign': 'center',
      'font-size': 9
    }
  },
  {
    selector: 'edge',
    style: {
      'line-color': '#FFFFFF',
      width: 1,
      opacity: 0.2
    }
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': 5,
      'border-color': '#FF0000'
    }
  }
]

export default DEFAULT_STYLE
