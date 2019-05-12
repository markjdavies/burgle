import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import ScorecardWord from './ScorecardWord';
import SorecardSummaryDisplay from './ScorecardSummary';
import { valueFromPath } from '../word-utils';
import './Scorecard.css';
import WordBuilder from './WordBuilder';

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
    
    static propTypes = {
      newWord: PropTypes.array,
      foundWord: PropTypes.object,
    };
    
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
          <WordBuilder wordPath={this.props.newWord} />
          <SorecardSummaryDisplay />
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