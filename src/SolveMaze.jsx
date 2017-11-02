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
      validPath: false,
      mazePath: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mazeArray !== null) {
      // console.log(`>>Inside SolveMaze componentWillReceiveProps, nextProps = ${JSON.stringify(nextProps)}`);
      this.setState({
        mazeArr: nextProps.mazeArray,
        mazeGraph: nextProps.mazeGraph,
        validPath: nextProps.validPath,
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
    const mazeTitle = (this.state.validPath) ?
      `Solved Maze Here: (Steps required = ${this.state.mazePath.length})` :
      `Maze has no valid path from A to B`;
    
    return getMazeDisplay(
      getSolutionMaze(
        this.state.mazeArr,
        this.state.mazeGraph,
        this.state.mazePath),
      mazeTitle
    );

  }

}

export default SolveMaze;
