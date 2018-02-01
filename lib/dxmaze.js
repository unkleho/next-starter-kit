// ////////////////////////////////////////////////

const scale = 10;
const width = 120;
const height = 80;
const canvasWidth = width * scale;
const canvasHeight = height * scale;

let speed = 10;

const colourWall = '#bbbbbb';
let colourBlob = '#ee4444';
const colourBG = '#000000';
let maze;

const blobCols = [
  '#dd4444',
  '#dd6644',
  '#dd8844',
  '#ee6644',
  '#ff4422',
  '#ff4400',
  '#ee4422',
  '#ee4444',
  '#ee2244',
];

let blobCtr = 0;

// Conway's Life params
const birthNum = 3;
const dieBelow = 1;
let dieAbove = 4;

let building = 0;

let canvas;
let context;

const blobs = [];
const numBlobs = 30;

let dots;
let clearDots;

let evCount = 0;
const evLimit = 100;

const move = [[0, 0], [0, -1], [1, 0], [0, 1], [-1, 0]];

const initContent = [
  [50, 30],
  [51, 30],
  [52, 30],
  [53, 30],
  [54, 30],
  [55, 30],
  [56, 30],
  [57, 30],
  [58, 30],
  [59, 30],
  [60, 30],
  [60, 30],
  [61, 30],
  [62, 30],
  [63, 30],
  [64, 30],
  [65, 30],
  [66, 30],
  [67, 30],
  [68, 30],
  [69, 30],
  [70, 30],

  [50, 31],
  [50, 32],
  [50, 33],
  [50, 34],
  [50, 35],
  [50, 36],
  [50, 37],
  [50, 38],
  [50, 39],
  [50, 40],

  [51, 40],
  [52, 40],
  [53, 40],
  [54, 40],
  [55, 40],
  [56, 40],
  [57, 40],
  [58, 40],
  [59, 40],
  [60, 40],
  [61, 40],
  [62, 40],
  [63, 40],
  [64, 40],
  [65, 40],
  [66, 40],
  [67, 40],
  [68, 40],
  [69, 40],
  [70, 40],

  [70, 31],
  [70, 32],
  [70, 33],
  [70, 34],
  [70, 35],
  [70, 36],
  [70, 37],
  [70, 38],
  [70, 39],
];

// now some random bits
let l = initContent.length;
let extras = Math.floor(Math.random() * 5 + 5);
for (var n = 0; n < extras; n += 1) {
  initContent[l++] = [Math.floor(Math.random() * 20 + 51), 29];
}
extras = Math.random() * 5 + 5;
for (var n = 0; n < extras; n += 1) {
  initContent[l++] = [Math.floor(Math.random() * 20 + 51), 41];
}
extras = Math.random() * 3 + 3;
for (var n = 0; n < extras; n += 1) {
  initContent[l++] = [49, Math.floor(Math.random() * 10 + 31)];
}
extras = Math.random() * 3 + 3;
for (var n = 0; n < extras; n += 1) {
  initContent[l++] = [71, Math.floor(Math.random() * 10 + 31)];
}

export default function init() {
  setup();
  const interval = setInterval(update, 1000 / speed);
}

