import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToScorecardSummaryProps = (state) => {
  return {
    wordsFound: state.board.wordsFound,
    totalScore: state.board.totalScore,
  };
};

const mapDispatchToScorecardSummaryProps = (dispatch) => (
  {}
);


function ScorecardSummary(props) {
  if (props.wordsFound > 0) {
    return (
      <div>
        <div>Words found: {props.wordsFound}</div>
        <div>Points: {props.totalScore}</div>
      </div>
    );
  }
  else{
    return null;
  }
}

ScorecardSummary.propTypes = {
  wordsFound: PropTypes.number,
  totalScore: PropTypes.number
};

const ScorecardSummaryDisplay = connect(
  mapStateToScorecardSummaryProps,
  mapDispatchToScorecardSummaryProps
)(ScorecardSummary);
export default ScorecardSummaryDisplay;
