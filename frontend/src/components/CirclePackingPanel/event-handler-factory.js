class EventHandlerFactory {


  selectNode = (id, data, zoom) => {



    const wrappedData = {
      props: data
    }

    if (zoom) {
      this.props.selectNodes([id], { [id]: wrappedData })
    } else {
      this.selectGroups(
        id,
        wrappedData,
        this.props.groups,
        this.props.interactionsCommandActions
      )
    }
  }

  unselectNodes = (id, data, zoom) => {
    const wrappedData = {
      props: data
    }

    if (zoom) {
      this.props.selectNodes([id], { [id]: wrappedData })
    } else {
      this.selectGroups(
        id,
        wrappedData,
        this.props.groups,
        this.props.interactionsCommandActions
      )
    }
  }

  deselectNode = id => {
    if (id === null) {
      return
    }

    if (this.state.hoverNodes !== null) {
      if (!this.state.selectedGroups.has(id)) {
        this.props.interactionsCommandActions.unselectNodes({
          idList: this.state.hoverNodes
        })
      }
    }
  }

  hoverOutNode = (id, data) => {
    console.log('::::::::::::::::::::::::::::: OUT')
    console.log(id, data)
  }

  hoverOnNode = (id, data) => {
    if (data === null || data.props === null || data.props.name === undefined) {
      return
    }

    console.log(data)
    const name = data.props.name.split('.')[0]

    const groups = this.props.groups
    if (groups === undefined) {
      return
    }

    const geneIds = groups[name]

    if (geneIds === null || geneIds === undefined) {
      return
    }

    if (this.state.selectedGroups.has(id)) {
      return
    }

    this.setState({
      hover: id,
      hoverNodes: geneIds
    })

    window.setTimeout(() => {
      this.props.interactionsCommandActions.selectNodes({
        idList: geneIds,
        selectedColor: 'red'
      })
    }, 0)
  }



}




const getEventHandlers = () => ({
  selectNode,
  hoverOnNode,
  hoverOutNode,
  deselectNode
})

export default getEventHandlers
