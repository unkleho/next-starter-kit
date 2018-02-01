export default function init() {
  let speed = 18; // in frames per second

  const colourBlob = '#e6007e';
  const colourBG = '#060606';
  let maze;

  const edgeCols = [
    '#060606',
    '#888888',
    '#a05a85',
    '#c32d81',
    '#e6007e',
    '#e6007e',
  ];

  // Conway's Game of Life params
  // B3/S12345 or B3/S1234 both create mazes
  // whereas B3/S23 is the 'standard game'
  const birthNum = 3;
  const dieBelow = 1;
  let dieAbove = 4;

  // are we building the maze? 1 = yes
  let building = 0;

  let offsetX = 0;
  let offsetY = 0;

  const blobs = [];
  const numBlobs = 20 + Math.floor(Math.random() * 20);

  // count the evolutions
  let evCount = 0;
  // for how long?
  const evLimit = 100;

  // movement vectors for my blobs
  const move = [[0, 0], [0, -1], [1, 0], [0, 1], [-1, 0]];

  // 7x5 pixel characters saying 404
  const centreText = [
    // 4
    [4, 1],
    [3, 2],
    [4, 2],
    [2, 3],
    [4, 3],
    [1, 4],
    [4, 4],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 5],
    [4, 6],
    [4, 7],
    // 0
    [8, 1],
    [9, 1],
    [10, 1],
    [7, 2],
    [11, 2],
    [7, 3],
    [10, 3],
    [11, 3],
    [7, 4],
    [9, 4],
    [11, 4],
    [7, 5],
    [8, 5],
    [11, 5],
    [7, 6],
    [11, 6],
    [8, 7],
    [9, 7],
    [10, 7],
    // 4
    [16, 1],
    [15, 2],
    [16, 2],
    [14, 3],
    [16, 3],
    [13, 4],
    [16, 4],
    [13, 5],
    [14, 5],
    [15, 5],
    [16, 5],
    [17, 5],
    [16, 6],
    [16, 7],
  ];

  // find out how much room we have for the canvas
  const el = document.getElementById('dxmaze-holder');
  const elW = el.offsetWidth;

  // the size of a square in px
  const scale = 10;

  const width = Math.floor(elW / scale);
  const height = Math.floor(width * 2 / 3);
  const canvasWidth = width * scale;
  const canvasHeight = height * scale;

  // work out where the TL corner of the 19x9 box in the centre saying 404 will be positions
  const xOffset = Math.floor((width - 19) / 2);
  const yOffset = Math.floor((height - 9) / 2);

  // now work out its BR corner is
  const noGoXMax = xOffset + 19;
  const noGoYMax = yOffset + 9;

  const initContent = [];

  let l = 0;

  for (n = 0; n < centreText.length; n += 1) {
    initContent[l] = [centreText[n][0] + xOffset, centreText[n][1] + yOffset];
    l += 1;
  }

  // now some random bits that form the start of the Conways maze growth
  l = initContent.length;
  let extras = Math.floor(Math.random() * 7 + 7);
  for (n = 0; n < extras; n += 1) {
    initContent[l] = [Math.floor(Math.random() * 20 + xOffset), yOffset - 1];
    l += 1;
  }
  extras = Math.random() * 7 + 7;
  for (n = 0; n < extras; n += 1) {
    initContent[l] = [Math.floor(Math.random() * 20 + xOffset), noGoYMax + 1];
    l += 1;
  }
  extras = Math.random() * 3 + 4;
  for (n = 0; n < extras; n += 1) {
    initContent[l] = [xOffset - 1, Math.floor(Math.random() * 10 + yOffset)];
    l += 1;
  }
  extras = Math.random() * 3 + 4;
  for (n = 0; n < extras; n += 1) {
    initContent[l] = [noGoXMax + 1, Math.floor(Math.random() * 10 + yOffset)];
    l += 1;
  }

  let n = 0;

  // set up the canvas
  const canvas = document.getElementById('dxmaze');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const context = canvas.getContext('2d');

  // and away we go
  setup();
  const interval = setInterval(update, 1000 / speed);

  // ////////////////////////////////////////////////
  function setup() {
    // initialise maze grid as empty
    let x;
    let y;
    let line;
    maze = [];
    for (y = 0; y < height; y += 1) {
      line = [];
      for (x = 0; x < width; x += 1) {
        line[x] = 0;
      }
      maze[y] = line;
    }

    // now add initial content
    for (n = 0; n < initContent.length; n += 1) {
      if (x >= xOffset && x < noGoXMax && y >= yOffset && y < noGoYMax) {
        maze[initContent[n][1]][initContent[n][0]] = 5;
      } else {
        maze[initContent[n][1]][initContent[n][0]] = 4;
      }
    }

    // canvas offset, so we can work out where we are clicking on it later
    let elm = canvas;
    if (elm.offsetParent) {
      do {
        offsetX += elm.offsetLeft;
        offsetY += elm.offsetTop;
      } while ((elm = elm.offsetParent));
    }

    // draw initial state
    updateMaze();

    // start
    building = 1;

    // and list for clicks
    canvas.addEventListener('mousedown', clickHandler, false);
  }

  function update() {
    if (building) {
      evolve();
      updateMaze();
      if (evCount % 3 === 0) {
        toggleDieAbove();
      }
    } else {
      moveBlobs();
      updateBlobs();
      document.body.style.background = colourBG;
    }
  }

  function updateMaze() {
    let y;
    let x;
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        context.fillStyle = edgeCols[maze[y][x]];
        context.fillRect(x * scale + 1, y * scale + 1, scale, scale);
      }
    }
  }

  function evolve() {
    // create a blank grid for the next evolution of life
    let x;
    let y;
    let line;
    const nextMaze = [];
    for (y = 0; y < height; y += 1) {
      line = [];
      for (x = 0; x < width; x += 1) {
        line[x] = 0;
      }
      nextMaze[y] = line;
    }

    let neighbours;

    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        if (x >= xOffset && x < noGoXMax && y >= yOffset && y < noGoYMax) {
          nextMaze[y][x] = maze[y][x];
        } else {
          neighbours = countNeighbours(y, x);
          if (maze[y][x] !== 0) {
            if (neighbours >= dieBelow && neighbours <= dieAbove) {
              nextMaze[y][x] = maze[y][x] - 1;
              if (nextMaze[y][x] === 0) {
                nextMaze[y][x] = 1;
              }
            }
          } else if (neighbours === birthNum) {
            nextMaze[y][x] = 4;
          }
        }
      }
    }
    maze = nextMaze;
    evCount += 1;
    if (evCount > evLimit) {
      building = 0;
      document.body.style.background = colourBlob;
      makeExtraHoles();
      setupBlobs();
      speed = 25;
    }
  }

  function countNeighbours(y, x) {
    n = 0;
    if (valueAt(y - 1, x - 1) > 0) {
      n += 1;
    }
    if (valueAt(y - 1, x) > 0) {
      n += 1;
    }
    if (valueAt(y - 1, x + 1) > 0) {
      n += 1;
    }
    if (valueAt(y, x - 1) > 0) {
      n += 1;
    }
    if (valueAt(y, x + 1) > 0) {
      n += 1;
    }
    if (valueAt(y + 1, x - 1) > 0) {
      n += 1;
    }
    if (valueAt(y + 1, x) > 0) {
      n += 1;
    }
    if (valueAt(y + 1, x + 1) > 0) {
      n += 1;
    }
    return n;
  }

  function countCardinalNeighbours(y, x) {
    n = 0;
    if (valueAt(y - 1, x) > 0) {
      n += 1;
    }
    if (valueAt(y, x - 1) > 0) {
      n += 1;
    }
    if (valueAt(y, x + 1) > 0) {
      n += 1;
    }
    if (valueAt(y + 1, x) > 0) {
      n += 1;
    }
    return n;
  }

  function valueAt(y, x) {
    let o;
    if (y >= 0 && y < height && x >= 0 && x < width) {
      o = maze[y][x];
    } else {
      o = 0;
    }
    return o;
  }

  function toggleDieAbove() {
    if (dieAbove === 4) {
      dieAbove = 5;
    } else {
      dieAbove = 4;
    }
  }

  function makeExtraHoles() {
    for (let c = 0; c < 500; c += 1) {
      const x = Math.floor(Math.random() * (width - 20) + 10);
      const y = Math.floor(Math.random() * (height - 20) + 10);
      maze[y][x] = 0;
    }
  }

  function setupBlobs() {
    let dir;
    let c;
    let x;
    let y;
    for (c = 0; c < numBlobs; c += 1) {
      x = Math.floor(Math.random() * (width - 20) + 10);
      y = Math.floor(Math.random() * (height - 20) + 10);
      while (maze[y][x] === 1 || countCardinalNeighbours(y, x) < 2) {
        x = Math.floor(Math.random() * (width - 20) + 10);
        y = Math.floor(Math.random() * (height - 20) + 10);
      }
      dir = Math.floor(Math.random() * 4 + 1);
      blobs[c] = [x, y, dir];
    }
    updateBlobs();
  }

  function moveBlobs() {
    clearBlobs();
    let newX;
    let newY;
    let c;
    for (c = 0; c < numBlobs; c += 1) {
      if (countCardinalNeighbours(blobs[c][1], blobs[c][0]) < 2) {
        blobs[c][2] = Math.floor(Math.random() * 4 + 1);
        newX = blobs[c][0] + move[blobs[c][2]][0];
        newY = blobs[c][1] + move[blobs[c][2]][1];
        if (newX < 0 || newY < 0 || newX >= width || newY >= height) {
          blobs[c][2] = Math.floor(Math.random() * 4 + 1);
        } else if (maze[newY][newX] > 0) {
          blobs[c][2] = Math.floor(Math.random() * 4 + 1);
        } else {
          blobs[c][0] = newX;
          blobs[c][1] = newY;
        }
      } else {
        newX = blobs[c][0] + move[blobs[c][2]][0];
        newY = blobs[c][1] + move[blobs[c][2]][1];
        if (newX < 0 || newY < 0 || newX >= width || newY >= height) {
          blobs[c][2] = Math.floor(Math.random() * 4 + 1);
        } else if (maze[newY][newX] > 0) {
          blobs[c][2] = Math.floor(Math.random() * 4 + 1);
        } else {
          blobs[c][0] = newX;
          blobs[c][1] = newY;
        }
      }
    }
  }

  function updateBlobs() {
    let c;
    context.fillStyle = colourBlob;
    for (c = 0; c < numBlobs; c += 1) {
      context.fillRect(
        blobs[c][0] * scale + 1,
        blobs[c][1] * scale + 1,
        scale,
        scale,
      );
    }
  }

  function clearBlobs() {
    let c;
    context.fillStyle = colourBG;
    for (c = 0; c < numBlobs; c += 1) {
      context.fillRect(
        blobs[c][0] * scale + 1,
        blobs[c][1] * scale + 1,
        scale,
        scale,
      );
    }
  }

  function clickHandler(e) {
    let c;
    const mx = Math.floor((e.pageX - offsetX) / scale);
    const my = Math.floor((e.pageY - offsetY) / scale);
    for (c = 0; c < numBlobs; c += 1) {
      if (blobs[c][0] === mx && blobs[c][1] === my) {
        document.body.style.background = colourBlob;
      }
    }
  }
}
