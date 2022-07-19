const Ascii_Chars = [' ', '.', '~', '^', '+', '=', ':', ';', '/', '0', '&', '#'];

var box = document.querySelector(".foreground");
let height = box.clientHeight;
let width = box.clientWidth;

function random3DUnitVector()
{
    let theta = Math.random() * 2 * Math.PI;
    let phi = (Math.random() * Math.PI) - 1;
    return {x: Math.cos(theta)*Math.cos(phi), 
            y: Math.cos(theta)*Math.sin(phi),
            z: Math.sin(theta)};
}

function generate3DUnitVectorArray()
{
    let vectorUnitArray = [];
    let heightinChars = Math.floor(height/6);
    for(let k = 0; k < 60; k++)
    {
        let grid = [];
        for(let j = 0; j < heightinChars; j++)
        {
            let row = [];
            for(let i = 0; i < 300; i++)
            {
                row.push(random3DUnitVector());
            }
            grid.push(row);
        }
        vectorUnitArray.push(grid);
    }
    return vectorUnitArray;
}

function generatePerlinNoise(x,y)
{
    var x0 = Math.floor(x);
    var x1 = x0 + 1;
    var y0 = Math.floor(y);
    var y1 = y0 + 1; 

    var sx = x - x0;
    var sy = y - y0;
}

function dot_prod_grid(x, y, vert_x, vert_y){
    var g_vect = gradients[vert_y][vert_x];
    var d_vect = {x: x - vert_x, y: y - vert_y};
    return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
}

function lin_interp(x, a, b){
    return a + x * (b-a);
}