
function input() {

    figures.forEach((fig) => {

        if ((pressed[40] || pressed[83]) && !fig.hardDropUsed) { // strzalka w dol lub S - soft drop

            // pierwsza klatka
            if (!softDropPressed) { // musi to byc odseparowane bo inaczej softDrop zalaczalby sie i wylaczal na zmiane

                tempDelta = deltaY
                softDropPressed = true
                clearInterval(timerY)
                deltaY = 50
                Y()
                softDropPoints++ // jednorazowe naliczenie pierwszego punktu

            }

            // nastepne klatki (w zaleznosci od dlugosci trzymania przycisku)

        } else if (softDropPressed) { // ostatnia klatka (puszczenie przycisku)

            softDropPressed = false
            clearInterval(timerY)
            deltaY = tempDelta
            Y()

            //punktacja
            score += softDropPoints
            divScore.innerHTML = score
            //console.log(softDropPoints)
            softDropPoints = 0 // wyzerowanie countera

        }

    })

}
