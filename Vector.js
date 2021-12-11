class Vector{ //Classe para os vetores
    constructor(point1,point2, paint = color(0,0,0)){
    
      this.point1 = point1 //primeiro ponto (tipo Point)
      this.point2 = point2 //segundo ponto (tipo Point)
      
      //coordenadas dos pontos - para facilitar o acesso a esses valores
      this.x1 = point1.x
      this.y1 = point1.y
      this.x2 = point2.x
      this.y2 = point2.y
      
      this.paint = paint //cor do vetor
  
      //distancias de cada eixo entre um ponto e outro
      this.dy = this.y2 - this.y1
      this.dx = this.x2 - this.x1
  
      this.angular = (this.dy) / (this.dx) //coeficiente angular
      
      this.weight = 2 //largura da linha
  
      //valor escalar do vetor
      this.value = sqrt(
        pow((this.dx),2)+
        pow((this.dy),2)
        )
  
    }
    
    draw(){
      stroke(this.paint)
      fill(this.paint)
      
      
      if(this.isHover()){ //se o mouse estiver por cima
        //todo vetor possui o módulo que é mostrado apenas quando o mouse está por cima, para não poluir a tela
        let textModuleFontSize = 15 //tamanho da fonte
        let textModule = "Módulo: "+ nf(this.value, undefined, 2) //texto
        let widthTextModule = textWidth(textModule)*15/12 //largura do texto
        //posição do texto
        let textModuleY = ((this.y2 - this.y1)/2)+this.y1
        let textModuleX = ((this.x2 - this.x1)/2)+this.x1
  
        //Checa se o texto estará dentro do canvas. Caso conntrário, irá atualizar os valores da sua coordenada para que fique alocado.
        if(textModuleX + widthTextModule > cnvWidth){
          textModuleX -= (textModuleX + widthTextModule - cnvWidth)
        }
        if(textModuleY - textModuleFontSize < 0){
          textModuleY += textModuleFontSize
        }
  
        //agora, desenhar o texto
        textSize(textModuleFontSize)
        noFill()
        strokeWeight(1)
        text(textModule, textModuleX , textModuleY)
  
        //mudar os valores das cores qeu serão desenhados os vetores, já que o mouse está por cima
        stroke(255,165,0)
        fill(255,165,0)
    
      }
      //desenhar a linha do vetor
      strokeWeight(this.weight)
      arrow(this.point1, this.point2) //função externa à classe - não implementada por mim
      
    }
    
    isHover(){ //verifica se o mouse está por cima da linha do vetor
      let pos = mousePosition()
      let result = this.lineFunction(pos[0]) //calcula o valor de Y na reta para o X do mouse
      
      //descobrir os valores máximos e mínimos de cada eixo (qual ponto é maior e qual é menor)
      let maxX = ( this.x1 > this.x2 ? this.x1 : this.x2 )
      let minX = ( this.x1 > this.x2 ? this.x2 : this.x1 )
      let maxY = ( this.y1 > this.y2 ? this.y1 : this.y2 )
      let minY = ( this.y1 > this.y2 ? this.y2 : this.y1 )
  
      //verifica se está dentro, com certa margem para facilitar
      return  (result < pos[1] + this.weight+3 
        && result > pos[1] - this.weight - 3
        && pos[0] < maxX
        && pos[1] < maxY
        && pos[0] > minX
        && pos[1] > minY)
    }
  
    lineFunction(x){ //função da reta. Retorna um valor de Y para o X dado.
      return this.angular*x + this.linear()
    }
  
    setPoints(p1){ //atualiza os pontos do vetor, sem que ele perca sua identidade. Deve ser passado como parâmetro um objeto Point que será o primeiro ponto do vetor
      this.point1 = p1;
      this.x1 = this.point1.x
      this.y1 = this.point1.y
          
      this.setPoint2() //atualiza o ponto 2
    }
  
    setPoint2(){ //recalcula o ponto 2 com base no ponto 1, sem perder as propriedades do vetor
      //o novo ponto 2 deverá ter a mesma distância do ponto 1 que o antigo tinha
      this.x2 = this.x1 + this.dx
      this.y2 = this.y1 + this.dy
      this.point2 = new Point([this.x2,this.y2], color(1,31,75))
    }
  
    linear(){ //calcula o coeficiente linear
      return this.y1 - this.angular*this.x1
    }
  
    
    
  }
  
  // https://stackoverflow.com/questions/44874243/drawing-arrows-in-p5js
  function arrow( p1, p2 ){ //desenha uma linha com uma seta na ponta
    let x1 = p1.x
    let y1 = p1.y
    let x2 = p2.x
    let y2 = p2.y
  
    var angle = atan2(y2-y1,x2-x1);
    var  off  = 12
    var hoff  = off*0.6
    line(x1,y1, x2,y2)
    push()  
      translate(x2,y2);
      rotate(angle);
      triangle(0,0, -off, hoff, -off, -hoff);
    pop()
  }