import React from 'react';
import { connect } from 'react-redux'; 

import {
  START_GAME_REQUEST, START_GAME_SUCCESS, //START_GAME_FAILURE,
} from '../redux-actions.js';
import BoardDisplay from './Board';
import ScorecardDisplay from './Scorecard';

export function gameReducer(state = {
  id: undefined,
  isLoading: false,
  hasBoard: false,
  endTime: undefined,
}, action) {
  switch (action.type) {
    case START_GAME_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case START_GAME_SUCCESS:
      return Object.assign({}, state, {
        id: action.game.id,
        endTime: action.game.endTime,
        isLoading: false,
        hasBoard: true,
      });
    default:
      return state;
  }
}

const mapStateToGameProps = (state) => {
  return {
    isLoading: state.game.isLoading,
    hasBoard: state.game.hasBoard,
  };
};

const mapDispatchToGameProps = (dispatch) => (
  {
  }
);


class Game extends React.Component {
  render() {
    if (this.props.hasBoard) {
      return (
            <div className="game">
                 <BoardDisplay />
                 <ScorecardDisplay />
            </div>
      );
    }
    else {
      if (this.props.isLoading) {
        return (<div className="game">Loading...</div>);
      }
      else {
        return (<div className="game"></div>);
      }
    }
  }

}

const GameDisplay = connect(
  mapStateToGameProps,
  mapDispatchToGameProps
)(Game);

export default GameDisplay;