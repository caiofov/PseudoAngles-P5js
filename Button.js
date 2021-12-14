class Button{ //Classe para os botões de ação.
    constructor(x,y, color,text, action, margin = 6, fontSize = 12){
      //posição
      this.x = x
      this.y = y
      
      //dimensões
      this.width = textWidth(text) * fontSize/12 + margin*2
      this.height = fontSize + margin*2
      
      //cor e o que vai ser escrito
      this.color = color
      this.text = text
      
      
      this.margin = margin; //margem do texto para a borda do botão
      this.fontSize = fontSize; //tamanho da fonte
      this.action = action; //o que o botão irá realizar
    }
  
    draw(){ //desenha os botões na tela - deve ser chamada na função de desenhar do P5.js
      fill(this.color)
      stroke(this.color)
      
      if(this.isHover()){ //se o mouse tiver por cima do botão, a cor será outra
        fill(0,91,150)
        stroke(0,91,150)
      }
      rect(this.x,this.y,this.width,this.height) //um retângulo que será o botão
      
      fill(255)
      stroke(255)
      textSize(this.fontSize)
      text(this.text, this.x + this.margin, this.y + this.margin/2 + this.fontSize) //texto do botão
    }
  
    onClick(){ //executa a ação do botão -> deve ser chamada ao botão ser acionado
      switch(this.action){ //para cada tipo de ação do botão, será chamada uma função
        case "add": //soma - gera o vetor soma
          sum()
          break

        case "clear": //deleta todos os pontos e vetores
          clearAll()
          break

        case "shuffle": //embaralha os vetores
          if(vectors.length > 1){ //checa se há mais de um vetor para embaralhar
            shuffleVectors()
          }
            break

        case "centralize": //centraliza os pontos
          if(points.length > 1){ //verifica se há mais de um ponto para centralizar
            centralizePoints()
          }
        
        default: //se não for nenhuma das opções acima, deverá ter sido passada uma função como atributo
          this.action()
          break
      }
    }

    isHover(){ //verifica se o mouse está em cima do elemento
        let pos = mousePosition()
        return (pos[0] < this.x + this.width 
            && pos[0] > this.x
            && pos[1] < this.y + this.height 
            && pos[1] > this.y)
    }
  
  }