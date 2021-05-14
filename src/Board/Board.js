import React, { Component } from "react";
import Cell from "../Cells/Cell";
import './Board.css';

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard()
    }
    this.flipCell = this.flipCell.bind(this)
  }

  createBoard() {
    const board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      const rows = []
      for (let x = 0; x < this.props.ncols; x++) {
        const randomBoolean = Math.random() > this.props.chanceLightStartsOn
        rows.push(randomBoolean)
      }
      board.push(rows)
    }
    return board
  }

  flipCellsAround(x, y, arr) {
    if (this.cellExist(x, y)) {
      return arr[x][y] = !arr[x][y]
    }
  }

  cellExist(x, y) {
    try {
      if (this.state.board[x][y]) { }
      if (x >= 0 && x < this.props.nrows && y >= 0 && y < this.props.ncols) {
        return true
      } else {
        return false
      }
    } catch {
      return false
    }
  }

  flipCell(x, y) {
    let newState = this.state.board
    this.flipCellsAround(x - 1, y, newState)
    this.flipCellsAround(x + 1, y, newState)
    this.flipCellsAround(x, y - 1, newState)
    this.flipCellsAround(x, y + 1, newState)
    this.flipCellsAround(x, y, newState)
    this.setState({ board: newState })
  }

  isWinner() {
    return this.state.board.flat().every((v) => v === false)
  }

  render() {
    return (
      <div>
        <div className="board-title">
          <p className="neon-orange">Lights</p>
          <p className="neon-blue">Out</p>
        </div>
        {!this.isWinner() ?
          <table className="board">
            <tbody>
              {this.state.board.map((rows, i) => {
                return (<tr key={i}>
                  {rows.map((col, j, arr) => {
                    return <Cell
                      y={j}
                      x={this.state.board.indexOf(arr)}
                      key={`${j}-${this.state.board.indexOf(arr)}`}
                      flipCellsAroundMe={this.flipCell}
                      isLit={col} />
                  })}
                </tr>)
              })}
            </tbody>
          </table>
          : <h1>You Won</h1>}
      </div>
    )
  }
}


export default Board;
