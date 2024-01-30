class Sistema_particulas{
  constructor(x, y, n_particulas){
    this.x = x;
    this.y = y;
    this.n_particulas = n_particulas;
    this.particulas = [];
    this.r_nacimiento = width/2;
    for(let i = 0; i<n_particulas; i++){
      this.crear_particula()
    }
  }
  
  actualizar(tiempo){
    this.actualizar_particulas(tiempo);
    this.actualizar_muertas();
    this.actualizar_vivas();
  }
  
  actualizar_particulas(tiempo){
    for(let i = 0; i < this.particulas.length; i++){
      this.particulas[i].actualizar(tiempo);
    }
  }
  
  actualizar_muertas(){
    for(let i = 0; i < this.particulas.length; i++){
      if(! this.particulas[i].get_vida()){
        this.particulas.splice(i, 1);
        i=i-1
      }
    }
  }
  
  crear_particula(){
      let off_x = random(-this.r_nacimiento, this.r_nacimiento);
      let off_y = random(-this.r_nacimiento, this.r_nacimiento);
      let vida = random(50, 500);
      this.particulas.push(new Particula(this.x+off_x, this.y+off_y, vida));
  }
  
  actualizar_vivas(){
    for(let i = 0; i < this.n_particulas - this.particulas.length; i++){
      this.crear_particula();
    }
  }
  
  dibujar(){
    for(let i = 0; i < this.particulas.length; i++){
      this.particulas[i].dibujar();
    }
  }
  
}