
function ghostPosY(fig) { // uniwersalna funkcja do wszystkich przypadkow - docelowo: rozwazyc kazdy przypadek z osobna... (zmudna i monotonna praca, nie chce mi sie a ta funkcja jako tako dziala...)

    deltaPosY = [] // czyszczenie tablicy przed kazdorazowym uzyciem funkcji ghostPosY()
    minDeltaPosY = 0 // czyszczenie zmiennej globalnej przechowujacej minimum z tablicy deltaPosY
    if (fig.matrix.length == 2 || fig.matrix.length == 3) {

        let l = 0
        let r = 0
        let b = 0

        if (fig.matrix.length == 3) {

            let onesCounterLeft = 0
            let onesCounterRight = 0
            let onesCounterBottom = 0

            fig.matrix.forEach((row) => {

                if (row[0] == 1) onesCounterLeft++
                if (row[fig.matrix.length - 1] == 1) onesCounterRight++

            })

            fig.matrix[fig.matrix.length - 1].forEach((el) => {

                if (el == 1) onesCounterBottom++

            })

            if (onesCounterLeft > 0) l = 0
            else l = 1
            if (onesCounterRight > 0) r = 0
            else r = 1
            if (onesCounterBottom > 0) b = 0
            else b = 1

        }

        for (i = fig.pos.x + 1 + l; i <= fig.pos.x + fig.matrix.length - 1 + 1 - r; i++) {

            let min = []
            for (j = 20 - fig.pos.y - fig.matrix.length; j >= 0; j--) {

                if (cells.matrix[i][j] == 1) min.push(20 - fig.pos.y - fig.matrix.length + b - j)
                //console.log(min)

            }
            generateMinimum(min, deltaPosY)

        }

        if (fig.matrix.length == 2) minDeltaPosY = Math.min(deltaPosY[0], deltaPosY[1])
        else if (fig.matrix.length == 3) {

            if (l == 1 || r == 1) minDeltaPosY = Math.min(deltaPosY[0], deltaPosY[1])
            else minDeltaPosY = Math.min(deltaPosY[0], deltaPosY[1], deltaPosY[2])
        }

    } else if (fig.matrix.length == 4) { // wyjatek od reguly - jedyny szczegolny przypadek - I-block 

        if (fig.stateNum == 0) {

            let min = []
            for (j = 20 - fig.pos.y - fig.matrix.length; j >= 0; j--) {

                if (cells.matrix[fig.pos.x + 1 + 1][j] == 1) min.push(20 - fig.pos.y - fig.matrix.length - j)
                //console.log(min)

            }
            generateMinimum(min, deltaPosY)
            minDeltaPosY = Math.min(deltaPosY[0])

        } else if (fig.stateNum == 1) {

            for (i = fig.pos.x + 1; i <= fig.pos.x + fig.matrix.length - 1 + 1; i++) {

                let min = []
                for (j = 20 - fig.pos.y - fig.matrix.length; j >= 0; j--) {

                    if (cells.matrix[i][j] == 1) min.push(20 - fig.pos.y - fig.matrix.length + 2 - j)
                    //console.log(min)

                }
                generateMinimum(min, deltaPosY)

            }
            minDeltaPosY = Math.min(deltaPosY[0], deltaPosY[1], deltaPosY[2], deltaPosY[3])

        } else if (fig.stateNum == 2) {

            let min = []
            for (j = 20 - fig.pos.y - fig.matrix.length; j >= 0; j--) {

                if (cells.matrix[fig.pos.x + 1 + 2][j] == 1) min.push(20 - fig.pos.y - fig.matrix.length - j)
                //console.log(min)

            }
            generateMinimum(min, deltaPosY)
            minDeltaPosY = Math.min(deltaPosY[0])

        } else if (fig.stateNum == 3) {

            for (i = fig.pos.x + 1; i <= fig.pos.x + fig.matrix.length - 1 + 1; i++) {

                let min = []
                for (j = 20 - fig.pos.y - fig.matrix.length; j >= 0; j--) {

                    if (cells.matrix[i][j] == 1) min.push(20 - fig.pos.y - fig.matrix.length + 1 - j)
                    //console.log(min)

                }
                generateMinimum(min, deltaPosY)

            }
            minDeltaPosY = Math.min(deltaPosY[0], deltaPosY[1], deltaPosY[2], deltaPosY[3])

        }
        
    }

    //console.log(deltaPosY)

}

function generateMinimum(min, deltaPosY) { // funkcja pomocnicza do funkcji ghostPosY()

    if (min.length == 1) deltaPosY.push(Math.min(min[0]))
    else if (min.length == 2) deltaPosY.push(Math.min(min[0], min[1]))
    else if (min.length == 3) deltaPosY.push(Math.min(min[0], min[1], min[2]))
    else if (min.length == 4) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3]))
    else if (min.length == 5) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4]))
    else if (min.length == 6) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5]))
    else if (min.length == 7) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6]))
    else if (min.length == 8) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7]))
    else if (min.length == 9) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7],
        min[8]))
    else if (min.length == 10) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7],
        min[8], min[9]))
    else if (min.length == 11) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7],
        min[8], min[9], min[10]))
    else if (min.length == 12) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7],
        min[8], min[9], min[10], min[11]))
    else if (min.length == 13) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7],
        min[8], min[9], min[10], min[11], min[12]))
    else if (min.length == 14) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7],
        min[8], min[9], min[10], min[11], min[12], min[13]))
    else if (min.length == 15) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7],
        min[8], min[9], min[10], min[11], min[12], min[13], min[14]))
    else if (min.length == 16) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7],
        min[8], min[9], min[10], min[11], min[12], min[13], min[14], min[15]))
    else if (min.length == 17) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7],
        min[8], min[9], min[10], min[11], min[12], min[13], min[14], min[15], min[16]))
    else if (min.length == 18) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7],
        min[8], min[9], min[10], min[11], min[12], min[13], min[14], min[15], min[16], min[17]))
    else if (min.length == 19) deltaPosY.push(Math.min(min[0], min[1], min[2], min[3], min[4], min[5], min[6], min[7],
        min[8], min[9], min[10], min[11], min[12], min[13], min[14], min[15], min[16], min[17], min[18]))

}
