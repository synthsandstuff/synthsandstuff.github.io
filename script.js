const Ascii_Chars = [' ', '.', '~', '^', '+', '=', ':', ';', '/', '0', '&', '#'];

var box = document.querySelector("body");
let height = box.clientHeight;
let width = box.clientWidth;

console.log(width);

function random3DUnitVector()
{
    let theta = Math.random() * 2 * Math.PI;
    let phi = (Math.random() * Math.PI) - 1;
    return {x: Math.cos(theta)*Math.cos(phi), 
            y: Math.cos(theta)*Math.sin(phi),
            z: Math.sin(theta)};
}

function generate3DPerlin()
{
    return
}