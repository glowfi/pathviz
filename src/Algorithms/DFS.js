class Stack {
    constructor(arr) {
        this.arr = arr;
    }

    push(value) {
        this.arr.push(value);
    }
    pop() {
        return this.arr.pop();
    }
}

const DFS = (start, goal, graph) => {
    const stack = new Stack([start]);

    let visited = {};

    while (stack.arr.length > 0) {
        const currNode = stack.pop();
        if (!graph[currNode]) return;

        if (currNode.toString() === goal.toString()) break;

        for (const nextNeighbours of graph[currNode]) {
            let isVisited = nextNeighbours in visited;
            if (!isVisited) {
                stack.push(nextNeighbours);
                visited[nextNeighbours] = currNode;
            }
        }
    }
    return visited;
};

const getShortest = (start, goal, graph) => {
    let visited = DFS(start, goal, graph);
    if (!visited) {
        return { visited: {}, out: [] };
    }
    let out = [];
    if (goal in visited) {
        let currNode = goal;
        out.push(goal);
        while (true) {
            if (currNode.toString() === start.toString()) break;
            out.push(visited[currNode]);
            currNode = visited[currNode];
        }
        out.reverse();
        return { visited, out };
    }
    return { visited, out: [] };
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
            out.push([x + dx, y + dy]);
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

export const DFSgrid = (start, goal, grid) => {
    let g = grid2graph(grid);
    let k = getShortest(start, goal, g);
    return k;
};
