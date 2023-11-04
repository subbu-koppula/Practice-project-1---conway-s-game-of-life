let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let cellArr = [];
let gridSize = 20;

function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = '#808080'; // Set line color
  ctx.beginPath(); // Begin drawing path
  ctx.moveTo(x1, y1); // Move to the starting point
  ctx.lineTo(x2, y2); // Draw a line to the ending point
  ctx.stroke(); // Stroke the line with the walker's color
}

function drawGrid(x1, y1, x2, y2) {
    //Draw parallel horizontal lines, with 10 pixels gap.
  for (let i = 0; y1 + (i * gridSize) <= y2; i++) {
    drawLine(x1, y1+ (i * gridSize), x2, y1+ (i * gridSize));
  }
  //Draw parallel vartical lines, with 10 pixels gap.     
  for (let i = 0; x1 + (i * gridSize) <= x2; i++) {
    drawLine(x1+(i * gridSize), y1, x1 + (i * gridSize), y2);
  }
}
drawGrid(0, 0, canvas.width, canvas.height);

// creating an array that imitates the grid, with all cells set to false.
for(let i = 0; i < canvas.width/gridSize; i++){
  cellArr[i] = [];
  for(let j = 0; j < canvas.height/gridSize; j++){
    cellArr[i][j] = false;
  }
}

console.log(cellArr); 

//A function that takes an array and draws cells on grid based that data.
function drawCellByArray(x){
  ctx.beginPath();
  for(let i = 0; i < x.length; i++){
    // ctx.rect(x[i][0]*gridSize, x[i][1]*gridSize, gridSize, gridSize);
    // ctx.rect(x[i][0]*gridSize, x[i][1]*gridSize, gridSize, gridSize);
    for(let j = 0; j < x[i].length; j++){
      if(x[i][j]){
        ctx.rect(i*gridSize, j*gridSize, gridSize, gridSize);
      }
    }
  }
  ctx.fillStyle = '#228C22';
  ctx.fill();
  ctx.closePath();
}

function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  let x = Math.floor((event.clientX - rect.left) / gridSize);//The problem is with the grid size. I copied it from chatGPT, but i didn't define gridsize, so there is a problem
  let y = Math.floor((event.clientY - rect.top) / gridSize);// Here. I should change something. 
  console.log(x, y);
  return {x, y};
}

// canvas.addEventListener('click', function(event) {
//     const { x, y } = getMousePos(event);
//     cellArr[x][y] = !cellArr[x][y];
//     drawCellByArray(cellArr);
// });


//A function that draws a cell by taking it's coordinates. 
function drawCellById(x, y){
  ctx.beginPath();
  ctx.rect((x*gridSize)+1, (y*gridSize)+1, gridSize-2, gridSize-2); 
  ctx.fillStyle = '#228C22';
  ctx.fill();
  ctx.closePath();
}

//A function that removes a cell by taking it's coordinates.
function removeCellById(x, y){
  ctx.clearRect((x*gridSize)+1, (y*gridSize)+1, gridSize-2, gridSize-2);
}

canvas.addEventListener('click', function(event) {
    const { x, y } = getMousePos(event);
    cellArr[x][y] = !cellArr[x][y];
    if(cellArr[x][y]){
      drawCellById(x, y);
    }
    else{
      removeCellById(x, y);
    }
});