class Point{ //Classe para os pontos que formam os vetores
    constructor(pos, color){
        //posição
        this.pos = pos //array [x,y]
        this.x = pos[0]
        this.y = pos[1]

        this.radius = 6 //raio do ponto
        this.color = color //cor
    }

    draw(){ //desenha o ponto - deve ser chamada na função de desenho do P5.js
        fill(this.color)
        stroke(this.color)
        strokeWeight(0.5)

        if(this.isHover()){ //se o mouse estiver por cima, irá mudar de cor
            fill(255,165,0)
        }
        
        circle(this.x,this.y,this.radius) //desenho do ponto
    }

    drawText(){
        //todo ponto possui um label que indica sua coordenada
        let pointText = "x: " + nf(this.x,undefined, 2) + " y: " + nf(this.y, undefined, 2) //texto do label
        let pointTextFontSize = 12 //tamanho da fonte
        let widthpointText = textWidth(pointText) //largura do texto
        //posição do texto
        let pointTextX = this.x + translateX
        let pointTextY = translateY - this.y
        
        fill(this.color)
        stroke(this.color)
        strokeWeight(0.5)
        textSize(pointTextFontSize)
        
        if(this.isHover()){ //se o mouse estiver por cima, irá mudar de cor
            fill(255,165,0)
        }

        resetMatrix()
        
        //agora, verificaremos se o label passará das extremidades do nosso canvas. Se isso acontecer, sua posição será recalculada
        if(pointTextX + widthpointText > width){
            pointTextX -= (pointTextX + widthpointText) - width
        }
        if(pointTextY - pointTextFontSize < 0){
            pointTextY += pointTextFontSize
        }
        text(pointText, pointTextX, pointTextY) //desenha o label
    }

    isHover(){ //verifica se o mouse está por cima
        let pos = mousePosition()
        let x = pos[0] - translateX
        let y = translateY - pos[1] 
        
        return (x > this.x - this.radius 
            && x < this.x + this.radius 
            && y > this.y - this.radius 
            && y < this.y + this.radius)
    }

    setX(x){ //atualiza a coordenada X
        this.x = x
        this.pos = [this.x,this.y]
    }
    setY(y){ //atualiza a coordenada Y
        this.y = y
        this.pos = [this.x,this.y]
    }
}