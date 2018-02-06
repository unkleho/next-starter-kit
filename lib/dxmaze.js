export default function init() {
  let speed = 18; // in frames per second
  let maze = [];
  let y;
  let x;
  let el;
  let elW;
  let scale;
  let width;
  let height;
  let canvas;
  let context;
  let canvasWidth;
  let canvasHeight;
  let xOffset;
  let yOffset;
  let noGoXMax;
  let noGoYMax;
  let blobs;
  let numBlobs;
  let evCount;
  let evLimit;
  let numHoles;
  let initContent;
  let line;
  let l;
  let c;
  let n = 0;
  let centreText;
  let elm;
  let interval;
  let offsetX;
  let offsetY;
  let timeout = false;
  let blink;
  const blinkDelay = 70;

  const colourBlob = '#e6007e';
  const blinkCol = '#e6007e';
  const screenBG = '#060606';
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

  // movement vectors for my blobs
  // 1 = up, 2 = right, 3 = down, 4 = left
  const move = [[0, 0], [0, -1], [1, 0], [0, 1], [-1, 0]];

  // query size of div and compute all dimensions from that
  setDims();

  draw404();
  seedMaze();

  // and away we go
  setup();
  interval = setInterval(update, 1000 / speed);

  // ////////////////////////////////////////////////

  function setDims() {
    // find out how much room we have for the canvas
    el = document.getElementById('dxmaze-holder');
    elW = el.offsetWidth;

    // set the size of a square in px
    scale = 10;
    if (elW < 400) {
      // use smaller squares for small screens
      scale = 5;
    }

    // work out h&w for grid
    width = Math.floor(elW / scale);
    height = Math.floor(width * 2 / 3);

    // scale that up for the canvas
    canvasWidth = width * scale;
    canvasHeight = height * scale;

    // work out where the TL corner of the 19x9 box in the centre saying 404 will be positions
    xOffset = Math.floor((width - 19) / 2);
    yOffset = Math.floor((height - 9) / 2);

    // now work out its BR corner is
    noGoXMax = xOffset + 19;
    noGoYMax = yOffset + 9;

    // blobs will roam the completed maze
    blobs = [];
    numBlobs = Math.floor(Math.random() * height / 3 + height / 3);

    // count the evolutions
    evCount = 0;
    // for how long? proportional to size
    evLimit = width;

    // how many extra holes are we going to drill into the finished maze?
    numHoles = width * 3; // proportional to size again

    // set up the canvas
    canvas = document.getElementById('dxmaze');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext('2d');

    // determine canvas offset, so we can work out where we are clicking on it later
    offsetX = 0;
    offsetY = 0;
    elm = canvas;
    while (elm.offsetParent) {
      offsetX += elm.offsetLeft;
      offsetY += elm.offsetTop;
      elm = elm.offsetParent;
    }
  }

  // ////////////////////////////////////////////////
  function setup() {
    if (maze.length) {
      clearMaze();
    } else {
      initMaze();
    }

    // now add initial content
    for (n = 0; n < initContent.length; n += 1) {
      if (x >= xOffset && x < noGoXMax && y >= yOffset && y < noGoYMax) {
        maze[initContent[n][1]][initContent[n][0]] = 5;
      } else {
        maze[initContent[n][1]][initContent[n][0]] = 4;
      }
    }

    // draw initial state
    updateMaze();

    // set building of maze to start
    building = 1;

    // and listen for re-sizing
    window.addEventListener('resize', throttle);
  }

  // ////////////////////////////////////////////////
  function update() {
    if (building) {
      evolve();
      updateMaze();
    } else {
      moveBlobs();
      updateBlobs();
    }
  }

  function updateMaze() {
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        if (maze[y][x] > 0) {
          context.fillStyle = edgeCols[maze[y][x]];
          context.fillRect(x * scale + 1, y * scale + 1, scale, scale);
        } else {
          context.clearRect(x * scale + 1, y * scale + 1, scale, scale);
        }
      }
    }
  }

  function clearMaze() {
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        maze[y][x] = 0;
      }
    }
  }

  function initMaze() {
    // initialise maze grid as empty
    maze = [];
    for (y = 0; y < height; y += 1) {
      line = [];
      for (x = 0; x < width; x += 1) {
        line[x] = 0;
      }
      maze[y] = line;
    }
  }

  function evolve() {
    // create a blank grid for the next generation of the evolving maze
    const nextMaze = [];
    for (y = 0; y < height; y += 1) {
      line = [];
      for (x = 0; x < width; x += 1) {
        line[x] = 0;
      }
      nextMaze[y] = line;
    }

    let neighbours;
    // loop through grid
    for (y = 0; y < height; y += 1) {
      for (x = 0; x < width; x += 1) {
        // don't grow into the 'no go zone' in the middle where it says '404'
        if (x >= xOffset && x < noGoXMax && y >= yOffset && y < noGoYMax) {
          nextMaze[y][x] = maze[y][x];
        } else {
          // otherwise aply the rules of Conway's Game of Life
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
      // we have evolved long enough! Switch modes
      building = 0;
      blinkIt();
      makeExtraHoles();
      setupBlobs();
      speed = 25;
      // and listen for clicks now
      canvas.addEventListener('mousedown', clickHandler, false);
    }
    // switch back n forth between B3/S1234 and B3/S12345 every 3 generations
    if (evCount % 3 === 0) {
      toggleDieAbove();
    }
  }

  function seedMaze() {
    // now some random bits around the edges of the 404 that form the start of the Conways maze growth
    l = initContent.length;
    c = Math.floor(Math.random() * 9 + 9);
    for (n = 0; n < c; n += 1) {
      initContent[l] = [Math.floor(Math.random() * 20 + xOffset), yOffset - 1];
      l += 1;
    }
    c = Math.random() * 9 + 9;
    for (n = 0; n < c; n += 1) {
      initContent[l] = [Math.floor(Math.random() * 20 + xOffset), noGoYMax + 1];
      l += 1;
    }
    c = Math.random() * 4 + 5;
    for (n = 0; n < c; n += 1) {
      initContent[l] = [xOffset - 1, Math.floor(Math.random() * 10 + yOffset)];
      l += 1;
    }
    c = Math.random() * 4 + 5;
    for (n = 0; n < c; n += 1) {
      initContent[l] = [noGoXMax + 1, Math.floor(Math.random() * 10 + yOffset)];
      l += 1;
    }
  }

  function seedMazeAt(mx, my) {
    x = mx;
    y = my;
    // make some random bits near the mouse click that form the start of the Conways maze growth
    while (x >= xOffset && x < noGoXMax && y >= yOffset && y < noGoYMax) {
      x = Math.floor(Math.random() * (width * 0.8) + width * 0.1);
      y = Math.floor(Math.random() * (height * 0.8) + height * 0.1);
    }
    x -= 5;
    y -= 5;
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    if (x + 10 > width) {
      x = width - 10;
    }
    if (y + 10 > height) {
      y = height - 10;
    }
    l = initContent.length;
    c = Math.floor(Math.random() * 20 + 19);
    for (n = 0; n < c; n += 1) {
      initContent[l] = [
        Math.floor(Math.random() * 10 + x),
        Math.floor(Math.random() * 10 + y),
      ];
      l += 1;
    }
  }

  function countNeighbours(yv, xv) {
    n = 0;
    if (valueAt(yv - 1, xv - 1) > 0) {
      n += 1;
    }
    if (valueAt(yv - 1, xv) > 0) {
      n += 1;
    }
    if (valueAt(yv - 1, xv + 1) > 0) {
      n += 1;
    }
    if (valueAt(yv, xv - 1) > 0) {
      n += 1;
    }
    if (valueAt(yv, xv + 1) > 0) {
      n += 1;
    }
    if (valueAt(yv + 1, xv - 1) > 0) {
      n += 1;
    }
    if (valueAt(yv + 1, xv) > 0) {
      n += 1;
    }
    if (valueAt(yv + 1, xv + 1) > 0) {
      n += 1;
    }
    return n;
  }

  function countCardinalNeighbours(yv, xv) {
    n = 0;
    if (valueAt(yv - 1, xv) > 0) {
      n += 1;
    }
    if (valueAt(yv, xv - 1) > 0) {
      n += 1;
    }
    if (valueAt(yv, xv + 1) > 0) {
      n += 1;
    }
    if (valueAt(yv + 1, xv) > 0) {
      n += 1;
    }
    return n;
  }

  function valueAt(yv, xv) {
    let o;
    // only return values outside of the no go zone (ie the 404 writing)
    if (yv >= 0 && yv < height && xv >= 0 && xv < width) {
      o = maze[yv][xv];
    } else {
      o = 0;
    }
    return o;
  }

  function toggleDieAbove() {
    // switch beween B3/S1234 and B3/S12345 rule sets of Conway's Game of Life
    if (dieAbove === 4) {
      dieAbove = 5;
    } else {
      dieAbove = 4;
    }
  }

  function makeExtraHoles() {
    for (c = 0; c < numHoles; c += 1) {
      x = Math.floor(Math.random() * (width * 0.8) + width * 0.1);
      y = Math.floor(Math.random() * (height * 0.8) + height * 0.1);
      maze[y][x] = 0;
    }
  }

  function blinkIt() {
    document.body.style.background = blinkCol;
    blink = setInterval(blinkOff, blinkDelay);
  }

  function blinkOff() {
    document.body.style.background = screenBG;
    clearInterval(blink);
  }

  function setupBlobs() {
    let dir;
    for (c = 0; c < numBlobs; c += 1) {
      x = Math.floor(Math.random() * (width * 0.8) + width * 0.1);
      y = Math.floor(Math.random() * (height * 0.8) + height * 0.1);
      while (maze[y][x] === 1 || countCardinalNeighbours(y, x) < 2) {
        x = Math.floor(Math.random() * (width * 0.8) + width * 0.1);
        y = Math.floor(Math.random() * (height * 0.8) + height * 0.1);
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
    for (c = 0; c < numBlobs; c += 1) {
      context.clearRect(
        blobs[c][0] * scale + 1,
        blobs[c][1] * scale + 1,
        scale,
        scale,
      );
    }
  }

  function clickHandler(e) {
    window.clearInterval(interval);
    canvas.removeEventListener('mousedown', clickHandler);
    blinkIt();
    const mx = Math.floor((e.pageX - offsetX) / scale);
    const my = Math.floor((e.pageY - offsetY) / scale);
    clearMaze();
    updateMaze();
    setDims();
    draw404();
    seedMazeAt(mx, my);
    building = 1;
    // and away we go (again)
    setup();
    interval = setInterval(update, 1000 / speed);
  }

  function throttle() {
    // clear the timeout
    clearTimeout(timeout);
    // start timing for event "completion"
    timeout = setTimeout(resizeHandler, 250);
  }

  function resizeHandler() {
    window.clearInterval(interval);
    canvas.removeEventListener('mousedown', clickHandler);
    setDims();
    maze = [];
    initMaze();
    updateMaze();
    draw404();
    seedMaze();
    building = 1;
    // and away we go (again)
    setup();
    interval = setInterval(update, 1000 / speed);
  }

  function draw404() {
    // 7px x 5px characters saying 404
    centreText = [
      // the 4
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
      // the 0
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
      // another 4
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
    initContent = [];
    l = 0;
    for (n = 0; n < centreText.length; n += 1) {
      initContent[l] = [centreText[n][0] + xOffset, centreText[n][1] + yOffset];
      l += 1;
    }
  }
}
