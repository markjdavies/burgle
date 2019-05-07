import React from 'react';
import PropTypes from 'prop-types';
import './ScorecardWord.css';

function ScorecardWord(props) {
    let disallowedClass;
    if (props.score === 0) {
      disallowedClass = 'disallowed';
    }
    return (
      <tr className={`word-row ${disallowedClass}`}>
        <td>{ props.value }</td>
        <td>{ props.score }</td>
      </tr>
    );
}

ScorecardWord.propTypes = {
  value: PropTypes.string.isRequired,
  score: PropTypes.number,
};

export default ScorecardWord;