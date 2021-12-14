var vectors = [] //array de vetores
var angles = []
var currentVector; //vetor atual (o que muda com o mouse)
var currentPoint;
var isDrawing = true; //diz se está "pausado" ou não

//textos dos botoes
var addText = '[S] Somar '
var clearText = '[C] Limpar tudo'

//textos na tela
var escapeText = '[ESC] - Parar de desenhar'
var escapeText2 = '[ESC] - Voltar a desenhar'
var delText = '[DEL] - Remover elemento'

var addButton, clearButton, backgroundColor, scpWidth;
var buttons = [];

//transformar canva
var translateX, translateY

//medidas do quadrado no plano cartesiano e da circunferencia
squareEdge = 400;

function transformCanva(){
    // transformações para o sistema Y para cima e origem no centro da tela  
    translate( translateX, translateY)
    scale( 1, -1 )
}

function deleteElement(){ //deleta elemento que o mouse está por cima -> só é chamada quando a tecla DEL é pressionada

    vectors.forEach( v =>{ //verifica se está por cima de um vetor
      if(v.isHover()){
        vectors.splice(vectors.indexOf(v),1) //tira o vetor da lista de vetores. Então, automaticamente, ele não será mais desenhado
        return;
      }
    })
    recalculateAngles()
}
  
function mousePosition(){ //quando chamada, retorna a posição do mouse
    let x = mouseX
    let y = mouseY

    //verificando os limites do canvas -> se passar do limite, será considerado como se fosse o próprio limite

    //limite para o eixo X (largura)
    if(x > width){x = width}
    else if(x<0){x = 0}

    //limite para o eixo Y (altura)
    if(y > height){ y = height }
    else if(y < 0){ y = 0}

    return [x, y]
}


function clearAll(){ //remove todos os pontos e todos os vetores
  vectors = []
  angles = []
}


function checkCanvasBounds(){ //verifica se os todos os pontos estão dentro dos pontos
  let i = 0
  
  while(i < vectors.length - 1){
    let changed = false
    let firstPoint = vectors[0].point1
    let p = vectors[i].point2
    
    //verifica se o ponto atual do loop fica forá do canvas de alguma forma
    //modifica o primeiro ponto do primeiro vetor e depois atualiza todos os outros baseados nessa mudança
    if (p.x > width){ 
      firstPoint.setX(firstPoint.x - (p.x - width)) //mover mais para a esquerda o primeiro ponto
      changed = true
    }
    else if(p.x < 0){
      firstPoint.setX(firstPoint.x - p.x) //mover mais para a direita o primeiro ponto
      changed = true
    }

    if(p.y > height){
      firstPoint.setY(firstPoint.y - (p.y - height)) //mover mais para a cima o primeiro ponto
      changed = true
    }
    else if (p.y < 0){
      firstPoint.setY(firstPoint.y - p.y) //mover mais para a baixo o primeiro ponto
      changed = true 
    }
    
    if(changed){ //se tiver alterado algo
      vectors[0].setPoints(firstPoint) //atualiza os pontos do primeiro vetor
      updatePointSequence() //atualiza a sequencia de pontos (e vetores)
    }
    i++
  }
}


function dotAngle(u, v){ //recebe dois vetores e calcula o angulo entre eles
    let d = dot(u.point2, v.point2) //produto escalar
    let nu = u.value //modulo de u
    let nv = v.value //modulo de v
    if(nu*nv == 0){
      return 0
    }
    let c = d / (nu*nv) //cosseno

    return acos(c)*180/PI //retorna o angulo - transformação de cosseno para angulo em graus
}
function crossAngle(u, v){ 
    let d = cross(u.point2, v.point2)
    let nu = u.value //comprimento de u
    let nv = v.value //comprimento de v
    if(nu*nv == 0){
      return 0
    }
    let c = d / (nu*nv) //seno
    
    return asin(c)*180/PI; //retorna o angulo - transformação de cosseno para angulo em graus
}

