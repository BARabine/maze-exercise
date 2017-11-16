import { Component } from 'react';
import PropTypes from 'prop-types';
import { setGridProps, getMazeGridDisplay } from './maze-display';

class ShowMazeGrid extends Component {
  constructor(props) {
    super(props);
    // console.log(`>>Inside ShowMazeGrid constructor, props = ${JSON.stringify(props)}`);
    this.state = {
      mazeArr: null,
    };
    this.updateCssProps = this.updateCssProps.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`>>Inside ShowMazeGrid componentWillReceiveProps,
    // nextProps = ${JSON.stringify(nextProps)}`);
    if (nextProps.mazeArray !== null) {
      this.setState({ mazeArr: nextProps.mazeArray });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // console.log(`>>Inside ShowMazeGrid shouldComponentUpdate,
    //   nextProps = ${JSON.stringify(nextProps)}`);
    if (nextProps.mazeArr !== this.state.mazeArr) {
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
    this.updateCssProps();
    return getMazeGridDisplay(this.state.mazeArr, 'Show Grid Maze Here:');
  }
}

ShowMazeGrid.propTypes = {
  mazeArray: PropTypes.array.isRequired,
};

export default ShowMazeGrid;