// ////////////////////////////////////////////////
function setup() {
  const el = document.getElementById('dxmaze-holder');
  console.log(el);

  canvas = document.getElementById('dxmaze');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  context = canvas.getContext('2d');

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
  for (let n = 0; n < initContent.length; n += 1) {
    maze[initContent[n][1]][initContent[n][0]] = 1;
  }

  // canvas offset
  //	var element = canvas;
  //	if (element.offsetParent) {
  //		do {
  //			OFFSETX += element.offsetLeft;
  //			OFFSETY += element.offsetTop;
  //		} while (element = element.offsetParent);
  //	}

  // draw initial state
  updateMaze();

  // start
  building = 1;

  // globals & stuff

  dots = new Array();
  clearDots = new Array();

  //	var img = new Image();

  //	img.src = templateUrl + 'img.png';

  //	img.onload = function() {
  //		var tmp = document.createElement("canvas");
  //		tmp.width = img.width;
  //		tmp.height = img.height;
  //		tmp.getContext("2d").drawImage(img,0,0);

  //		var pixels = tmp.getContext("2d").getImageData(0, 0, tmp.width, tmp.height).data;
  //		var scale = 4;
  //		var txtOffsX = 128*2;
  //		var txtOffsY = 16;
  //
  //		for (var i=0; i<pixels.length; i+=4){
  //			if (pixels[i] == 0) { 	// check only the red channel;
  //				var dx = Math.floor((i/4) % tmp.width) * scale + txtOffsX;
  //				var dy = Math.floor((i/4) / tmp.width) * scale + txtOffsY;
  //				var d = new Dot(context, dx, dy, 0, colorA, dots);
  //				dots.push(d);
  //
  //				var c = new Dot(context, dx, dy, 0, colorA, clearDots);
  //				clearDots.push(c);
  //			}
  //		}
  //	}

  // events
  //	canvas.addEventListener('mousemove', mouseMoveHandler, false);
  //	canvas.addEventListener('mousedown', mouseDownHandler, false);
}
// ////////////////////////////////////////////////
function updateMaze() {
  let y;
  let x;
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      if (maze[y][x] === 1) {
        context.fillStyle = colourWall;
      } else {
        context.fillStyle = colourBG;
      }
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
      neighbours = countNeighbours(y, x);
      if (maze[y][x] !== 0) {
        if (neighbours >= dieBelow && neighbours <= dieAbove) {
          nextMaze[y][x] = 1;
        }
      } else if (neighbours === birthNum) {
        nextMaze[y][x] = 1;
      }
    }
  }
  maze = nextMaze;
  evCount++;
  if (evCount > evLimit) {
    building = 0;
    makeExtraHoles();
    setupBlobs();
    speed = 25;
  }
}

function countNeighbours(y, x) {
  return (
    valueAt(y - 1, x - 1) +
    valueAt(y - 1, x) +
    valueAt(y - 1, x + 1) +
    valueAt(y, x - 1) +
    valueAt(y, x + 1) +
    valueAt(y + 1, x - 1) +
    valueAt(y + 1, x) +
    valueAt(y + 1, x + 1)
  );
}

function countCardinalNeighbours(y, x) {
  return (
    valueAt(y - 1, x) +
    valueAt(y, x - 1) +
    valueAt(y, x + 1) +
    valueAt(y + 1, x)
  );
}

function valueAt(y, x) {
  // will eventually return 1 for inner sactum and zero for out of bounds
  let o;
  if (y >= 0 && y < height && x >= 0 && x < width) {
    o = maze[y][x];
  } else {
    o = 0;
  }
  return o;
}

function update() {
  if (building) {
    evolve();
    updateMaze();
    if (evCount % 3 == 0) {
      toggleDieAbove();
    }
  } else {
    moveBlobs();
    updateBlobs();
  }
}

