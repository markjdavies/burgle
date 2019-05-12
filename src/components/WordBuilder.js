import React from 'react';
import PropTypes from 'prop-types';
import './WordBuilder.css';

function WordBuilder(props) {
  return (
    <div className="word-builder"> {
      props.wordPath.map(letter => {
        return (
          <span key={letter.showingFace.id} className="new-word">{letter.showingFace.value.toUpperCase()}</span>
        );
      })
    }</div>
  );
}

WordBuilder.propTypes = {
  wordPath: PropTypes.array,
}

export default WordBuilder;