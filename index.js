let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let cellArr = [];
let gridSize = 10;

function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = '#808080'; // Set line color
  ctx.beginPath(); // Begin drawing path
  ctx.moveTo(x1, y1); // Move to the starting point
  ctx.lineTo(x2, y2); // Draw a line to the ending point
  ctx.stroke(); // Stroke the line with the walker's color
}

function drawGrid(x1, y1, x2, y2) {
    //Draw parallel horizontal lines, with 10 pixels gap.
  for (let i = 0; y1 + (i * 10) <= y2; i++) {
    drawLine(x1, y1+ (i * 10), x2, y1+ (i * 10));
  }
  //Draw parallel vartical lines, with 10 pixels gap.     
  for (let i = 0; x1 + (i * 10) <= x2; i++) {
    drawLine(x1+(i * 10), y1, x1 + (i * 10), y2);
  }
}
drawGrid(0, 0, 1000, 800);

function drawCell(x){

  ctx.beginPath();
  for(let i = 0; i < x.length; i++){
    ctx.rect(x[i][0]*10, x[i][1]*10, 10, 10);
    ctx.rect(x[i][0]*10, x[i][1]*10, 10, 10);
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

canvas.addEventListener('click', function(event) {
    const { x, y } = getMousePos(event);
    cellArr.push([x,y]);
    drawCell(cellArr);
});



  
  
  
  

