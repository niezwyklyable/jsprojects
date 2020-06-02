
function physics() {

    // sprawdzenie warunku przegranej
    let gameOver = false
    for (i = 4; i <= 6; i++) { // formalnie od 3 do 5 ale trzeba dodac +1 bo wanna

        if (cells.matrix[i][20] == 1) gameOver = true

    }
    if (gameOver) {

        divScore.innerHTML = 'Game over! Score: ' + score
        clearInterval(timerClock)
        clearInterval(timerY)

    }

    figures.forEach((fig) => {

        // zmiana pozycji Y ghost'a
        ghostPosY(fig) // update'uje zmienna globalna minDeltaPosY
        ghostFigure.pos.y = fig.pos.y + minDeltaPosY

        // wykrycie kolizji poziomej - lewa i prawa strona
        for (i = 0; i <= fig.matrix.length - 1; i++) {

            for (j = 0; j <= fig.matrix.length - 1; j++) {

                // lewa strona
                if (fig.matrix[i][j] == 1 && cells.matrix[fig.pos.x + j][20 - fig.pos.y - i] == 1) fig.truthTableLeft.push(true)

                // prawa strona
                if (fig.matrix[i][j] == 1 && cells.matrix[fig.pos.x + j + 2][20 - fig.pos.y - i] == 1) fig.truthTableRight.push(true)

            }

        }

        //console.log('x: ' + fig.pos.x)
        //console.log('y: ' + fig.pos.y)

        // wykrycie kolizji poziomej - lewa strona
        let sumLeft = 0
        for (i = 0; i <= fig.truthTableLeft.length - 1; i++) sumLeft += fig.truthTableLeft[i]
        fig.truthTableLeft = [false] // przeczyszczenie tabeli prawdy po operacji sumowania
        if (sumLeft != 0) fig.collisionLeft = true
        else fig.collisionLeft = false
        //console.log('LEFT ' + fig.collisionLeft + ' ' + sumLeft)

        // wykrycie kolizji poziomej - prawa strona
        let sumRight = 0
        for (i = 0; i <= fig.truthTableRight.length - 1; i++) sumRight += fig.truthTableRight[i]
        fig.truthTableRight = [false] // przeczyszczenie tabeli prawdy po operacji sumowania
        if (sumRight != 0) fig.collisionRight = true
        else fig.collisionRight = false
        //console.log('RIGHT ' + fig.collisionRight + ' ' + sumRight)

        // wykrycie kolizji pionowej
        for (i = fig.matrix.length - 1; i >= 0; i--) {

            fig.matrix[i].forEach((el, j) => {

                if (el == 1 && cells.matrix[fig.pos.x + j + 1][20 - fig.pos.y - i - 1] == 1) {

                    // zabezpieczenie przed dalszym opadaniem
                    fig.speedX = 0 // odciecie sterowania
                    fig.speedY = 0 // zatrzymanie opadania
                    
                    if (!fig.settled) { // wykonuje jednorazowo instrukcje dla figury ktora nie osiagnela jeszcze statusu settled = true

                        fig.settled = true
                        holdUsed = false

                        // zapis pozycji wszystkich komorek figury w macierzy komorek i koloru figury w podzbiorze komorek
                        fig.matrix.forEach((row, i) => {

                            row.forEach((el, j) => {

                                if (el != 0) {

                                    cells.matrix[fig.pos.x + j + 1][20 - fig.pos.y - i] = el
                                    cells.color[fig.pos.x + j + 1][20 - fig.pos.y - i] = fig.color

                                }

                            })

                        })

                        // poprawka wizualna w momencie przegranej
                        let posY = 0
                        if (nextFigureType == 0) { // O-block (2x2)

                            if (cells.matrix[4][19] == 1 || cells.matrix[5][19] == 1) posY = -1
                            else posY = 0

                        } // wszystkie macierze 3x3
                        else if (nextFigureType == 2 || nextFigureType == 3 || nextFigureType == 4 || nextFigureType == 5 ||
                            nextFigureType == 6) {

                            if (cells.matrix[4][19] == 1 || cells.matrix[5][19] == 1 ||
                                cells.matrix[6][19] == 1) posY = -2
                            else if (cells.matrix[4][18] == 1 || cells.matrix[5][18] == 1 ||
                                cells.matrix[6][18] == 1) posY = -1
                            else posY = 0

                        } else if (nextFigureType == 1) { // I-block (4x4)

                            if (cells.matrix[4][19] == 1 || cells.matrix[5][19] == 1 ||
                                cells.matrix[6][19] == 1 || cells.matrix[7][19] == 1) posY = -3
                            else if (cells.matrix[4][18] == 1 || cells.matrix[5][18] == 1 ||
                                cells.matrix[6][18] == 1 || cells.matrix[7][18] == 1) posY = -2
                            else if (cells.matrix[4][17] == 1 || cells.matrix[5][17] == 1 ||
                                cells.matrix[6][17] == 1 || cells.matrix[7][17] == 1) posY = -1
                            else posY = 0
                        }

                        // powicie nowej figury
                        if (cells.matrix[4][20] != 1 && cells.matrix[5][20] != 1 &&
                            cells.matrix[6][20] != 1) { // w momencie przegranej nie ma sensu powijac nowej figury

                            figures.push(new Figure(nextFigureType, posY)) // powicie nowej figury
                            //figures.push(new Figure(1), 0) // powicie nowej figury
                            //console.log('new Figure ' + nextFigureType + ' ' + posY)
                            ghostFigure = new Figure(nextFigureType, posY + minDeltaPosY) // powicie nowego ghosta (zastapienie starego)
                            nextFigureType = Math.floor(Math.random() * 7) // wylosowanie nowej nastepnej figury
                            nextFigure = new Figure(nextFigureType, 0) // zastapienie nastepnej figury nowa nastepna figura
                            

                        }

                        figures.splice(0, 1) // dokonanie aborcji na biezacej figurze
                        

                    }

                }

            })

        }

    })

    // wykrycie pelnego wiersza
    let abortion = {
        rows: [],
        permit: false
    }
    for (i = 1; i <= 20; i++) { // po elementach w kolumnie (wiersze)

        // identyfikacja
        let sum = 0
        for (j = 1; j <= 10; j++) { // po elementach w 1 wierszu

            if (cells.matrix[j][i] == 1) sum++

        }

        // aborcja
        if (sum == 10) {

            for (j = 1; j <= 10; j++) { // po elementach w 1 wierszu

                cells.matrix[j][i] = 0
                cells.color[j][i] = 'empty'
                //console.log('aborcja - sum: ' + sum)

            }

            abortion.rows.push(i)
            abortion.permit = true

        }

    }
    setTimeout(() => {

        if (abortion.permit) {

            // punktacja
            score += abortion.rows.length * 100
            divScore.innerHTML = score

            // przesuniecie wszystkich komorek powyzej usunietego wiersza o 1 pozycje w dol
            abortion.rows.reverse().forEach((row) => {

                for (i = row; i <= 19; i++) { // po elementach w kolumnie (wiersze)

                    for (j = 1; j <= 10; j++) { // po elementach w 1 wierszu

                        cells.matrix[j][i] = cells.matrix[j][i + 1]
                        cells.color[j][i] = cells.color[j][i + 1]

                    }

                }

            })

            abortion.permit = false
            abortion.rows = []

        }

    }, 300)

}
