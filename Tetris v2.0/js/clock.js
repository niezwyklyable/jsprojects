
function clock() {

    timerClock = setInterval(() => { // timer zliczajacy sekundy

        if (counter == 0) {

            divScore.innerHTML = 'Speed boosted!'
            counter = 60
            turn++
            //console.log('level: ' + turn)
            clearInterval(timerY) // wylaczenie timera Y

            switch (turn) { // podmiana wartosci interwalu timera Y

                case 1:
                    deltaY = 700
                    break

                case 2:
                    deltaY = 600
                    break

                case 3:
                    deltaY = 500
                    break

                case 4:
                    deltaY = 400
                    break

                case 5:
                    deltaY = 300
                    break

                case 6:
                    deltaY = 250
                    break

                case 7:
                    deltaY = 200
                    break

                case 8:
                    deltaY = 150
                    break

                case 9:
                    deltaY = 100
                    break

            }

            Y() // ponowne uruchomienie timera Y

        } else counter--
        
        // wylaczenie timera odliczajacego czas
        if (deltaY == 100) {

            clearInterval(timerClock)
            divScore.innerHTML = 'Max speed reached!'

        }

        //console.log('counter: ' + counter)

    }, 1000)

}
