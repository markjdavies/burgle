import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameTimerDisplay from './GameTimer';
import ScorecardWord from './ScorecardWord';
import SorecardSummaryDisplay from './ScorecardSummary';
import { valueFromPath } from '../word-utils';
import './Scorecard.css';
import WordBuilder from './WordBuilder';
import { Card } from 'semantic-ui-react'

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
      <Card fluid>
        <Card.Content>
          <Card.Header><GameTimerDisplay />Scores</Card.Header>
          <Card.Meta><SorecardSummaryDisplay/></Card.Meta>
        </Card.Content>
        <Card.Content>
          <WordBuilder wordPath={this.props.newWord} />
        </Card.Content>
        <Card.Content extra>
          <table className="word-list game-info">
            <tbody>
              {this.props.foundWords.map(foundWord => (
                this.renderScorecardWord(foundWord)
              ))}
            </tbody>
          </table>
        </Card.Content>
      </Card>
    )
  }
}


const ScorecardDisplay = connect(
  mapStateToScorecardProps,
  mapDispatchToScorecardProps
)(Scorecard);
export default ScorecardDisplay;