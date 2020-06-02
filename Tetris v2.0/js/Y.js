
function Y() {

    // opadanie ruchem jednostajnie prostoliniowym z predkoscia 1 pos.y / sek
    timerY = setInterval(() => {

        figures.forEach((fig) => {

            fig.pos.y += fig.speedY
            //console.log('pos.y: ' + fig.pos.y)

        })

        if (softDropPressed) softDropPoints++

        //console.log('delta Y: ' + deltaY)

    }, deltaY) // na starcie: 1000

}
