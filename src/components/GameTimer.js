import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { timeUp } from '../redux-actions';

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

    componentDidMount() {
      this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
    }

    componentWillUnmount() {
        clearInterval(this.forceUpdateInterval);
    }

    render() {
        const endTime = new moment(this.props.endTime);
        const now = new moment();
        const remaining = moment.duration(endTime.diff(now));
        if (remaining > 0) {
            return (
                <div>{`You have ${remaining.humanize()} left.`}</div>
            );
        }
        else {
            this.props.timeUp();
            clearInterval(this.forceUpdateInterval);
            return (
                <div>Time's up.</div>
            );
        }
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