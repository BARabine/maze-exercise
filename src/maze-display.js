import React from 'react';
import Flexbox from 'flexbox-react';
import './App.css';

// ========================================================== //
// Utilities for displaying the maze
const MazeItem = itemObj => {
  // console.log(`>>> MazeItem: ${JSON.stringify(itemObj)}`);
  const { item } = itemObj;
  let mazeItem = null;
  const mazeKey = `maze-item-${itemObj.rowIndex}-${itemObj.itemIndex}`;
  switch (item) {
    case 'A':
      // Start path
      mazeItem = (
        <span className="maze-box startpoint" key={mazeKey}>
          A
        </span>
      );
      break;
    case '.':
      // Open path
      mazeItem = <span className="maze-box open" key={mazeKey} />;
      break;
    case 'X':
      // Open path
      mazeItem = <span className="maze-box path" key={mazeKey} />;
      break;
    case 'B':
      // End path
      mazeItem = (
        <span className="maze-box endpoint" key={mazeKey}>
          B
        </span>
      );
      break;
    default:
      // Blocked path
      mazeItem = <span className="maze-box block" key={mazeKey} />;
      break;
  }
  return mazeItem;
};

const MazeRow = rowObj => {
  // console.log(`==> MazeRow: ${JSON.stringify(rowObj)}`);
  const { row, rowIndex } = rowObj;
  const rowKey = `maze-row-${rowIndex}`;
  return (
    <Flexbox flexDirection="row" className="maze-row" key={rowKey}>
      {row.map((mazeItem, itemIndex) => (
        <MazeItem
          item={mazeItem}
          rowIndex={rowIndex}
          itemIndex={itemIndex}
          key={`itemkey${rowIndex}.${itemIndex}`}
        />
      ))}
    </Flexbox>
  );
};

export const getMazeDisplay = (mazeArr, title) => {
  // console.log(`>> MazeArr: ${JSON.stringify(mazeArr)}`);
  if (mazeArr && mazeArr.length > 1) {
    // console.log(`>> MazeArr Length: ${mazeArr.length}`);
    return (
      <div className="maze-display" key="maze-display">
        <div className="maze-display-title" key="maze-display-title">
          {title}
        </div>
        <Flexbox
          flexDirection="column"
          className="maze-container"
          key="maze-container"
        >
          {mazeArr.map((oneRow, rowIndex) => (
            <MazeRow
              row={oneRow}
              rowIndex={rowIndex}
              key={`rowkey${rowIndex}`}
            />
          ))}
        </Flexbox>
      </div>
    );
  }
  return <div />;
};

// ========================================================== //
// Utility to create a new maze array with solution included
export const getSolutionMaze = (mazeArr, mazeGraph, pathArr) => {
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
};

// ========================================================== //
const GridItem = itemObj => {
  const { item } = itemObj;
  let gridItem = null;
  const gridKey = `grid-item-${itemObj.rIndex}-${itemObj.iIndex}`;
  switch (item) {
    case 'A':
      gridItem = (
        <div className="maze-grid-item startpoint" key={gridKey}>
          {item}
        </div>
      );
      break;
    case '.':
      gridItem = <div className="maze-grid-item open" key={gridKey} />;
      break;
    case 'X':
      gridItem = <div className="maze-grid-item path" key={gridKey} />;
      break;
    case 'B':
      gridItem = (
        <div className="maze-grid-item endpoint" key={gridKey}>
          {item}
        </div>
      );
      break;
    default:
      gridItem = <div className="maze-grid-item block" key={gridKey} />;
      break;
  }
  return gridItem;
};

export const getMazeGridDisplay = (mazeArr, title) => {
  // console.log(`>> MazeGridArr: ${JSON.stringify(mazeArr)}`);
  if (mazeArr && mazeArr.length > 0) {
    // console.log(`>> MazeGridArr Length: ${mazeArr.length}`);
    return (
      <div className="maze-display" key="grid-maze-display-title">
        <div className="maze-display-title" key="maze-grid-title">
          {title}
        </div>
        <div className="maze-grid-container" key="maze-grid-container">
          {mazeArr.map((row, rIndex) =>
            row.map((item, iIndex) => (
              <GridItem
                item={item}
                rowIndex={rIndex}
                itemIndex={iIndex}
                key={`gkey${rIndex}-${iIndex}`}
              />
            ))
          )}
        </div>
      </div>
    );
  }
  return <div />;
};
