function drawBackground() //desenha o plano cartesiano e muda a orientação da tela
{
  background(backgroundColor);
  
  // eixo horizontal
  stroke(128,0,0)
  fill(128,0,0)
  line(0, height/2,  width, height/2)
  beginShape();
    vertex( width-10, height/2+2);
    vertex( width   , height/2  );
    vertex( width-10, height/2-2);  
  endShape(CLOSE);
  
  // vertical
  stroke(0,128,0)
  fill(0,128,0)
  line( width/2, 0,  width/2, height)
  beginShape();
    vertex( width/2+2, 10);
    vertex( width/2  ,  0);
    vertex( width/2-2, 10);  
  endShape(CLOSE);
  
  // restaurar a "paleta original"
  stroke(0)
  fill(180)
  
  transformCanva()
}
function setup(){
    createCanvas(550, 500);
    
    backgroundColor = color(179,205,224)
    
    //criando os botões
    clearButton = new Button(width - 100, height - 28, color(100,151,177), clearText, "clear");
  
    //definindo o array de botões
    buttons = [clearButton]
  
    //calculando o tamanho dos textos que aparecerão na tela
    scpWidth = textWidth(escapeText)
    scpWidth2 = textWidth(escapeText2)
    delWidth = textWidth(delText)

    //variaveis para transformar o canva
    translateX = width/2
    translateY = height/2

}
  
function mousePressed(){
    transformCanva()
    if(mouseButton === "left" && isDrawing){ //se apertar com o botao esquerdo e não tiver pausado  
      vectors.push(currentVector) //adiciona o vetor atual ao array de vetores

      if(vectors.length > 2){
        vectors.splice(vectors[0],1)
      }
      angle = recalculateAngles()
    }
    
    else if(mouseButton === "left" && !(isDrawing)){ //se não tiver desenhando e acionar o mouse
      buttons.forEach( b=> { //verifica se clicou em algum botão e, então realizar sua ação
        if(b.isHover()){
          b.onClick()
        }
        return
      })
    }
    
}
  
function keyPressed(){
    switch(keyCode){
        
      case(27): //"pausar"
        isDrawing = !(isDrawing)
        break
      
      case(67): //limpar
        clearAll()
        break
  
      default:
        break
    }
  }

  function draw() {
    drawBackground()
    let currentEscapeText, currentDelTextY;
  
    noFill()
    rect(-squareEdge/2,-squareEdge/2, squareEdge )
    circle(0,0, squareEdge)
    currentPoint = new Point([mouseX - translateX, translateY - mouseY], color(1,31,75))
    currentVector = new Vector(
        new Point([0,0]), 
        currentPoint, 
        color(1,31,75))

    if(isDrawing){
      currentEscapeText = escapeText //texto da instrução do ESC, caso esteja desenhando
      currentDelTextY = scpWidth*13/12 + 20 //coord Y da instrução do DEL, caso esteja desenhando
      
      currentPoint.draw() //desenhar ponto atual (posição do mouse)
      currentVector.draw()
      currentVector.collisionPoint.draw()
    }
    else{
      currentEscapeText = escapeText2 //texto da instrução do ESC, caso não esteja desenhando
      currentDelTextY = scpWidth2*13/12 + 20 //coord Y da instrução do DEL, caso não esteja desenhando
    }

    // angles.forEach( a =>{
    //   a.draw()
    // })
    
    // if(vectors.length > 1){
    //   angles[angles.length - 1].drawText()      
    // }
    if(angle){
      angle.draw()
      angle.drawText()
    }
    
    
    vectors.forEach(v =>{ //desenhando os vetores
      v.draw(true)
      v.collisionPoint.draw()

      noFill()
      stroke(1,31,75)
      strokeWeight(1)
    })
    
    
    resetMatrix()
    buttons.forEach(b=>{ //desenhando os botões
      b.draw()
    })
    //desenhar os textos
    textSize(10)
    text(currentEscapeText, 10 , height - 5) //texto com instruçao para para/começar a desenhar
    text(delText, 150, height - 5) //texto com instrução para deletar um elemento
    
    
    //desenhar os textos
    
    vectors.forEach(v =>{
        v.drawText()
        v.point2.drawText()

        if(v.collisionPoint.isHover()){
          v.collisionPoint.drawText()
        }
    })
    currentVector.point2.drawText()
    

}