// ========================================================== //
// Two-dimensional array representing the ASCII maze
export const getMazeArray = mazeStr =>
  mazeStr
    .trim()
    .split('\n')
    .map(row => row.trim().split(''));

// ========================================================== //
export class Queue {
  constructor() {
    this.elements = [];
  }
  enQueue(element) {
    this.elements.push(element);
  }
  deQueue() {
    return this.elements.shift();
  }
  showQueue() {
    return this.elements.join(', ');
  }
  isEmpty() {
    return this.elements.length === 0;
  }
}

// ========================================================== //
export class Node {
  constructor(x, y, value) {
    this.node = {
      x,
      y,
      isStart: value === 'A',
      isEnd: value === 'B',
      edges: {},
      visited: false,
      dist: Infinity,
      prevNode: null,
    };
  }
  setEdge(id) {
    this.node.edges[id] = true;
  }
  get isStartNode() {
    return this.node.isStart;
  }
  get isEndNode() {
    return this.node.isEnd;
  }
  get isVisited() {
    return this.node.visited;
  }
  setVisited() {
    this.node.visited = true;
  }
  setDistance(val) {
    this.node.dist = val;
  }
  get distance() {
    return this.node.dist;
  }
  get prevNode() {
    return this.node.prevNode;
  }
  setPrevNode(id) {
    this.node.prevNode = id;
  }
}
// ========================================================== //
export class MazeGraph {
  constructor() {
    this.graph = {};
  }
  addVertex(x, y, value) {
    this.graph[`${x}:${y}`] = new Node(x, y, value);
  }
  contains(id) {
    // console.log(`>> Contains: ${id}:  ${!!this.graph[id]}`);
    return !!this.graph[id];
  }
  addEdge(startId, endId) {
    if (this.contains(startId) && this.contains(endId)) {
      // console.log(`\t\t--> Connecting ${startId} and ${endId}`);
      // this.graph[startId].edges[endId] = true;
      // this.graph[endId].edges[startId] = true;
      this.graph[startId].setEdge(endId);
      this.graph[endId].setEdge(startId);
    }
  }
  findStartId() {
    const keys = Object.keys(this.graph);
    // console.log(`==>> Keys: ${keys}`);
    const id = keys.filter(
      key =>
        // console.log(`>> key: ${key} => obj.isStart: ${JSON.stringify(this.graph[key].isStart)}`);
        this.graph[key].isStartNode ? key : null
    );
    return id.length > 0 ? id[0] : null;
  }
  findEndId() {
    const keys = Object.keys(this.graph);
    // console.log(`==>> Keys: ${keys}`);
    const id = keys.filter(
      key =>
        // console.log(`>> key: ${key} => obj.isEnd: ${JSON.stringify(this.graph[key].isEnd)}`);
        this.graph[key].isEndNode ? key : null
    );
    return id.length > 0 ? id[0] : null;
  }
  getAdjacentList(fromId) {
    // returns horizontal and vertical adjacent children...
    const children = [];
    let [x, y] = fromId.split(':');
    [x, y] = [parseInt(x, 10), parseInt(y, 10)];
    let child = `${x}:${y - 1}`; // left of
    if (this.contains(child) && !this.graph[child].isVisited)
      children.push(child);
    child = `${x - 1}:${y}`; // row above
    if (this.contains(child) && !this.graph[child].isVisited)
      children.push(child);
    child = `${x}:${y + 1}`; // right of
    if (this.contains(child) && !this.graph[child].isVisited)
      children.push(child);
    child = `${x + 1}:${y}`; // row below
    if (this.contains(child) && !this.graph[child].isVisited)
      children.push(child);
    return children;
  }

  doBFS(startId, endId) {
    // console.log(`\n**>> Starting BFS, ${startId} to ${endId}`);
    const q = new Queue();
    // add the start node to the queue,
    q.enQueue(startId);
    // mark it as visited,
    this.graph[startId].setVisited();
    // and set the distance to 0.
    this.graph[startId].setDistance(0);

    while (!q.isEmpty()) {
      const nodeId = q.deQueue();
      const nodeDist = this.graph[nodeId].distance;
      // console.log(`---> Q = ${q.showQueue()}`);
      // console.log(`>> Checking id = ${nodeId}`);
      if (nodeId === endId) {
        // console.log(`*** Found End Node (${endId}) ***`);
      }
      const children = this.getAdjacentList(nodeId);
      // console.log(`  >> Adding (${children.length}) = ${JSON.stringify(children)} to Q`);
      children.map(child => {
        q.enQueue(child);
        this.graph[child].setVisited();
        this.graph[child].setDistance(nodeDist + 1);
        this.graph[child].setPrevNode(nodeId);
        return child;
      });
    }
  }

  hasValidPath() {
    return !!(this.getShortestPath().length > 0);
  }

  getShortestPath(startId = this.findStartId(), endId = this.findEndId()) {
    // starting at the end, work back to start
    const path = [];
    if (startId && endId) {
      let id = endId;
      path.push(id);
      while (id !== startId) {
        id = this.graph[id].prevNode;
        if (id === null) {
          return [];
        }
        path.push(id);
      }
    }
    return path.reverse();
  }
}

// ========================================================== //
export const buildMazeGraph = maze => {
  const mazeGraph = new MazeGraph();
  // Parse through the maze array and create all the graph verticies
  let cur = null;
  let prev = null;
  for (let i = 0; i < maze.length; i++) {
    const row = maze[i];
    for (let j = 0; j < row.length; j++) {
      const item = row[j];
      if (item !== '#') {
        // console.log(`>> Created Vertex: x: ${i}, y: ${j}, val: ${item}`);
        mazeGraph.addVertex(i, j, item);
        prev = cur === null ? null : cur;
        cur = `${i}:${j}`;
        // console.log(`\t===> prev = ${prev}, cur = ${cur}`);
        if (prev !== null && cur !== null) {
          mazeGraph.addEdge(cur, prev);
        }
        const up = `${i - 1}:${j}`;
        if (mazeGraph.contains(up)) {
          // console.log(`---------> Make vertical connection to ${up}`);
          mazeGraph.addEdge(cur, up);
        }
      } else {
        cur = null;
      }
    }
  }
  const startId = mazeGraph.findStartId();
  const endId = mazeGraph.findEndId();
  if (startId && endId) {
    mazeGraph.doBFS(startId, endId);
  }
  return mazeGraph;
};
// ========================================================== //
