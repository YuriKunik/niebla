let partis;
let z_inc = 1;
let tiempo = 0;

function setup() {
  createCanvas(1080, 1080);
  partis = new Sistema_particulas(width/2, height/2, 1000);
  background(20);
  stroke(225);
  fill(225);
}
function draw() {
  partis.actualizar(tiempo);
  partis.dibujar();
  tiempo += z_inc;
}