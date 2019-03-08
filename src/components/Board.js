import React from 'react';
import Word from '../Word';
import Square from './Square';
import './Board.css';

/* ****************************************************************************************** 
**    Board Component
** *****************************************************************************************/ 
class Board extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        board: null,
        newWord: new Word(),
      };
    }
  
    componentDidMount() {
      //let url = `${this.context.apiRoot}game`;
      let url = `https://burgle.herokuapp.com/api/game`;
      fetch(url, { method: 'POST' })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              board: result.board
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
  
    renderSquare(props) {
      return (
        <Square key={props.index.toString()} 
          value={props.showingFace.value} 
          isUnderscored={props.showingFace.isUnderscored}
          rotation={props.rotation}
          boardIndex={props.index}
          onDragStart={() => this.props.onDragStart(props)}
          onDragEnter={() => this.props.onDragEnter(props)}
          onDragEnd={() => this.props.onDragEnd(props)}
          onTouchStart={() => this.props.onTouchStart(props)}
          onTouchMove={
            (se) => {
              let el = document.elementFromPoint(se.touches[0].clientX, se.touches[0].clientY);
              let boardIndex = el.getAttribute('data-board-index');
              if (boardIndex) {
                let row = Math.floor(boardIndex / 4);
                let col = boardIndex % 4;
                let die = this.state.board.rows[row].dice[col];
                this.props.onTouchMove(die);
              }
            }
          }
          onTouchEnd={() => this.props.onTouchEnd(props)}
          />
      )
    }
  
    render() {
      const { error, isLoaded, board } = this.state;
  
      if (error) {
        return (<div>Error: {error.message}</div>);
      } else if (!isLoaded) {
        return (<div>Loading...</div>);
      } else {
        return (
          <div>
            {/* <div className="status">{status}</div> */}
            {board.rows.map(row => (
              <div key={row.dice[0].row} className="board-row">
                {row.dice.map(die => (
                  this.renderSquare(die)
                ))}
               </div>
            ))}
          </div>
        );
      }
    }
  }
  // Board.contextType = ApiRootContext;
export default Board;