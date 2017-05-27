import React, {Component} from 'react'


class TitleBar extends Component {

  render() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: this.props.background,
      textAlign: 'center',
      color: 'white',
      margin: 0,
      padding: '0.3em',
      minHeight: '3em',
    }


    return (
      <div style={style}>
        <div>
          <h1 style={{textAlign: 'center', lineHeight: 1.3}}>
            {this.props.title}
          </h1>
        </div>
        <div>
          <h4>{this.props.geneId}</h4>
        </div>
      </div>
    )
  }
}


TitleBar.defaultProps = {
  background: '#78909C'
};

export default TitleBar
