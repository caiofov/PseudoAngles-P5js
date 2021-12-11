class Point{ //Classe para os pontos que formam os vetores
    constructor(pos, color){
        //posição
        this.pos = pos //array [x,y]
        this.x = pos[0]
        this.y = pos[1]

        this.radius = 8 //raio do ponto
        this.color = color //cor
    }

    draw(){ //desenha o ponto - deve ser chamada na função de desenho do P5.js
        //todo ponto possui um label que indica sua coordenada
        let buttonText = "x: " + nf(this.x,undefined, 2) + " y: " + nf(this.y, undefined, 2) //texto do label
        let buttonTextFontSize = 15 //tamanho da fonte
        let widthButtonText = textWidth(buttonText) * buttonTextFontSize/14 //largura do texto
        //posição do texto
        let buttonTextX = this.x 
        let buttonTextY = this.y - this.radius
        
        fill(this.color)
        stroke(this.color)
        strokeWeight(0.5)
        textSize(buttonTextFontSize)
        
        if(this.isHover()){ //se o mouse estiver por cima, irá mudar de cor
            fill(255,165,0)
        }
        
        circle(this.x,this.y,this.radius) //desenho do ponto

        //agora, verificaremos se o label passará das extremidades do nosso canvas. Se isso acontecer, sua posição será recalculada
        if(buttonTextX + widthButtonText > cnvWidth){
            buttonTextX -= (buttonTextX + widthButtonText) - cnvWidth
        }
        if(buttonTextY - buttonTextFontSize < 0){
            buttonTextY += buttonTextFontSize
        }

        text(buttonText, buttonTextX, buttonTextY) //desenha o label
    }

    isHover(){ //verifica se o mouse está por cima
        let x = mousePosition()[0]
        let y = mousePosition()[1]
        
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