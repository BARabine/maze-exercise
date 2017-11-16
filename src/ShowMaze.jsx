import { Component } from 'react';
import PropTypes from 'prop-types';
import { getMazeDisplay } from './maze-display';

class ShowMaze extends Component {
  constructor(props) {
    super(props);
    // console.log(`>>Inside ShowMaze constructor, props = ${JSON.stringify(props)}`);
    this.state = {
      mazeArr: null,
    };
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
    return getMazeDisplay(this.state.mazeArr, 'Show Maze Here:');
  }
}

ShowMaze.propTypes = {
  mazeArray: PropTypes.array.isRequired,
};

export default ShowMaze;
