import React from 'react';
import Board from './Board';
import Scorecard from './Scorecard';
import Word from '../Word';

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

  export default Game;