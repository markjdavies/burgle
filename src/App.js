import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        
        <Game />

      </div>
    );
  }
}

/* ****************************************************************************************** 
**    Square
** *****************************************************************************************/ 
function Square(props) {
  return (
    <span 
      draggable="true"onDragStart={props.onDragStart} onDragEnter={props.onDragEnter} onDragEnd={props.onDragEnd}
      onTouchStart={props.onTouchStart} onTouchMove={props.onTouchMove} onTouchEnd={props.onTouchEnd}
      className={ `square underscore-${props.isUnderscored} rotate-${props.rotation}` }
      data-board-index={props.boardIndex}>
      {props.value}      
    </span>
  );
}

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

/* ****************************************************************************************** 
**    Scorecard Component
** *****************************************************************************************/ 
class Scorecard extends React.Component {

  renderScorecardWord(props) {
    return (
      <ScorecardWord
        key={props.value}
        value={props.value}
        score={props.score}
        path={props.path}
        gameId={this.props.gameId}
        />
    )
  }
  
  render() {
    return (
      <div className="game-info">
        { <div className="new-word">{ this.props.newWord.value }</div> }
        <table className="word-list">
          <thead><tr><th></th><th>Score</th></tr></thead>
          <tbody>
            {this.props.foundWords.map(foundWord => (
                this.renderScorecardWord(foundWord.word)
              ))}
          </tbody>
        </table>
      </div>
    )
  }
}

/* ****************************************************************************************** 
**    ScorecardWord Component
** *****************************************************************************************/ 
class ScorecardWord extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
        value: props.value,
        score: props.score,
        path: props.path
      }
    }
  
  componentDidMount() {
    /*
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = `${this.context.apiRoot}game/${this.props.gameId}/word`;
    let url = proxyUrl + targetUrl;
    */
    let url = `https://burgle.herokuapp.com/api/game/${this.props.gameId}/word`;
    
    fetch(url, { method: 'POST', 
                body: JSON.stringify(this.state),
                headers:{
                  'Content-Type': 'application/json'
                } })
      .then(res => res.json())
      .then(
      (result) => {
        this.setState({
          score: result.score
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
  
  render() {
    let disallowedClass;
    if (this.state.score === 0) {
      disallowedClass = 'disallowed';
    }
    return (
      <tr className={`word-row ${disallowedClass}`}>
        <td>{ this.state.value }</td>
        <td>{ this.state.score }</td>
      </tr>
    )
  }
}
// ScorecardWord.contextType = ApiRootContext;

/* ****************************************************************************************** 
**    Game Component
** *****************************************************************************************/ 
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      touchWordBuildingStarted: false,
      newWord: new Word(),
      foundWordPaths: [],
      foundWords: []
    };
  }

  resetWord(newWordStarted) {
    this.setState({
      touchWordBuildingStarted: newWordStarted,
      newWord: new Word(),
    });
  }
    
  startBuildingWord(die) {
    this.resetWord(true);
  }
  
  startBuildingWordDrag(die) {
    this.startBuildingWord(die);
  }
  
  startBuildingWordTouch(die) {
    this.setState( { touchWordBuildingStarted: true } );
    this.startBuildingWord(die);
    this.continueWord(die);
  }
  
  continueWord(die) {
    let newWord = this.state.newWord;
    newWord.addLetter(die);
    this.setState({ newWord: newWord });    
  }
  
  continueWordDrag(die) {
    this.continueWord(die);
  }

  continueWordTouch(die) {
    if (this.state.touchWordBuildingStarted) {
        this.continueWord(die);
    }
  }

  finishWord() {
    if (this.state.newWord.value.length >= 3) {
      if (!this.state.foundWords.some( x => x.word.value === this.state.newWord.value)) {
        let foundWords = this.state.foundWords.slice();
        foundWords.unshift( {
            word: this.state.newWord,
            score: null
          })
        this.setState({ 
          foundWords: foundWords
        });
      }
    }
    this.setState({ newWord: new Word() });
  }
  
  finishWordDrag() {
    this.finishWord();
  }
  
  finishWordTouch() {
    this.finishWord();
  }
  
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            onDragStart={(props) => this.startBuildingWordDrag(props)}
            onDragEnter={(props) => this.continueWordDrag(props)}
            onDragEnd={(props) => this.finishWordDrag(props)} 
            onTouchStart={(props) => this.startBuildingWordTouch(props)}
            onTouchMove={(props) => this.continueWordTouch(props)}
            onTouchEnd={(props) => this.finishWordTouch(props)}
          />
        </div>
        <Scorecard 
          newWord={this.state.newWord}
          foundWords={this.state.foundWords}
          gameId={'bb0b4743-b011-455a-a7b2-241199dd2574'}
          />
      </div>
    );
  }
}

/* ****************************************************************************************** 
**    Context
** *****************************************************************************************/ 
// class ApiRootProvider extends React.Component {
//   constructor(props) {
//     super(props);
//     const localRoot = 'http://localhost:5000/api/';
//     const herokuRoot = 'https://burgle.herokuapp.com/api/';

//     this.changeRoot = () => {
//       this.setState(state => {
//         const newRoot = state.apiRoot === this.herokuRoot ? this.localRoot : this.herokuRoot;
//         return {
//           apiRoot: this.herokuRoot
//         };
//       });
//     };

//     this.state = {
//       apiRoot: herokuRoot,
//       changeRoot: this.changeRoot
//     };
    
//   }

//   render() {
//     return (
//       <ApiRootContext.Provider value={this.state}>
//         {this.props.children}
//       </ApiRootContext.Provider>
//     );
//   }
// }

/*
class ToggleServer extends React.Component {
  constructor(props){
    super(props);
    return (
      <ApiRootContext.Consumer>
        {serverVal => (
          <button onClick={serverVal.changeApiRoot}>Change server</button>
        )}
      </ApiRootContext.Consumer>
    )
  }
}
*/

/* ****************************************************************************************** 
**    Plain JS objects
** *****************************************************************************************/ 
class Word {
  path=[];
  value='';

  addLetter = (die) => {
    if (this.path.length === 0 || this.areAdjacent(die, this.path[this.path.length - 1])) {
      if (!this.path.some(x => x.index === die.index)) {
        this.path = this.path.concat(die);
        this.value = `${this.value}${die.showingFace.value.toLowerCase()}`;
      }
    }
  }
  
  areAdjacent = (firstDie, secondDie) => {
    return (Math.abs(firstDie.row - secondDie.row) < 2) && (Math.abs(firstDie.col - secondDie.col) < 2)
  }
  
}

export default App;
