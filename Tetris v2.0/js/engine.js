
window.onload = start // uruchomienie timera glownego

// uchwyt do canvasa gry
var canvas = document.getElementById('game')
var context = canvas.getContext('2d')
context.scale(30, 30)
context.imageSmoothingEnabled = false

// uchwyt do canvasa bocznego
var canvasSide = document.getElementById('nextFigure')
var contextSide = canvasSide.getContext('2d')
contextSide.scale(30, 30)
contextSide.imageSmoothingEnabled = false

// uchwyt do diva score
var divScore = document.getElementById('score')

// zmienne globalne z warunkami poczatkowymi
var currentFigureType = Math.floor(Math.random() * 7)
var figures = [new Figure(currentFigureType, 0)] // stworzenie pierwszej figury w sposob losowy
//var figures = [new Figure(1), 0] // stworzenie pierwszej figury w sposob losowy
var ghostFigure = new Figure(currentFigureType, minDeltaPosY)  // stworzenie ghosta
var nextFigureType = Math.floor(Math.random() * 7) // wylosowanie typu kolejnej figury
var nextFigure = new Figure(nextFigureType, 0) // stworzenie kolejnej figury
var timerY = 0 // zmienna timerowa potrzebna aby nie zarzadzac (np. wylaczyc timer lub zmienic jego interwal)
var deltaY = 1000 // interwal do timera Y odpowiadajacego za opadanie w dol
var softDropPressed = false // flaga potrzebna do funkcji input() i physics()
var holdUsed = false
var score = 0 // zmienna wykorzystywana w physics() i input()
var deltaPosY = [] // tablica wykorzystywana w ghostPosY()
var softDropPoints = 0 // zmienna wykorzystywana w input() i Y()
var minDeltaPosY = 0 // zmienna wykorzystywana w ghostPosY() i physics()
var counter = 60 // zmienna wykorzystywana w timerze clock()
var turn = 0 // zmienna wykorzystywana w timerze clock()
var timerClock = 0 // zmienna timerowa potrzebna aby nie zarzadzac (np. wylaczyc timer lub zmienic jego interwal)
var tempDelta = 0 // zmienna potrzebna w input() do przechowywania wartosci interwalu timera Y podczas uzywania soft dropu

// macierz komorek - przechowuje informacje o polozeniu poszczegolnych komorek wszystkich obiektow ktore osiagnely stan settled = true
var cells = {
    matrix: [[], [], [], [], [], [], [], [], [], [], [], []],
    color: [[], [], [], [], [], [], [], [], [], [], [], []]
}
// krawedzie mapy (poza canvasem) sa jedynkami a srodek canvasa wypelniony zerami (wanna)
for (i = 0; i < 12; i++) {
    for (j = 0; j < 21; j++) {
        if (j == 0 || i == 0 || i == 11) cells.matrix[i][j] = 1
        else cells.matrix[i][j] = 0
        cells.color[i][j] = 'empty'
    }
}

// zmienne i nasluchy pod sterowanie w inpucie - taki sposob zapewnia plynne/liniowe sterowanie (w klasycznym rozwiazaniu reakcja jest narastajaca)
var pressed = {} // tablica przechowujaca informacje o tym ktory przycisk jest aktualnie naciskany (keyCode przycisku jest indeksem, a odpowiadajaca mu wartosc jest typu boolian)
document.onkeydown = (event) => {
    pressed[event.keyCode] = true // przypisuje danemu indeksowi tablicy o numerze keyCode wartosc true gdy przycisk jest wciskany
}
document.onkeyup = (event) => {
    pressed[event.keyCode] = false // przypisuje danemu indeksowi tablicy o numerze keyCode wartosc false gdy przycisk jest puszczany
}

// sterowanie glowne (nieliniowe, z niezaleznym timerem)
document.addEventListener('keydown', event => {

    //console.log(event)

    figures.forEach((fig) => {

        if (fig.speedX != 0 && !fig.hardDropUsed) {

            // strzalka w lewo lub A
            if ((event.keyCode == 37 || event.keyCode == 65) && !fig.collisionLeft) {

                fig.pos.x -= fig.speedX
                ghostFigure.pos.x -= ghostFigure.speedX
                //console.log('LEFT, x: ' + fig.pos.x)

            } // strzalka w prawo lub D
            else if ((event.keyCode == 39 || event.keyCode == 68) && !fig.collisionRight) {

                fig.pos.x += fig.speedX
                ghostFigure.pos.x += ghostFigure.speedX
                //console.log('RIGHT, x: ' + fig.pos.x)

            } // strzalka w gore lub W - rotacja figury
            else if ((event.keyCode == 38 || event.keyCode == 87) && (fig.matrix.length == 3 || fig.matrix.length == 4)) {

                rotation(fig)

                // w przypadku ghost'a wystarczy tylko podmienic macierz i ustawic mu odpowiednia pozycje
                rotate(ghostFigure)
                ghostFigure.pos.x = fig.pos.x

            } else if (event.keyCode == 32) { // spacja - hard drop

                fig.hardDropUsed = true
                ghostPosY(fig) // update'uje zmienna globalna minDeltaPosY
                fig.pos.y += minDeltaPosY // przesuniecie figury o delte

                //punktacja
                score += minDeltaPosY * 2
                divScore.innerHTML = score

            } else if (event.keyCode == 67 && !holdUsed) { // C - hold

                figures.push(new Figure(nextFigureType, 0)) // powicie nastepnej figury jako nowej biezacej figury
                figures.splice(0, 1) // dokonanie aborcji na starej biezacej figurze
                ghostFigure = new Figure(nextFigureType, minDeltaPosY) // powicie nowego ghosta (zastapienie starego)
                nextFigureType = Math.floor(Math.random() * 7) // wylosowanie nowej nastepnej figury
                nextFigure = new Figure(nextFigureType, 0) // zastapienie nastepnej figury nowa nastepna figura
                holdUsed = true // holda mozna uzyc tylko raz, chyba ze figura osiagnie stan settled = true

            }

        }

    })

})

clock() // uruchomienie timera zmieniajacego co minute wartosc interwalu timera sterujacego opadaniem figury
Y() // uruchomienie timera sterujacego opadaniem figury

function start() { // timer glowny

    input() // liniowe sterowanie (soft drop) - musi byc podpiete pod jakis timer (najlepiej glowny)
    physics() // opisuje co sie dzieje z figurami/komorkami figur
    render() // nadpisuje poprzednia klatke czarnym tlem na caly canvas i rysuje figure oraz macierz komorek
    window.requestAnimationFrame(start)

}
