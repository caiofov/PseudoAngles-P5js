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
    addButton = new Button(10, 10, color(100,151,177), addText, "add");
    clearButton = new Button(110, 10, color(100,151,177), clearText, "clear");
  
    //definindo o array de botões
    buttons = [addButton, clearButton]
  
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
      
      case(83): //somar
        sum()
        break
        
      case(27): //"pausar"
        isDrawing = !(isDrawing)
        break
      
      case(67): //limpar
        clearAll()
        break
      
      case(69):
        break
      
      case(46): //apagar um elemento
        deleteElement()
        break
  
      case(65): //centralizar pontos
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

    var count = 0
    
    vectors.forEach(v =>{ //desenhando os vetores
      v.draw(true)
      v.collisionPoint.draw()

      noFill()
      stroke(1,31,75)
      strokeWeight(1)
      //arco do vetor à origem
      arc(0,0, 70+count, 70+count, 0, angleFromOrigin(v) )
      count+=15
    })

    //desenhar arcos de angulos
    noFill()
    stroke(255,255,255)
    strokeWeight(1)
    
    if (vectors.length > 1){
      var lastAngle = angleFromOrigin(vectors[0])
      for(let i = 1; i < vectors.length; i++){
        //arco entre os vetores mais proximos
        var angle = lastAngle + dotAngle(vectors[i-1], vectors[i])*PI/180 
        arc(0, 0, 60, 60, lastAngle, angle);
        lastAngle = angle
      }
    }
    
    
    // buttons.forEach(b=>{ //desenhando os botões
    //   b.draw()
    // })
    // //desenhar os textos
    // text(currentEscapeText, 10 , 55) //texto com instruçao para para/começar a desenhar
    // text(delText, currentDelTextY, 55) //texto com instrução para deletar um elemento
    
    
    //desenhar os textos
    resetMatrix()
    vectors.forEach(v =>{
        v.drawText()
        v.point2.drawText()

        if(v.collisionPoint.isHover()){
          v.collisionPoint.drawText()
        }
    })
    currentVector.point2.drawText()
    

}