const heuristic = (a, b) => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const greedyBFS = (start, goal, graph) => {
    let visited = {};
    let unvisited = {};
    for (let key in graph) {
        visited[key] = Infinity;
    }
    for (let key in graph) {
        unvisited[key] = '';
    }

    let prev = {};
    let cost = {};
    visited[start] = 0;
    let cp = start;

    while (Object.keys(unvisited).length > 0) {
        if (!graph[start]) return;
        for (const neighbours of graph[start]) {
            // console.log(neighbours);
            let currDistance = visited[start] + neighbours[0];
            let k = [neighbours[1], neighbours[2]];
            // console.log(k);
            if (k in unvisited && currDistance < visited[k]) {
                visited[k] = heuristic(k, goal);
                prev[k] = start;
            }
        }
        cost[start] = visited[start];
        if (start.toString() === goal.toString()) {
            break;
        }
        delete visited[start];
        delete unvisited[start];
        if (Object.keys(visited).length > 0) {
            start = Object.keys(visited).reduce((key, v) =>
                visited[v] < visited[key] ? v : key
            );
            start = start.split(',').map((p) => parseInt(p));
        }
    }
    prev[cp] = null;
    return prev;
};

const getShortestPath = (start, goal, graph) => {
    const visited = greedyBFS(start, goal, graph);

    if (!visited) {
        return { visited: [], shortest: [] };
    }

    if (goal in visited) {
        let currNode = goal;
        let shortest = [];

        while (true) {
            if (visited[currNode] === null) {
                break;
            }
            shortest.push(currNode);
            currNode = visited[currNode];
        }
        shortest.shift();
        shortest.reverse();
        shortest.unshift(start);
        shortest.push(goal);
        return { visited, shortest };
    }
    return { visited, shortest: [] };
};

const checkisValid = (x, y, grid) => {
    if (
        x >= 0 &&
        x < grid.length &&
        y >= 0 &&
        y < grid[0].length &&
        grid[x][y].isWall === false
    ) {
        return true;
    }
    return false;
};

const getPossibleLocations = (x, y, grid) => {
    let moves = [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1]
    ];

    let out = [];

    for (const [dx, dy] of moves) {
        if (checkisValid(x + dx, y + dy, grid)) {
            out.push([1, x + dx, y + dy]);
        }
    }
    return out;
};

const grid2graph = (grid) => {
    let graph = {};
    for (let rows = 0; rows < grid.length; rows++) {
        for (let cols = 0; cols < grid[0].length; cols++) {
            if (grid[rows][cols].isWall === false) {
                let key = [rows, cols];
                let val = getPossibleLocations(rows, cols, grid);
                graph[key] = val;
            }
        }
    }
    return graph;
};

export const greedyBFSgrid = (start, goal, grid) => {
    let g = grid2graph(grid);
    // console.log(g);
    let k = getShortestPath(start, goal, g);
    // console.log(k);
    return k;
};

// let graph = {
//     A: [
//         [6, 'B'],
//         [1, 'D']
//     ],
//     B: [
//         [6, 'A'],
//         [2, 'E'],
//         [2, 'D'],
//         [5, 'C']
//     ],
//     C: [
//         [5, 'B'],
//         [5, 'E']
//     ],
//     D: [
//         [1, 'A'],
//         [2, 'B'],
//         [1, 'E']
//     ],
//     E: [
//         [1, 'D'],
//         [2, 'B'],
//         [5, 'C']
//     ]
// };

// console.log(getShortestPath('A', 'C', graph));
