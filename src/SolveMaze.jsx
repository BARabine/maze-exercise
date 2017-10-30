import { Component } from 'react';
import './App.css';
import { getMazeDisplay, getSolutionMaze } from './maze-display';


class SolveMaze extends Component {

  constructor(props) {
    super(props);
    // console.log(`>>Inside ShowMaze constructor, props = ${JSON.stringify(props)}`);
    this.state = {
      mazeArr: null,
      mazeGraph: null,
      mazePath: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mazeArray !== null) {
      // console.log(`>>Inside SolveMaze componentWillReceiveProps, nextProps = ${JSON.stringify(nextProps)}`);
      this.setState({
        mazeArr: nextProps.mazeArray,
        mazeGraph: nextProps.mazeGraph,
        mazePath: nextProps.mazePath,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.mazePath !== this.state.mazePath) {
      // console.log(`>>Inside SolveMaze shouldComponentUpdate, nextProps = ${JSON.stringify(nextProps)}`);
      return true;
    }
    return false;
  }

  render() {
    const pathLength = (this.state.mazePath) ? this.state.mazePath.length : 0;
    return getMazeDisplay(
      getSolutionMaze(this.state.mazeArr, this.state.mazeGraph, this.state.mazePath),
      "Solved Maze Here:",
      pathLength,
    );

  }

}

export default SolveMaze;
