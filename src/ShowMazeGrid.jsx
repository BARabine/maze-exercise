import { Component } from 'react';
import { getMazeGridDisplay } from './maze-display';

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
    /* eslint-disable no-undef */
    if (this.state.mazeArr && this.state.mazeArr.length > 0) {
      const arrRows = this.state.mazeArr.length;
      const arrCols = this.state.mazeArr[0].length;

      const htmlStyles = window.getComputedStyle(
        document.querySelector('html')
      );
      const rowNum = parseInt(htmlStyles.getPropertyValue('--rowNum'), 10);
      const colNum = parseInt(htmlStyles.getPropertyValue('--colNum'), 10);
      const size = htmlStyles.getPropertyValue('--gridSize');

      if (rowNum !== arrRows) {
        document.documentElement.style.setProperty('--rowNum', arrRows);
      }

      if (colNum !== arrCols) {
        document.documentElement.style.setProperty('--colNum', arrCols);
        if (arrCols > 60 && size !== '2vh') {
          document.documentElement.style.setProperty('--gridSize', '2vh');
        } else if (arrCols <= 60 && size !== '3vmin') {
          document.documentElement.style.setProperty('--gridSize', '3vmin');
        }
      }
    }
    /* eslint-enable no-undef */
  }

  render = () => {
    this.updateCssProps();
    return getMazeGridDisplay(this.state.mazeArr, 'Show Grid Maze Here:');
  };
}

export default ShowMazeGrid;
