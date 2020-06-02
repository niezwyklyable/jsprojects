
function render() {

    // zamalowanie tla na czarno (jednoczesne wyczyszczenie poprzedniej klatki)
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)
    contextSide.fillStyle = '#000'
    contextSide.fillRect(0, 0, canvas.width, canvas.height)
    
    // wydrukowanie cells - komorek z figur ktore osiagnely stan settled = true (i zostaly usuniete z tablicy figures)
    cells.matrix.forEach((col, i) => {

        col.forEach((el, j) => {

            if (el == 1) {

                context.fillStyle = cells.color[i][j]
                context.fillRect(i - 1, 20 - j, 1, 1)

            }

        })

    })

    // wydrukowanie biezacej figury
    figures.forEach((fig) => {

        fig.matrix.forEach((row, i) => {

            row.forEach((el, j) => {

                if (el == 1) {

                    context.fillStyle = fig.color
                    context.fillRect(fig.pos.x + j, fig.pos.y + i, 1, 1)

                }

            })

        })

    })

    // wydrukowanie nastepnej figury
    nextFigure.matrix.forEach((row, i) => {

        row.forEach((el, j) => {

            if (el == 1) {

                contextSide.fillStyle = nextFigure.color
                contextSide.fillRect(j + 1, i + 1, 1, 1)

            }

        })

    })

    // wydrukowanie ghosta
    ghostFigure.matrix.forEach((row, i) => {

        row.forEach((el, j) => {

            if (el == 1) {

                context.globalAlpha = 0.2
                context.fillStyle = ghostFigure.color
                context.fillRect(ghostFigure.pos.x + j, ghostFigure.pos.y + i, 1, 1)
                context.globalAlpha = 1.0 // musi to byc bo inaczej przezroczystosc dotyczy rowniez pozostalych elementow

            }

        })

    })

}
