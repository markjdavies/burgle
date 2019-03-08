import React from 'react';
import ScorecardWord from './ScorecardWord';
import './Scorecard.css';

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
  
export default Scorecard;