function dot(u, v){ //produto escalar u.v
  return u.x*v.x + u.y*v.y; 
}
function cross(u,v){ //produto vetorial
  return u.x*v.y - v.x*u.y;
}

function pointVectorSquare(vector){ //calcula o ponto em que o vetor irá colidir com o quadrado no plano cartesiano
  let v = vector.point2
  //indicadores se as coordenadas são maiores ou menores que zero -> apoio para as operações
  let absX = v.x > 0 ? 1 : -1
  let absY = v.y > 0 ? 1 : -1
  
  if(v.x == 0 && v.y == 0){ //vetor nulo
    return null
  }

  else if(v.x == 0 && v.y != 0){ //eixo x
    p = new Point([0,absY*squareEdge/2], color(255,255,255))
  }
  else if (v.y == 0 && v.x !=0){ //eixo y
    p = new Point([absX*squareEdge/2,0], color(255,255,255))
  }
  else if(absX*v.x > absY*v.y){ //1o, 4o ,5o e 8o octante
    if(v.x > 0){//primeiro e oitavo octante
      var y = squareEdge/2*(v.y/v.x)
    }
    else if (v.x < 0){ //quarto e quinto octante
      var y = -squareEdge/2*(v.y/v.x)
    }
    p = new Point([absX*squareEdge/2,y], color(255,255,255))
  }
  else if(absX*v.x < absY*v.y){
    
    if(v.y > 0){ //segundo e terceiro octante
      var x = (squareEdge/2)*(v.x/v.y)
    }
    else if (v.y < 0){ //sexto e sétimo octante
      var x = -(squareEdge/2)*(v.x/v.y)
    }
    p = new Point([x, absY*squareEdge/2], color(255,255,255))
  }
  else if (v.x==v.y){
    p = new Point([absX*squareEdge/2, absY*squareEdge/2], color(255,255,255))
  }
  
  p.radius = 4
  return p;
}

function pseudoAngleCos(vec1, vec2){ //calcular pseudoangulo
  return 1 - dot(vec1.point2, vec2.point2)/(vec1.value * vec2.value)
}

function angleFromOrigin(v){
  //vetor da origem para calcular o angulo
  var originVector = new Vector(
    new Point([0,0], color(1,31,75)), 
    new Point([squareEdge/2 + 20,0], color(1,31,75)), 
    color(1,31,75),
    0
  )

  var angle;
  if(v.point2.y < 0 && v.point2.x < 0){
    angle = (-crossAngle(originVector, v)+180)*PI/180
  }
  else if(v.point2.y < 0 && v.point2.x > 0){
    angle = (360 - dotAngle(originVector, v))*PI/180
  }
  else{
    angle = dotAngle(originVector, v)*PI/180
  }

  return new Angle(30,30, 0, angle,color(250,250,250), originVector, v)
}

function recalculateAngles(){ //recalcula os angulos entre os vetores
  angles = []
  if(vectors.length > 0){
    angles.push(vectors[0].angleFromOrigin)
  }
  if (vectors.length > 1){

    for(let i = 1; i < vectors.length; i++){
      vectors[i].angleFromOrigin.w = 50
      vectors[i].angleFromOrigin.h = 50
      angles.push(vectors[i].angleFromOrigin)
      
      //arco entre os vetores mais proximos
      let ang = crossAngle(vectors[i-1], vectors[i])*PI/180
      ang = ang > 0 ? ang : dotAngle(vectors[i-1], vectors[i])*PI/180
      var angle = vectors[i-1].angleFromOrigin.end + 
      angles.push(new Angle(70, 70, vectors[i-1].angleFromOrigin.end, angle, color(250,250,250), vectors[i-1], vectors[i]))
    }
  }

  angles.sort(function(a1,a2){ //ordenando o vetor de angulos por tamanho do arco
    if(a1.w > a2.w){
      return 1
    }
    else if (a1.w < a2.w){
      return -1
    }
    return 0
  })
}