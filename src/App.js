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

    const handleDFS = () => {
        // var start = performance.now();

        let k = DFSgrid(
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
                    className="btn btn-danger"
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
