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
      this.collisionPoint = pointVectorSquare(this)
  
    }
    
    draw(drawArrow = false){
      stroke(this.paint)
      fill(this.paint)
      
      
      if(this.isHover()){ //se o mouse estiver por cima
        //mudar os valores das cores qeu serão desenhados os vetores, já que o mouse está por cima
        stroke(255,165,0)
        fill(255,165,0)
    
      }
      //desenhar a linha do vetor
      strokeWeight(this.weight)
      if(drawArrow){ //se pedir para desenhar a seta
        arrow(this.point1, this.point2) //função externa à classe - não implementada por mim
      }
      else{ //caso contrario, desenha apenas a linha normal
        line(this.point1.x, this.point1.y, this.point2.x, this.point2.y)
        this.point2.draw()
      }
      
    }

    drawText(){

      stroke(this.paint)
      fill(this.paint)
      let x1 = this.point1.x + translateX
      let y1 = translateY - this.point1.y
      let x2 = this.point2.x + translateX
      let y2 = translateY - this.point2.y
      
      if(this.isHover()){ //se o mouse estiver por cima
        //todo vetor possui o módulo que é mostrado apenas quando o mouse está por cima, para não poluir a tela
        let textModuleFontSize = 12 //tamanho da fonte
        let textModule = "|v| = "+ nf(this.value, undefined, 2) //texto
        let widthTextModule = textWidth(textModule) //largura do texto
        
        //posição do texto
        let textModuleY = ((y2 - y1)/2)+y1
        let textModuleX = ((x2 - x1)/2)+x1
  
        //Checa se o texto estará dentro do canvas. Caso conntrário, irá atualizar os valores da sua coordenada para que fique alocado.
        if(textModuleX + widthTextModule > width){
          textModuleX -= (textModuleX + widthTextModule - width)
        }
        else if(textModuleY - textModuleFontSize < 0){
          textModuleY += textModuleFontSize
        }
  
        //agora, desenhar o texto
        textSize(textModuleFontSize)
        strokeWeight(0.4)
        text(textModule, textModuleX , textModuleY)
    
      }
      
    }
    
    isHover(){ //verifica se o mouse está por cima da linha do vetor
      let pos = mousePosition()
      let x = pos[0] - width/2
      let y = height/2 - pos[1] 
      let result = this.lineFunction(x) //calcula o valor de Y na reta para o X do mouse
    
      //descobrir os valores máximos e mínimos de cada eixo (qual ponto é maior e qual é menor)
      let maxX = ( this.x1 > this.x2 ? this.x1 : this.x2 )
      let minX = ( this.x1 > this.x2 ? this.x2 : this.x1 )
      let maxY = ( this.y1 > this.y2 ? this.y1 : this.y2 )
      let minY = ( this.y1 > this.y2 ? this.y2 : this.y1 )

      //verifica se está dentro, com certa margem para facilitar
      return  (result < y + this.weight+3 
        && result > y - this.weight - 3
        && x < maxX
        && y < maxY
        && x > minX
        && y > minY)
    }
  
    lineFunction(x){ //função da reta. Retorna um valor de Y para o X dado.
      return this.angular*x + this.linear()
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
    var  off  = 5
    var hoff  = off*0.6
    line(x1,y1, x2,y2)
    push()  
      translate(x2,y2);
      rotate(angle);
      triangle(0,0, -off, hoff, -off, -hoff);
    pop()
  }