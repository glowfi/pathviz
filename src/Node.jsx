import React from 'react';
import './Node.css';

const Node = ({ board, row, col, onMouseDown, onMouseUp, onMouseEnter }) => {
    const { isWall, isStart, isFinish, isVisited, isShort } = board[row][col];
    const extraClassName = isFinish
        ? 'isFinish'
        : isStart
        ? 'isStart'
        : isWall
        ? 'isWall'
        : isVisited
        ? 'isVisited'
        : isShort
        ? 'isShort'
        : '';
    return (
        <div
            id={'node'}
            className={`node-${row}-${col} ${extraClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        ></div>
    );
};

export default Node;
