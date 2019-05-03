import React from 'react';
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

export default ScorecardWord;