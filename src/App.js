import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';
import logo from './peoplenetlogo.png';
import { getMazeArray, buildMazeGraph } from './maze-utils';
import ShowMaze from './ShowMaze.jsx';
import SolveMaze from './SolveMaze.jsx';
import ShowMazeGrid from './ShowMazeGrid.jsx';
import { m1, m2, m3 } from './maze-examples';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mazeStr: '',
      mazeArr: null,
      mazeGraph: null,
      validPath: false,
      mazePath: [],
    };
    this.setMaze = this.setMaze.bind(this);
    this.processMaze = this.processMaze.bind(this);
    this.changeMaze = this.changeMaze.bind(this);
  }

  // setMaze = ((event) => {
  setMaze(event) {
    this.setState({ mazeStr: event.target.value });
  }

  // processMaze = (() => {
  processMaze() {
    const { mazeStr } = this.state;
    // console.log(`Inside processMaze! \n${mazeStr}`);
    const mazeArr = getMazeArray(mazeStr);
    const mazeGraph = buildMazeGraph(mazeArr);
    const validPath = mazeGraph.hasValidPath();
    const mazePath = mazeGraph.getShortestPath();
    this.setState({
      mazeArr,
      mazeGraph,
      validPath,
      mazePath,
    });
  }

  changeMaze(event) {
    // console.log(`Inside changeMaze! ${event.target.value}`);
    const defaultVals = {
      mazeArr: null,
      mazeGraph: null,
      validPath: false,
      mazePath: [],
    };
    switch (event.target.value) {
      case 'm1':
        // this.setState({ mazeStr: m1, ...defaultVals });
        defaultVals.mazeStr = m1;
        break;
      case 'm2':
        // this.setState({ mazeStr: m2, ...defaultVals });
        defaultVals.mazeStr = m2;
        break;
      case 'm3':
        // this.setState({ mazeStr: m3, ...defaultVals });
        defaultVals.mazeStr = m3;
        break;
      default:
        // this.setState({ mazeStr: '', ...defaultVals });
        defaultVals.mazeStr = '';
    }
    this.setState(defaultVals);
  }

  render() {
    return (
      <Flexbox className="App" flexDirection="column">
        <Flexbox
          element="header"
          flexDirection="column"
          justifyContent="flex-start"
          className="App-header"
        >
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Front-end Software Engineer Interview Exercise
          </h1>
        </Flexbox>

        <Flexbox flexDirection="column">
          <div className="App-intro">
            Enter, paste, or select your ASCII maze in the textarea below, then
            click <em>process.</em>
          </div>
          <div className="maze-selector">
            <label className="radio-label">
              <input
                type="radio"
                name="maze"
                id="maze-m0"
                value="m0"
                onChange={this.changeMaze}
                defaultChecked
              />New
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="maze"
                id="maze-m1"
                value="m1"
                onChange={this.changeMaze}
              />Maze 1
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="maze"
                id="maze-m2"
                value="m2"
                onChange={this.changeMaze}
              />Maze 2
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="maze"
                id="maze-m3"
                value="m3"
                onChange={this.changeMaze}
              />Maze 3
            </label>
          </div>
          <textarea
            rows="20"
            cols="100"
            className="aMaze"
            value={this.state.mazeStr}
            onChange={this.setMaze}
          />
          <Flexbox
            flexDirection="row"
            justifyContent="space-around"
            className="button-row"
          >
            <RaisedButton
              label="Process"
              primary={true}
              className="app-button"
              onClick={this.processMaze}
            />
          </Flexbox>

          <ShowMaze mazeArray={this.state.mazeArr} />

          <SolveMaze
            mazeArray={this.state.mazeArr}
            mazeGraph={this.state.mazeGraph}
            validPath={this.state.validPath}
            mazePath={this.state.mazePath}
          />

          <ShowMazeGrid mazeArray={this.state.mazeArr} />
        </Flexbox>
      </Flexbox>
    );
  }
}

export default App;
