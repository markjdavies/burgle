import React from 'react';
import './Square.css';

class Square extends React.Component {
    render() {
        return (
            <span 
              draggable="true"onDragStart={this.props.onDragStart} onDragEnter={this.props.onDragEnter} onDragEnd={this.props.onDragEnd}
              onTouchStart={this.props.onTouchStart} onTouchMove={this.props.onTouchMove} onTouchEnd={this.props.onTouchEnd}
              className={ `square underscore-${this.props.isUnderscored} rotate-${this.props.rotation}` }
              data-board-index={this.props.boardIndex}>
              {this.props.value}      
            </span>
          );
    }
}

export default Square;