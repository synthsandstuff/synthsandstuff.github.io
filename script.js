var box = document.querySelector(".foreground");

var rows = Math.round(box.clientHeight/6);
var columns = Math.round(box.clientWidth/5.95);

var genFactor = Math.round(columns*0.1);
var lifeTime = 0.7;
var strLength = 0.95;

var Ascii_Chars =[' ', '.', "'", '`', '^','"' , ',', ':', ';', '!', '>', '<', '~', '+', '_', '-', '?', ']', '[', '}', '{', ')', '(', '|', '\\', '/', '*', '#', '&', '8', '%' , '@', '$'];

var ascii_number = Ascii_Chars.length;

var grid = createGrid();

function boolArray(lengthReq)
{
  var boolArray = []
  for(var i = 0; i < lengthReq; i++)
  {
    boolArray.push(true);
  }
  return boolArray;
}

function createGrid()
{
  var grid = []
  for(var i = 0; i < rows; i++)
  {
    var column = []
    for(var j = 0; j < columns; j++)
    {
      column.push(0);
    }
    grid.push(column)
  }
  return grid;
}

function createLines(grid)
{
  for(var i = 0; i < Math.floor(Math.random()*genFactor); i++)
  {
    grid[0][Math.floor(Math.random()*rows)] = Math.floor(Math.random()*ascii_number);
  }
  return grid
}

function convertAscii(grid)
{
  var asciiGrid = "";
  for(var i = 0; i < rows; i++)
  {
    for(var j = 0; j < columns; j++)
    {
      asciiGrid += Ascii_Chars[grid[i][j]];
    }
    asciiGrid += "\n";
  }
  return asciiGrid;
}

function flowLines(grid)
{
  var firstInCol = boolArray(columns);
  for(var i = rows-1; i > 0; i--)
  {
    for(var j = 0; j < columns; j++)
    {
      if(i-1>=0)
      {
        if(grid[i-1][j] !== 0 && firstInCol[j])
        {
          grid[i-1][j] = Math.floor(lifeTime*grid[i-1][j])
          firstInCol[j] = false;
        }
        if(grid[i-1][j] === 0 && !firstInCol[j])
        {
          firstInCol[j] = true;
        }
        grid[i][j] = grid[i-1][j];
        grid[i-1][j] = Math.floor(strLength*grid[i-i][j]);
      }
    }
  }
  return grid;
}

var id = setInterval(drawFrame,50);

function drawFrame()
{
  var el = document.getElementsByClassName('background')[0];
  grid = flowLines(grid);
  el.textContent = convertAscii(grid);
  grid = createLines(grid);
}