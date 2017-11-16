import { Component } from 'react';
import {
  setGridProps,
  getMazeGridDisplay,
  getSolutionMaze,
} from './maze-display';

class SolveMazeGrid extends Component {
  constructor(props) {
    super(props);
    // console.log(`>>Inside SolveMazeGrid constructor, props = ${JSON.stringify(props)}`);
    this.state = {
      mazeArr: null,
      mazeGraph: null,
      validPath: false,
      mazePath: [],
    };
    this.updateCssProps = this.updateCssProps.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mazeArray !== null) {
      // console.log(`>>Inside SolveMazeGrid componentWillReceiveProps, nextProps = ${JSON.stringify(nextProps)}`);
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

  updateCssProps() {
    if (this.state.mazeArr && this.state.mazeArr.length > 0) {
      // assumes the maze array is rectangular.
      const arrRows = this.state.mazeArr.length;
      const arrCols = this.state.mazeArr[0].length;
      setGridProps(arrRows, arrCols);
    }
  }

  render() {
    const len = this.state.mazePath.length;
    const mazeTitle = this.state.validPath
      ? `Solved Maze Grid Here: (Steps required = ${len})`
      : 'Maze has no valid path from A to B';
    this.updateCssProps();

    return getMazeGridDisplay(
      getSolutionMaze(
        this.state.mazeArr,
        this.state.mazeGraph,
        this.state.mazePath
      ),
      mazeTitle
    );
  }
}

export default SolveMazeGrid;
