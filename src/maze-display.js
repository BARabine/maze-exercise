import React from 'react';
import './App.css';
import Flexbox from 'flexbox-react';

// ========================================================== //
// Utilities for displaying the maze

const MazeItem = ((itemObj) => {
  // console.log(`>>> MazeItem: ${JSON.stringify(itemObj)}`);
  const item = itemObj.item;
  let mazeItem = null;
  const mazeKey = `maze-item-${itemObj.rowIndex}-${itemObj.itemIndex}`;
  switch (item) {
    case 'A':
      // Start path
      mazeItem = <span className='maze-box startpoint' key={mazeKey}>A</span>;
      break;
    case '.':
      // Open path
      mazeItem = <span className='maze-box open' key={mazeKey}></span>;
      break;
    case 'X':
      // Open path
      mazeItem = <span className='maze-box path' key={mazeKey}></span>;
      break;
    case 'B':
      // End path
      mazeItem = <span className='maze-box endpoint' key={mazeKey}>B</span>;
      break;
    default:
      // Blocked path
      mazeItem = <span className='maze-box block' key={mazeKey}></span>;
      break;
  }
  return mazeItem;
})

const MazeRow = ((rowObj) => {
  // console.log(`==> MazeRow: ${JSON.stringify(rowObj)}`);
  const row = rowObj.row;
  const rowIndex = rowObj.rowIndex;
  const rowKey = `maze-row-${rowIndex}`;
  return (
    <Flexbox flexDirection="row" className="maze-row" key={rowKey}>
      {row.map((mazeItem, itemIndex) => (
        <MazeItem item={mazeItem} rowIndex={rowIndex} itemIndex={itemIndex} key={`itemkey${rowIndex}.${itemIndex}`}/>
      ))}
    </Flexbox>
  );
});

export const getMazeDisplay = ((mazeArr, title) => {
  // console.log(`>> MazeArr: ${JSON.stringify(mazeArr)}`);
  if (mazeArr && mazeArr.length > 1) {
    // console.log(`>> MazeArr Length: ${mazeArr.length}`);
    return (
      <div className="maze-display" key="maze-display">
        <div className="maze-display-title" key="maze-display-title">{title}</div>
        <Flexbox flexDirection="column" className="maze-container" key="maze-container">
          {mazeArr.map((oneRow, rowIndex) => (
            <MazeRow row={oneRow} rowIndex={rowIndex} key={`rowkey${rowIndex}`}/>
          ))}
        </Flexbox>
      </div>
    );
  }
  return (<div></div>);
});

// ========================================================== //
// Utility to create a new maze array with solution included
export const getSolutionMaze = ((mazeArr, mazeGraph, pathArr) => {
  if (mazeArr) {
    // console.log(`>> Solution MazeArr Length: ${mazeArr.length}`);
    const newMaze = [];
    const startEnd = [mazeGraph.findStartId(), mazeGraph.findEndId()];
    for (let i = 0; i < mazeArr.length; i++) {
      const mazeRow = mazeArr[i];
      const newMazeRow = [];
      for (let j = 0; j < mazeRow.length; j++) {
        const id = `${i}:${j}`;
        if (pathArr.includes(id) && !startEnd.includes(id)) {
          newMazeRow.push('X');
        } else {
          newMazeRow.push(mazeRow[j]);
        }
      }
      newMaze.push(newMazeRow);
    }
    return newMaze;
  }
  return null;
});



// ========================================================== //
