import React from 'react';
import { connect } from 'react-redux'; 
import ScorecardWord from './ScorecardWord';
import { valueFromPath } from '../word-utils';
import './Scorecard.css';


const mapStateToScorecardProps = (state) => {
  return {
    hasBoard: state.game.hasBoard,
    foundWords: state.board.foundWords,
    newWord: state.board.newWordPath,
  };
};

const mapDispatchToScorecardProps = (dispatch) => (
  {
  }
);

class Scorecard extends React.Component {

    renderScorecardWord(word) {
      const value = valueFromPath(word.path);
      return (
        <ScorecardWord
          key={value}
          value={value}
          score={word.score}
          />
      )
    }
    
    render() {
      return (
        <div className="game-info">
          { <div className="new-word">{ valueFromPath(this.props.newWord) }</div> }
          <table className="word-list">
            <thead><tr><th></th><th>Score</th></tr></thead>
            <tbody>
              {this.props.foundWords.map(foundWord => (
                  this.renderScorecardWord(foundWord)
                ))}
            </tbody>
          </table>
        </div>
      )
    }
  }
  
  const ScorecardDisplay = connect(
    mapStateToScorecardProps,
    mapDispatchToScorecardProps
  )(Scorecard);
  export default ScorecardDisplay;