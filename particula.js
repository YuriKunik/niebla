// REGLAS

// La vida de una particula va entre 0 y 100
//

class Particula{
  constructor(x, y, vida=10000, masa=0.5, col = '#fff'){
    this.step = 1;
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y);
    let angulo = 2*PI*abs(
                        noise(
                          this.pos.x/100,
                          this.pos.y/100,
                          tiempo
                        )
                      );
    this.vel = p5.Vector.fromAngle(angulo);
    this.vel.mult(2)
    this.acc = createVector(0,0);
    this.vida = vida;
    this.vida_total = vida;
    this.masa = masa;
    this.col = color(col);
    this.pos_ants = []
    for(let i = 0; i< 10; i++){
      this.pos_ants.push(this.pos.copy());
    }
  } 
  
  get_vida(){
    return (this.vida > 0);
  }
  
  actualizar_vida(){
    this.vida = this.vida - this.step;
  }
  
  actualizar_color(){
    this.col.setAlpha(map(this.vida, 0, this.vida_total, 10, 0));
  }
  
  aplicar_fuerza(fuerza){
    this.acc.add(fuerza);
  }
  
  actualizar_pos(tiempo){
    this.pos_ants.splice(0,1)
    this.pos_ants.push(this.pos.copy());
    this.vel.add(this.acc);
    this.vel.limit(1);
    this.pos.add(this.vel);
    let angulo = 2*PI*
      noise(
        this.pos.x/100,
        this.pos.y/100,
        tiempo
      );
    this.acc = p5.Vector.fromAngle(angulo, 0.1);
  }
  
  actualizar_bordes(){
    if(this.pos.x < 0) {
      this.pos.set(width, this.pos.y);
      this.pos_ants = []
      for(let i = 0; i< 5; i++){
        this.pos_ants.push(this.pos.copy());
      }
    }
    if(this.pos.y < 0){
      this.pos.set(this.pos.x, height);
      this.pos_ants = []
      for(let i = 0; i< 5; i++){
        this.pos_ants.push(this.pos.copy());
      }
    }
    if(this.pos.x > width){
      this.pos.set(0, this.pos.x);
      this.pos_ants = []
      for(let i = 0; i< 5; i++){
        this.pos_ants.push(this.pos.copy());
      }
    }
    if(this.pos.y > height){
      this.pos.set(this.pos.x, 0);
      this.pos_ants = []
      for(let i = 0; i< 5; i++){
        this.pos_ants.push(this.pos.copy());
      }
    }
  }
  
  actualizar(tiempo){
    this.actualizar_vida()
    this.actualizar_color()
    this.actualizar_pos(tiempo)
    this.actualizar_bordes()
  }
  
  dibujar(){
    fill(this.col);
    stroke(this.col);
    for(let i = 0; i < this.pos_ants.length - 1; i++){
      line(
        this.pos_ants[i].x, 
        this.pos_ants[i].y, 
        this.pos_ants[i+1].x, 
        this.pos_ants[i+1].y
      );
    }
  }
}