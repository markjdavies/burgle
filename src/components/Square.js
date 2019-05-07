import React from 'react';
import PropTypes from 'prop-types';
import './Square.css';

function Square(props) {
  return (
    <span
      draggable="true"
      onDragStart={props.handleDragStart}
      onDragOver={props.handleDragOver}
      onDragEnd={props.handleDragEnd}
      onTouchStart={props.handleTouchStart}
      onTouchMove={(se) => { props.handleTouchMove(se, props.boardRows) }}
      onTouchEnd={props.handleTouchEnd}
      className={`square underscore-${props.die.showingFace.isUnderscored} rotate-${props.die.rotation}`}
      data-board-index={props.boardIndex}>
      {props.die.showingFace.value}
    </span>
  );
}

Square.propTypes = {
  handleDragStart: PropTypes.func,
  handleDragOver: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleTouchStart: PropTypes.func,
  handleTouchMove: PropTypes.func,
  handleTouchEnd: PropTypes.func,
  die: PropTypes.object,
  boardIndex: PropTypes.number,
};

export default Square;