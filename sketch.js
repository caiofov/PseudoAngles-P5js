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
    shuffleButton = new Button(240, 10, color(100,151,177), shuffleText, "shuffle");
    centralizeButton = new Button(370, 10, color(100,151,177), centralizeText, "centralize" )
  
    //definndo o array de botões
    buttons = [addButton, clearButton, shuffleButton, centralizeButton]
  
    //calculando o tamanho dos textos que aparecerão na tela
    scpWidth = textWidth(escapeText)
    scpWidth2 = textWidth(escapeText2)
    delWidth = textWidth(delText)
  
}
  
function mousePressed(){
    if(mouseButton === "left" && isDrawing){ //se apertar com o botao esquerdo e não tiver pausado
      
        if(points.length > 0 ){
        vectors.push(currentVector) //adiciona o vetor atual ao array de vetores
      }
      
      points.push(currentPoint)
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
      
      case(69): //embaralharar
      if(vectors.length > 1){
        shuffleVectors()
      }
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
  
    currentPoint = new Point(mousePosition(), color(1,31,75))

    resetMatrix()
    if(isDrawing){
      currentEscapeText = escapeText //texto da instrução do ESC, caso esteja desenhando
      currentDelTextY = scpWidth*13/12 + 20 //coord Y da instrução do DEL, caso esteja desenhando
      currentPoint.draw(-width/2, -height/2) //desenhar ponto atual (posição do mouse)
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
      currentVector = new Vector(
        new Point([width/2,height/2]), 
        currentPoint, 
        color(1,31,75)
        )
      currentVector.draw()
    }
    if(vectors.length > 1){
        // console.log(dotAngle(vectors[0],vectors[1]))
        // print(vectors[0].value)
    }
    
  }