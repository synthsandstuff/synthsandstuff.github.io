var lifeTime = 0.7;
var strLength = 0.95;

var Ascii_Chars =[' ', '.', "'", '`', '^','"' , ',', ':', ';', '!', '>', '<', '~', '+', '_', '-', '?', ']', '[', '}', '{', ')', '(', '|', '\\', '/', '*', '#', '&', '8', '%' , '@', '$'];
var ascii_number = Ascii_Chars.length;

var grid = [];
var rows = 0;
var columns = 0;
var genFactor = 30;

var konamikeys = []
var rollkeys = []

document.addEventListener('keydown', function(event)
{
  if(event.defaultPrevented)
  {
    return;
  }
  switch(event.key)
  {
    case "ArrowUp":
      konamikeys.push(1);
      break;
    case "ArrowDown":
      konamikeys.push(2);
      break;
    case "ArrowLeft":
      konamikeys.push(3);
      break;
    case "ArrowRight":
      konamikeys.push(4);
      break;
    case "r":
      rollkeys.push('R');
      break;
    case "R":
      rollkeys.push('R');
      break;
    case "o":
      rollkeys.push('O');
      break;
    case "O":
      rollkeys.push('O');
      break;
    case "l":
      rollkeys.push('L');
      break;
    case "L":
      rollkeys.push('L');
      break;
    default:
      return;
  }
  if(rollkeys.length>4)
  {
    rollkeys.shift();
  }
  if(konamikeys.length>8)
  {
    konamikeys.shift();
  }
  if(rollkeys.length==4)
  {
    console.log(rollkeys);
    if(rollkeys[0]=="R" && rollkeys[1]=="O" && rollkeys[2]=="L" && rollkeys[3]=="L")
    {
      window.location.href = "https://youtu.be/dQw4w9WgXcQ";
    }
  }
  if(konamikeys.length==8)
  {
    var konami = 0;
    for(var i = 0; i < 8; i++)
    {
      if(konamikeys[i]==Math.floor(i/2)+1)
      {
        konami++;
      }
    }
    if(konami==8)
    {
      window.location.href = "./pages/gamingterminal.html"; //Change to be webbased gameboy emulator when done
    }
  }
});

function resizeGrid()
{
  var new_box = document.getElementsByClassName("foreground")[0];
  var new_rows = Math.round(new_box.clientHeight/6);
  var new_width = document.getElementsByTagName("nav")[0];
  var new_columns = Math.ceil(new_width.clientWidth/5);
  var new_genFactor = Math.round(new_columns*0.1);
  if(columns>new_columns)
  {
    for(var i = 0; i < rows; i++)
    {
      for(var j = 0; j < columns-new_columns; j++)
      {
        grid[i].pop();
        columns = columns - 1;
      }
    }
  }
  else if(new_columns>columns)
  {
    for(var i = 0; i < rows; i++)
    {
      for(var j = 0; j < new_columns-columns; j++)
      {
        grid[i].push(0);
        columns = columns + 1;
      }
    }
  }
  if(rows>new_rows)
  {
    for(var i = 0; i < rows-new_rows; i++)
    {
      grid.pop();
      rows = rows - 1;
    }
  }
  else if(new_rows>rows)
  {
    for(var i = 0; i < new_rows-rows; i++)
    {
      var new_row = [];
      for(var j = 0; j < new_columns; j++)
      {
        new_row.push(0);
        rows = rows + 1;
      }
      grid.push(new_row);
    }
  }
}

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

function drawFrame()
{
  var el = document.getElementsByClassName("background")[0];
  grid = flowLines(grid);
  el.textContent = convertAscii(grid);
  grid = createLines(grid);
}

function startMatrixRain()
{
  var box = document.getElementsByClassName("foreground")[0];
  var box2 = document.getElementsByTagName("nav")[0];
  console.log(box.clientHeight);
  console.log(box2.clientWidth);
  rows = Math.round(box.clientHeight/6);
  columns = Math.ceil(box2.clientWidth/5);
  console.log(rows);
  console.log(columns);
  grid = createGrid();
  setInterval(drawFrame,50);
}