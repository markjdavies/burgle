import React from 'react';
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

export default Square;