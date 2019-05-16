import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { timeUp } from '../redux-actions';
import Hourglass from './Hourglass';

const mapStateToGameTimerProps = (state) => {
    return {
      endTime: state.game.endTime,
    };
  };

const mapDispatchToGameTimerProps = (dispatch) => (
    {
        timeUp: () => { dispatch(timeUp()); },
    }
);

class GameTimer extends React.Component {

    componentWillUnmount() {
        clearInterval(this.timeUpInterval);
    }

    render() {
      const endTime = new moment(this.props.endTime);
      const now = new moment();
      const remainingSeconds = moment.duration(endTime.diff(now)).asSeconds();
      this.timeUpInterval = setInterval(() => this.props.timeUp(), remainingSeconds * 1000);
      return (
        <Hourglass durationSeconds={remainingSeconds} />
      )
    }
}

GameTimer.propTypes = {
    timeUp: PropTypes.func,
    endTime: PropTypes.string,
  };

const GameTimerDisplay = connect(
    mapStateToGameTimerProps,
    mapDispatchToGameTimerProps
  )(GameTimer);
export default GameTimerDisplay;