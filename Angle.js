class Angle{
    constructor(w,h,start,end, v1, v2){
        this.x = 0
        this.y = 0
        this.w = w
        this.h = h
        this.start = start //graus
        this.end = end //graus
        this.v1 = v1
        this.v2 = v2
    }

    draw(){
        stroke(255,255,255)
        arc(this.x,this.y,this.w,this.h,this.start,this.end)
    }

    isHover(){
        let x = mouseX - translateX
        let y = translateY - mouseY
        let mouseVec = new Vector(
            new Point([0,0], color(1,31,75)), 
            new Point([x,y], color(1,31,75)), 
            color(1,31,75)
        )
        let mouseAngle = angleFromOrigin(mouseVec)

        return (
                (x <= this.w/2)&&
                (x >= -this.w/2) &&
                (y <= this.h/2)&&
                (y >= -this.h/2) &&
                (
                    (mouseAngle.end >= this.start) &&
                    (mouseAngle.end <= this.end)
                ) ||
                (
                    (mouseAngle.end <= this.start) &&
                    (mouseAngle.end >= this.end)
                )

        )
    }
    drawText(){
        resetMatrix()
        stroke(0,0,0)
        fill(0,0,0)
        //calculando o angulo do quadrado
        let squareX = ((this.v2.collisionPoint.x) - (this.v1.collisionPoint.x))
        let squareY = ((this.v2.collisionPoint.y) - (this.v1.collisionPoint.y))

        let valueX = squareX/(squareEdge/2)
        let valueY = squareY/(squareEdge/2)
        let square = Math.abs(valueX)+Math.abs(valueY)


        let escalarAngle = dotAngle(this.v1,this.v2)
        let vectorialAngle = crossAngle(this.v1,this.v2)
        let cosAngle = pseudoAngleCos(this.v1,this.v2)

        let textSquare = "Quadrado: "+nf(square, undefined, 2)
        let textEsc = "Escalar: "+nf(escalarAngle, undefined, 2)
        let textVect = "Vetorial: "+nf(vectorialAngle, undefined, 2)
        let textCos = "Cosseno: "+nf(cosAngle, undefined, 2)

        text("- Pseudo angulos obtidos -", 10, 10)
        text(textSquare, 10, 25)
        text(textEsc, 10, 40)
        text(textVect, 10, 55)
        text(textCos, 10, 70)
        transformCanva()
    }
}