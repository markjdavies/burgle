import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  START_GAME_SUCCESS,
  startBuildingWord, continueWord, finishWord,
  RESET_WORD,
  CONTINUE_WORD,
  ADD_WORD,
  SCORE_RECEIVED,
} from '../redux-actions.js';
import Square from './Square';
import './Board.css';
import { diceAreAdjacent } from '../board-utils';
import { valueFromPath } from '../word-utils';

export function boardReducer(state = {
  dice: [],
  touchWordBuildingStarted: false,
  newWordStarted: false,
  newWord: undefined,
  foundWordPaths: [],
  foundWords: [],
  wordsFound: 0,
  totalScore: 0,
}, action) {
  switch (action.type) {
    case START_GAME_SUCCESS:
      return Object.assign({}, state, {
        dice: action.game.board,
        touchWordBuildingStarted: false,
        newWordStarted: false,
        newWordPath: [],
        foundWords: [],
      });
    case RESET_WORD:
      return Object.assign({}, state, {
        newWordStarted: action.newWordStarted,
        newWordPath: [],
      });
    case CONTINUE_WORD:
      var newWord = state.newWordPath;
      const die = action.die;
      if (newWord.length === 0 || diceAreAdjacent(die, newWord[newWord.length - 1])) {
        if (!newWord.some(x => x.index === die.index)) {
          newWord = newWord.concat(die);
        }
      }
      return Object.assign({}, state, {
        newWordPath: newWord,
      });
    case ADD_WORD:
      return Object.assign({}, state, {
        foundWords: [
          action.word,
          ...state.foundWords.slice(0),
        ],
      })
      case SCORE_RECEIVED:
      const wordValue = action.wordValue;
      var found = false;
      return Object.assign({}, state, {
        foundWords: [
          ...state.foundWords.slice(0).map((foundWord) => {
            if (!found && valueFromPath(foundWord.path) === wordValue) {
              found = true;
              return {
                ...foundWord,
                score: action.score,
              };
            }
            else {
              return foundWord;
            }
          })
        ],
        totalScore: state.totalScore + action.score,
        wordsFound: action.score > 0 ? state.wordsFound + 1 : state.wordsFound,
      });
    default:
      return state;
  }
}

const mapStateToBoardProps = (state) => {
  return {
    board: state.board,
  };
};

const mapDispatchToBoardProps = (dispatch) => (
  {
    handleDragStart: (die) => { dispatch(startBuildingWord()); dispatch(continueWord(die)); },
    handleDragOver: (die) => dispatch(continueWord(die)),
    handleDragEnd: (die) => dispatch(finishWord(die)),
    handleTouchStart: (die) => dispatch(startBuildingWord(die)),
    handleTouchMove: (se, boardRows) => {
      let el = document.elementFromPoint(se.touches[0].clientX, se.touches[0].clientY);
      let boardIndex = el.getAttribute('data-board-index');
      if (boardIndex) {
        let row = Math.floor(boardIndex / 4);
        let col = boardIndex % 4;
        let die = boardRows[row].dice[col];
        dispatch(continueWord(die));
      }
    },
    handleTouchEnd: (die) => dispatch(finishWord(die)),
  }
);

/* ****************************************************************************************** 
**    Board Component
** *****************************************************************************************/
function Board(props) {
  return (
    <div className="game-board">
      <div className="letter-grid">
        {props.board.dice.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.dice.map((die) => (
              <Square key={die.index}
                die={die}
                handleDragStart={() => props.handleDragStart(die)}
                handleDragOver={() => props.handleDragOver(die)}
                handleDragEnd={() => props.handleDragEnd(die)}
                handleTouchStart={() => props.handleTouchStart(die)}
                handleTouchMove={props.handleTouchMove}
                handleTouchEnd={() => props.handleTouchEnd(die)}
                boardIndex={die.index}
                boardRows={props.board.dice.rows}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

Board.propTypes = {
  handleDragStart: PropTypes.func,
  handleDragOver: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleTouchStart: PropTypes.func,
  handleTouchMove: PropTypes.func,
  handleTouchEnd: PropTypes.func,
  die: PropTypes.object,
  boardIndex: PropTypes.number,
  boardRows: PropTypes.array,
};

const BoardDisplay = connect(
  mapStateToBoardProps,
  mapDispatchToBoardProps
)(Board);
export default BoardDisplay;