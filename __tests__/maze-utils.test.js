import { getMazeArray, Queue } from '../src/maze-utils';


describe('Reading ASCII maze into 2-dimensional array', () => {
  const myMaze = `######
                  #A...#
                  ##..B#
                  ######`;
  test('getMazeArray returns an array of arrays', () => {
    const arr = getMazeArray(myMaze);
    expect(arr).toEqual([
      ['#', '#', '#', '#', '#', '#'],
      ['#', 'A', '.', '.', '.', '#'],
      ['#', '#', '.', '.', 'B', '#'],
      ['#', '#', '#', '#', '#', '#'],
    ]);
  });
});

describe('Queue class tests', () => {
  let myQ;
  beforeEach(() => {
    myQ = new Queue();
  });
  afterEach(() => {
    myQ = null;
  });

  test('for empty Queue', () => {
    // const myQ = new Queue();
    expect(myQ.isEmpty()).toBeTruthy();
  });

  test('for non-empty Queue', () => {
    // const myQ = new Queue();
    myQ.enQueue('A');
    expect(myQ.isEmpty()).toBeFalsy();
  });

  test('adding and removing item from Queue', () => {
    // const myQ = new Queue();
    myQ.enQueue('A');
    const dq = myQ.deQueue();
    expect(myQ.isEmpty()).toBeTruthy();
    expect(dq).toBe('A');
  });

  test('adding 2 items onto Queue', () => {
    // const myQ = new Queue();
    myQ.enQueue('A');
    myQ.enQueue('B');
    expect(myQ.showQueue()).toBe('A, B');
  });
});
