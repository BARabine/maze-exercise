import React, { Component } from 'react';
import './App.css';
// import { getMazeDisplay } from './maze-display';


class ShowMaze extends Component {

  constructor(props) {
    super(props);
    // console.log(`>>Inside ShowMaze constructor, props = ${JSON.stringify(props)}`);
    this.state = {
      mazeArr: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`>>Inside ShowMaze componentWillReceiveProps,
      // nextProps = ${JSON.stringify(nextProps)}`);
    if (nextProps.mazeArray !== null) {
      this.setState({ mazeArr: nextProps.mazeArray });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // console.log(`>>Inside ShowMaze shouldComponentUpdate,
    //   nextProps = ${JSON.stringify(nextProps)}`);
    if (nextProps.mazeArr !== this.state.mazeArr) {
      return true;
    }
    return false;
  }

  render() {
    //  FIXME -- Figure out how to display the mazeArr??
    let myMaze = (<div></div>);
    if (this.state.mazeArr) {
      // Display the maze...(somehow)
      const maze = this.state.mazeArr;
      console.log(`>> Array Length: ${maze.length}`);
      myMaze = [];
      myMaze.push(<div className="maze-display-title" key="show-title">Show Maze Here:</div>);
      let index = 0;
      for (let row of maze) {
        const mKey = `show-row-${index++}`;
        myMaze.push(<div className="aMaze" key={mKey}>{row}</div>);
      }
    }

    // const myMaze = getMazeDisplay(this.state.mazeArr);

    return myMaze;
  }

}

export default ShowMaze;
