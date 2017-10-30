import './App.css';
import Flexbox from 'flexbox-react';

// ========================================================== //
// Utility for displaying the maze
export const getMazeDisplay = ((mazeArr) => {

  const myMaze = [];
  if (mazeArr) {
    console.log(`>> MazeArr Length: ${mazeArr.length}`);
    // Put a title above the displayed maze
    // myMaze.push(
    //   <div
    //     className="maze-display-title"
    //     key="show-title"
    //   >Show Maze Here:
    //   </div>
    // );
    myMaze.push(<div className="maze-display-title" key="show-title">Show Maze Here:</div>)
    // myMaze.push(
    //   <Flexbox
    //     flexDirection="column"
    //     key="maze-container"
    //     className="maze-container"
    //   >);
    myMaze.push(<div className="maze-container" key="maze-container">);
      let rowIndex = 0;
      for (let row of mazeArr) {
          // const rKey = `show-row-${rowIndex++}`;
        // myMaze.push(
        //   <Flexbox
        //     flexDirection="row"
        //     key={rKey}
        //     className="maze-row"
        //   >);
        myMaze.push(<div className="maze-row">);
          let colIndex = 0;
          for (let item of row) {
            // const cKey = `show-col-${colIndex++}`;
            // console.log(`--->>> Eval item: ${item}`);
            let colItem = null;
            switch (item) {
              case '.':
                // Open path
                  colItem = <span className='box open' key={cKey}></span>;
                break;
              case 'A':
                // Start path
                  colItem = <span className='box startpoint' key={cKey}></span>;
                break;
              case 'B':
                // End path
                  colItem = <span className='box endpoint' key={cKey}></span>;
                break;
              default:
                // Blocked path
                  colItem = <span className='box block' key={cKey}></span>;
                break;
            }
            myMaze.push(colItem);
          }
        myMaze.push(</div>);  // maze-row
      }
    myMaze.push(</div>);  // maze-container
    return myMaze;
  }
  return (<div></div>);
});




// ========================================================== //
