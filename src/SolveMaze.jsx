import React, { Component } from 'react';
import './App.css';


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
    let myMaze = (<div></div>);
    if (this.state.mazeArr) {
      // Display the maze...(somehow)
      const maze = this.state.mazeArr;
      console.log(`>> Array Length: ${maze.length}`);
      myMaze = [];
      myMaze.push(<div className="maze-display-title" key="solve-title">Solve Maze Here:</div>);
      let index = 0;
      for (let row of maze) {
        const mKey = `show-row-${index++}`;
        myMaze.push(<div className="aMaze" key={mKey}>{row}</div>);
      }
      myMaze.push(<div key="solve-steps"><br/>Steps from A to B = {this.state.mazePath.length}</div>)
    }

    return myMaze;
  }

}

export default SolveMaze;
