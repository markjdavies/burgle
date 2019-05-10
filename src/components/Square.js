import React from 'react';
import PropTypes from 'prop-types';
import './Square.css';

function Square(props) {
  return (
    <div className="square">
      <div
        className={`die-label underscore-${props.die.showingFace.isUnderscored} rotate-${props.die.rotation}`}
        id={`die_${props.boardIndex}`}
        draggable="true"
        onDragStart={props.handleDragStart}
        onDragOver={props.handleDragOver}
        onDragEnd={props.handleDragEnd}
        onTouchStart={props.handleTouchStart}
        onTouchMove={(se) => { props.handleTouchMove(se, props.boardRows) }}
        onTouchEnd={props.handleTouchEnd}
        data-board-index={props.boardIndex}>
        {props.die.showingFace.value}
      </div>
    </div>
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