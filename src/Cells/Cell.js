import React, { Component } from 'react'
import "./Cell.css"

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.flipCellsAroundMe(this.props.x, this.props.y)
  }

  render() {
    const classes = "cell" + (this.props.isLit ? " cell-lit" : "");

    return (
      <td className={classes} onClick={this.handleClick}> </td>
    )
  }
}


export default Cell