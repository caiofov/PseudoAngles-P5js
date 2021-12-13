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

    //para testes
    vectors = [new Vector(new Point([0,0]), new Point([squareEdge/2,squareEdge/2]), color(1,31,75)), new Vector(new Point([0,0]), new Point([squareEdge/2,0], color(1,31,75)))]
    
    // points = [new Point([30,45], color(1,31,75))]
    // isDrawing = false
}
  
function mousePressed(){
    transformCanva()
    if(mouseButton === "left" && isDrawing){ //se apertar com o botao esquerdo e não tiver pausado
        vectors.push(currentVector) //adiciona o vetor atual ao array de vetores
        points.push(currentPoint) //adiciona o ponto atual no array de pontos
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
        if(points.length > 1){
          centralizePoints()
        }
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
    currentPoint = new Point([mouseX - translateX, translateY - mouseY], color(1,31,75))
    currentVector = new Vector(
        new Point([0,0]), 
        currentPoint, 
        color(1,31,75))

    if(isDrawing){
      currentEscapeText = escapeText //texto da instrução do ESC, caso esteja desenhando
      currentDelTextY = scpWidth*13/12 + 20 //coord Y da instrução do DEL, caso esteja desenhando
      
      currentPoint.draw() //desenhar ponto atual (posição do mouse)
    }
    else{
      currentEscapeText = escapeText2 //texto da instrução do ESC, caso não esteja desenhando
      currentDelTextY = scpWidth2*13/12 + 20 //coord Y da instrução do DEL, caso não esteja desenhando
    }
    
    stroke(1,31,75)
    noFill()
    strokeWeight(0.4)
    textSize(13)
    vectors.forEach(v =>{ //desenhando os vetores
      v.draw()
      let collisionPoint = pointVectorSquare(v)
      if (collisionPoint){collisionPoint.draw()}
    })
  
    points.forEach(p =>{ //desenhando os pontos
      p.draw()
    })
    
    // buttons.forEach(b=>{ //desenhando os botões
    //   b.draw()
    // })
    // //desenhar os textos
    // text(currentEscapeText, 10 , 55) //texto com instruçao para para/começar a desenhar
    // text(delText, currentDelTextY, 55) //texto com instrução para deletar um elemento
    
    
    //se tiver desenhando, deverá desenhar o vetor atual, o que acompanha o mouse, com origem no centro do plano cartesiano
    if(isDrawing){
      currentVector.draw()
    }

    //desenhar os textos
    resetMatrix()
    vectors.forEach(v =>{
        let x1 = v.point1.x + translateX
        let y1 = translateY - v.point1.y
        let x2 = v.point2.x + translateX
        let y2 = translateY - v.point2.y
        v.drawText(x1,y1,x2,y2)
    })
    
    points.forEach(p =>{
        p.drawText(p.x + translateX, translateY - p.y )
    })

}