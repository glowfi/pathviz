import { useState } from 'react';
import { astargrid } from './Algorithms/Astar';
import { BFSgrid } from './Algorithms/BFS';
import { Dijkstragrid } from './Algorithms/Dijsktra';
import { greedyBFSgrid } from './Algorithms/greedyBFS';
import { DFSgrid } from './Algorithms/DFS';
import './index.css';
import Node from './Node';
import { recursiveDivisionMaze } from './mazeAlgorithms/recursiveDivision';
import { randomMaze } from './mazeAlgorithms/random';

var ROWS = 30;
var COLS = 73;

var START_NODE_ROW = 20;
var START_NODE_COL = 15;

var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 70;

const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        isVisited: false,
        isWall: false,
        isShort: false
    };
};

const getGrid = () => {
    const grid = [];

    for (let i = 0; i < ROWS; i++) {
        const ls = [];
        for (let j = 0; j < COLS; j++) {
            ls.push(createNode(i, j));
        }
        grid.push(ls);
    }
    return grid;
};

const App = () => {
    const [grid, setgrid] = useState(getGrid());
    const [mouseIsPressed, setmouseIsPressed] = useState(false);

    const [start, setstart] = useState(false);
    const [end, setEnd] = useState(false);
    const [erase, setErase] = useState(false);

    const [currStart, setCurrStart] = useState([
        START_NODE_ROW,
        START_NODE_COL
    ]);
    const [currEnd, setCurrEnd] = useState([FINISH_NODE_ROW, FINISH_NODE_COL]);

    START_NODE_ROW = currStart[0];
    START_NODE_COL = currStart[1];

    FINISH_NODE_ROW = currEnd[0];
    FINISH_NODE_COL = currEnd[1];

    const handleMouseDown = (row, col) => {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setgrid(newGrid);
        setmouseIsPressed(!mouseIsPressed);
    };

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setgrid(newGrid);
    };

    const handleMouseUp = () => {
        setmouseIsPressed(false);
        if (mouseIsPressed) {
            setmouseIsPressed(false);
        }
    };

    const getNewGridWithWallToggled = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: true
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    const handleAstar = () => {
        // var start = performance.now();

        let k = astargrid(
            [START_NODE_ROW, START_NODE_COL],
            [FINISH_NODE_ROW, FINISH_NODE_COL],
            grid
        );

        // var duration = performance.now() - start;
        // console.log(duration);

        let { visited, shortest } = k;

        for (let key in visited) {
            let newGrid = grid.slice();
            setTimeout(() => {
                key = key.split(',');
                let row = parseInt(key[0]);
                let col = parseInt(key[1]);

                if (
                    [row, col].toString() !==
                    [START_NODE_ROW, START_NODE_COL].toString() ||
                    [row, col].toString() !== [FINISH_NODE_ROW, FINISH_NODE_COL]
                ) {
                    let newNode = createNode(row, col);
                    newGrid[row][col] = { ...newNode, isVisited: true };
                    setgrid(newGrid);
                }
            }, 20);
        }
        if (shortest.length > 0) {
            for (const [row, col] of shortest) {
                let newGrid = grid.slice();
                setTimeout(() => {
                    let newNode = createNode(row, col);
                    if (
                        [row, col].toString() !==
                        [START_NODE_ROW, START_NODE_COL].toString() ||
                        [row, col].toString() !==
                        [FINISH_NODE_ROW, FINISH_NODE_COL]
                    ) {
                        newGrid[row][col] = { ...newNode, isShort: true };
                        setgrid(newGrid);
                    }
                }, 20);
            }
        }
    };

    const handlegreedyBFS = () => {
        // var start = performance.now();

        let k = greedyBFSgrid(
            [START_NODE_ROW, START_NODE_COL],
            [FINISH_NODE_ROW, FINISH_NODE_COL],
            grid
        );
        // var duration = performance.now() - start;
        // console.log(duration);

        let { visited, shortest } = k;

        for (let key in visited) {
            let newGrid = grid.slice();
            setTimeout(() => {
                key = key.split(',');
                let row = parseInt(key[0]);
                let col = parseInt(key[1]);

                if (
                    [row, col].toString() !==
                    [START_NODE_ROW, START_NODE_COL].toString() ||
                    [row, col].toString() !== [FINISH_NODE_ROW, FINISH_NODE_COL]
                ) {
                    let newNode = createNode(row, col);
                    newGrid[row][col] = { ...newNode, isVisited: true };
                    setgrid(newGrid);
                }
            }, 20);
        }
        if (shortest.length > 0) {
            for (const [row, col] of shortest) {
                let newGrid = grid.slice();
                setTimeout(() => {
                    let newNode = createNode(row, col);
                    if (
                        [row, col].toString() !==
                        [START_NODE_ROW, START_NODE_COL].toString() ||
                        [row, col].toString() !==
                        [FINISH_NODE_ROW, FINISH_NODE_COL]
                    ) {
                        newGrid[row][col] = { ...newNode, isShort: true };
                        setgrid(newGrid);
                    }
                }, 20);
            }
        }
    };

    const handleDijkstra = () => {
        // var start = performance.now();

        let k = Dijkstragrid(
            [START_NODE_ROW, START_NODE_COL],
            [FINISH_NODE_ROW, FINISH_NODE_COL],
            grid
        );
        // var duration = performance.now() - start;
        // console.log(duration);

        let { visited, shortest } = k;

        for (let key in visited) {
            let newGrid = grid.slice();
            setTimeout(() => {
                key = key.split(',');
                let row = parseInt(key[0]);
                let col = parseInt(key[1]);

                if (
                    [row, col].toString() !==
                    [START_NODE_ROW, START_NODE_COL].toString() ||
                    [row, col].toString() !== [FINISH_NODE_ROW, FINISH_NODE_COL]
                ) {
                    let newNode = createNode(row, col);
                    newGrid[row][col] = { ...newNode, isVisited: true };
                    setgrid(newGrid);
                }
            }, 20);
        }
        if (shortest.length > 0) {
            for (const [row, col] of shortest) {
                let newGrid = grid.slice();
                setTimeout(() => {
                    let newNode = createNode(row, col);
                    if (
                        [row, col].toString() !==
                        [START_NODE_ROW, START_NODE_COL].toString() ||
                        [row, col].toString() !==
                        [FINISH_NODE_ROW, FINISH_NODE_COL]
                    ) {
                        newGrid[row][col] = { ...newNode, isShort: true };
                        setgrid(newGrid);
                    }
                }, 20);
            }
        }
    };

    const handleBFS = () => {
        // var start = performance.now();

        let k = BFSgrid(
            [START_NODE_ROW, START_NODE_COL],
            [FINISH_NODE_ROW, FINISH_NODE_COL],
            grid
        );

        // var duration = performance.now() - start;
        // console.log(duration);

        let { visited, out } = k;

        for (let key in visited) {
            let newGrid = grid.slice();
            setTimeout(() => {
                key = key.split(',');
                let row = parseInt(key[0]);
                let col = parseInt(key[1]);

                if (
                    [row, col].toString() !==
                    [START_NODE_ROW, START_NODE_COL].toString() ||
                    [row, col].toString() !== [FINISH_NODE_ROW, FINISH_NODE_COL]
                ) {
                    let newNode = createNode(row, col);
                    newGrid[row][col] = { ...newNode, isVisited: true };
                    setgrid(newGrid);
                }
            }, 20);
        }
        if (out.length > 0) {
            for (const [row, col] of out) {
                let newGrid = grid.slice();
                setTimeout(() => {
                    let newNode = createNode(row, col);
                    if (
                        [row, col].toString() !==
                        [currStart[0], currStart[1]].toString() ||
                        [row, col].toString() !== [currEnd[0], currEnd[1]]
                    ) {
                        newGrid[row][col] = { ...newNode, isShort: true };
                        setgrid(newGrid);
                    }
                }, 20);
            }
        }
    };

    const handleDFS = () => {
        // var start = performance.now();

        let k = DFSgrid(
            [currStart[0], currStart[1]],
            [currEnd[0], currEnd[1]],
            grid
        );

        // var duration = performance.now() - start;
        // console.log(duration);

        let { visited, out } = k;

        for (let key in visited) {
            let newGrid = grid.slice();
            setTimeout(() => {
                key = key.split(',');
                let row = parseInt(key[0]);
                let col = parseInt(key[1]);

                if (
                    [row, col].toString() !==
                    [currStart[0], currStart[1]].toString() ||
                    [row, col].toString() !== [currEnd[0], currEnd[1]]
                ) {
                    let newNode = createNode(row, col);
                    newGrid[row][col] = { ...newNode, isVisited: true };
                    setgrid(newGrid);
                }
            }, 20);
        }
        if (out.length > 0) {
            for (const [row, col] of out) {
                let newGrid = grid.slice();
                setTimeout(() => {
                    let newNode = createNode(row, col);
                    if (
                        [row, col].toString() !==
                        [START_NODE_ROW, START_NODE_COL].toString() ||
                        [row, col].toString() !==
                        [FINISH_NODE_ROW, FINISH_NODE_COL]
                    ) {
                        newGrid[row][col] = { ...newNode, isShort: true };
                        setgrid(newGrid);
                    }
                }, 20);
            }
        }
    };

    const handleClearPath = () => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j].isVisited) {
                    let newGrid = grid.slice();
                    const currNode = grid[i][j];
                    newGrid[i][j] = { ...currNode, isVisited: false };
                    setgrid(newGrid);
                }
                if (grid[i][j].isShort) {
                    let newGrid = grid.slice();
                    const currNode = grid[i][j];
                    newGrid[i][j] = { ...currNode, isShort: false };
                    setgrid(newGrid);
                }
            }
        }
    };
    const handleClearWalls = () => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j].isWall) {
                    let newGrid = grid.slice();
                    const currNode = grid[i][j];
                    newGrid[i][j] = { ...currNode, isWall: false };
                    setgrid(newGrid);
                }
            }
        }
    };
    const handleClear = () => {
        setgrid(getGrid());
    };

    const handlerandomMaze = () => {
        let nw = getGrid();
        let k = randomMaze(grid, [0, 0], [grid.length - 1, grid[0].length - 1]);
        let newGrid = nw.slice();
        for (const key of k) {
            let row = key[0];
            let col = key[1];
            newGrid[row][col].isWall = true;
            setgrid(newGrid);
        }
    };

    const handleRecDivision = () => {
        let nw = getGrid();
        let k = recursiveDivisionMaze(
            grid,
            [0, 0],
            [grid.length - 1, grid[0].length - 1]
        );

        let newGrid = nw.slice();
        for (const key of k) {
            let row = key[0];
            let col = key[1];
            newGrid[row][col].isWall = true;
            setgrid(newGrid);
        }
    };

    const handleExtrafunc = (row, col, type) => {
        if (type === 'start') {
            let newGrid = grid.slice();

            let currRow = currStart[0];
            let currCol = currStart[1];

            newGrid[currRow][currCol].isStart = false;
            newGrid[row][col].isStart = true;
            newGrid[row][col].isWall = false;

            setCurrStart([row, col]);
            setgrid(newGrid);
            // setstart(false);
        } else if (type === 'end') {
            let newGrid = grid.slice();

            let currRow = currEnd[0];
            let currCol = currEnd[1];

            newGrid[currRow][currCol].isFinish = false;
            newGrid[row][col].isFinish = true;
            newGrid[row][col].isWall = false;

            setCurrEnd([row, col]);
            setgrid(newGrid);
            // setEnd(false);
        } else if (type === 'erase') {
            let newGrid = grid.slice();

            newGrid[row][col].isWall = false;
            setgrid(newGrid);
            // setErase(false);
        }
    };

    return (
        <div className="container">
            <div className="btncont">
                <button
                    className="btn btn-dark"
                    onClick={handleDFS}
                    type="button"
                >
                    DFS
                </button>
                <button
                    className="btn btn-dark"
                    onClick={handleBFS}
                    type="button"
                >
                    BFS
                </button>
                <button
                    className="btn btn-dark"
                    onClick={handlegreedyBFS}
                    type="button"
                >
                    Greedy BFS
                </button>
                <button
                    className="btn btn-dark"
                    onClick={handleDijkstra}
                    type="button"
                >
                    Dijkstra
                </button>
                <button
                    className="btn btn-dark"
                    onClick={handleAstar}
                    type="button"
                >
                    Astar
                </button>
                <button
                    className="btn btn-info"
                    onClick={handleClearPath}
                    type="button"
                >
                    Clear Path
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={handleClearWalls}
                    type="button"
                >
                    Clear Walls
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={handleClear}
                    type="button"
                >
                    Clear Board
                </button>
                <button
                    className="btn btn-warning"
                    onClick={() => {
                        handleClear();
                        handlerandomMaze();
                    }}
                    type="button"
                >
                    Generate Random Maze
                </button>
                <button
                    className="btn btn-warning"
                    onClick={() => {
                        handleClear();
                        handleRecDivision();
                    }}
                    type="button"
                >
                    Generate Maze Using Recursive Division
                </button>

                <button
                    className={
                        !start ? 'btn btn-success' : 'btn btn-success Sel'
                    }
                    onClick={() => {
                        setstart(!start);
                        setEnd(false);
                        setErase(false);
                    }}
                >
                    Put Start Position
                </button>
                <button
                    className={!end ? 'btn btn-danger' : 'btn btn-danger Sel'}
                    onClick={() => {
                        setstart(false);
                        setEnd(!end);
                        setErase(false);
                    }}
                >
                    Put End Position
                </button>
                <button
                    className={
                        !erase ? 'btn btn-secondary' : 'btn btn-secondary Sel'
                    }
                    onClick={() => {
                        setstart(false);
                        setEnd(false);
                        setErase(!erase);
                    }}
                >
                    Eraser
                </button>
            </div>

            <div id="board">
                {grid.map((rows, ridx) => {
                    return rows.map((_, cidx) => {
                        return (
                            <Node
                                key={cidx}
                                board={grid}
                                row={ridx}
                                col={cidx}
                                onMouseUp={handleMouseUp}
                                onMouseDown={handleMouseDown}
                                onMouseEnter={handleMouseEnter}
                                start={start}
                                end={end}
                                erase={erase}
                                handleExtrafunc={handleExtrafunc}
                            >
                                hello
                            </Node>
                        );
                    });
                })}
            </div>
        </div>
    );
};

export default App;