function toggleDieAbove() {
  if (dieAbove == 4) {
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
  for (let c = 0; c < numBlobs; c += 1) {
    var x = Math.floor(Math.random() * (width - 20) + 10);
    var y = Math.floor(Math.random() * (height - 20) + 10);
    while (maze[y][x] === 1 || countCardinalNeighbours(y, x) < 2) {
      var x = Math.floor(Math.random() * (width - 20) + 10);
      var y = Math.floor(Math.random() * (height - 20) + 10);
    }
    dir = Math.floor(Math.random() * 4 + 1);
    blobs[c] = [x, y, dir];
  }
  updateBlobs();
}

function moveBlobs() {
  clearBlobs();
  let newX, newY;
  for (let c = 0; c < numBlobs; c += 1) {
    if (countCardinalNeighbours(blobs[c][1], blobs[c][0]) < 2) {
      blobs[c][2] = Math.floor(Math.random() * 4 + 1);
      newX = blobs[c][0] + move[blobs[c][2]][0];
      newY = blobs[c][1] + move[blobs[c][2]][1];
      if (newX < 0 || newY < 0 || newX >= width || newY >= height) {
        blobs[c][2] = Math.floor(Math.random() * 4 + 1);
      } else if (maze[newY][newX] == 1) {
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
      } else if (maze[newY][newX] == 1) {
        blobs[c][2] = Math.floor(Math.random() * 4 + 1);
      } else {
        blobs[c][0] = newX;
        blobs[c][1] = newY;
      }
    }
  }
}

function updateBlobs() {
  blobCtr = (blobCtr + 1) % blobCols.length;
  colourBlob = blobCols[blobCtr];
  context.fillStyle = colourBlob;
  for (let c = 0; c < numBlobs; c += 1) {
    context.fillRect(
      blobs[c][0] * scale + 1,
      blobs[c][1] * scale + 1,
      scale,
      scale,
    );
  }
}
function clearBlobs() {
  context.fillStyle = colourBG;
  for (let c = 0; c < numBlobs; c += 1) {
    context.fillRect(
      blobs[c][0] * scale + 1,
      blobs[c][1] * scale + 1,
      scale,
      scale,
    );
  }
}

// function mouseMoveHandler(e){
//	var mx = e.pageX - OFFSETX;
//	var my = e.pageY - OFFSETY;
//	if (dots.length < 900) {
//		var d = new Date();
//		var a = d.getMilliseconds() / 500;
//		//for(var i=0; i<3; i++){
//			var d = new Dot(context, mx, my, 1, colorB, dots);
//			d.setAng(a);
//			dots.push(d);
//		//}
//	}
// }
// ////////////////////////////////////////////////
// function mouseDownHandler(e){
//	dots = [];
//	context.clearRect(0,0,WIDTH,HEIGHT);
// }

// ////////////////////////////////////////////////
function draw() {
  for (var i = 0; i < dots.length; i++) {
    dots[i].paint();
  }

  for (var i = 0; i < clearDots.length; i++) {
    clearDots[i].clear();
  }
}

// ///////////////////////////////////////////
function Dot(context, ox, oy, type, col, myList) {
  this.context = context;
  this.ox = ox;
  this.oy = oy;
  this.type = type;
  this.col = col;
  this.myList = myList;

  this.dead = false;
  this.dotSize = 4;
  this.offsY = 1;
  this.life = -1;
  this.px = ox + Math.random() * 14 - 7;
  this.py = oy + Math.random() * 14 - 7;
  this.speed = Math.random() * 5 + 1;
  this.life = Math.floor(Math.random() * 50 + 10);
  this.ang = Math.random() * Math.PI * 2;
  this.pat = Math.floor(Math.random() * 3);

  if (typeof _Dot_prototype_called_ === 'undefined') {
    _Dot_prototype_called_ = true;
    Dot.prototype.setAng = setAng;
    Dot.prototype.paint = paint;
    Dot.prototype.kill = kill;
    Dot.prototype.clear = clear;
  }

  //----------------------------------------------------------------
  function setAng(a) {
    ang = a;
  }

  //----------------------------------------------------------------
  function paint() {
    const a = perlin.noise(this.px * 0.01, this.py * 0.01) * 16.0 + this.ang; // perlin global

    this.px += Math.cos(a) * this.speed;
    this.py += Math.sin(a) * this.speed;
    const gx = Math.floor(this.px / this.dotSize) * this.dotSize;
    const gy = Math.floor(this.py / this.dotSize) * this.dotSize + this.offsY;
    this.context.fillStyle = this.col;
    if (this.pat == 0) {
      context.fillRect(gx + 1, gy + 1, 1, 1); // rect seems faster than setting a pixel
    } else if (this.pat == 1) {
      this.context.fillRect(gx, gy, 1, 1);
      this.context.fillRect(gx + 2, gy + 2, 1, 1);
      this.context.fillRect(gx + 2, gy, 1, 1);
      this.context.fillRect(gx, gy + 2, 1, 1);
    } else if (this.pat == 2) {
      this.context.fillRect(gx + 1, gy, 1, 1);
      this.context.fillRect(gx + 2, gy + 1, 1, 1);
      this.context.fillRect(gx + 1, gy + 2, 1, 1);
      this.context.fillRect(gx, gy + 1, 1, 1);
    }

    if (this.px < 0 || this.px > WIDTH) this.kill();
  }

  //----------------------------------------------------------------
  function kill() {
    for (let i = 0; i < myList.length; i++) {
      if (myList[i] == this) {
        myList.splice(i, 1);
        break;
      }
    }
  }

  //----------------------------------------------------------------
  function clear() {
    this.context.clearRect(
      this.ox,
      this.oy + this.offsY,
      this.dotSize - 1,
      this.dotSize - 1,
    );
  }
}
