
window.onload = () => {

    $("#turn").css("background-image", "url('img/osmall.bmp')")
    $(".field").css("background-image", "url('img/nic.bmp')")

}

// zmienne globalne (dostepne z poziomu kazdej funkcji)
var turn = "o"
var verifiedBoxes = {
    o: [false, false, false, false, false, false, false, false, false],
    x: [false, false, false, false, false, false, false, false, false],
    all: [false, false, false, false, false, false, false, false, false]
}
var turnOfAI = false
var momentOfWin = false
var firstAvailableBox = 0
var lastAvailableBox = 0
var randomNr = 0
var nrOfTurn = 0
var level = "medium"

var d1 = document.getElementById("box1");
var d2 = document.getElementById("box2");
var d3 = document.getElementById("box3");
var d4 = document.getElementById("box4");
var d5 = document.getElementById("box5");
var d6 = document.getElementById("box6");
var d7 = document.getElementById("box7");
var d8 = document.getElementById("box8");
var d9 = document.getElementById("box9");

function load(lvl) { // wczytuje odpowiednie dane w zaleznosci co sie kliknie w HTML

    turn = "o"
    verifiedBoxes = {
        o: [false, false, false, false, false, false, false, false, false],
        x: [false, false, false, false, false, false, false, false, false],
        all: [false, false, false, false, false, false, false, false, false]
    }
    turnOfAI = false
    momentOfWin = false
    firstAvailableBox = 0
    lastAvailableBox = 0
    randomNr = 0
    nrOfTurn = 0
    level = lvl

    for (nr = 1; nr <= 9; nr++) {
        $("#box" + nr).removeClass("inactive").addClass("field")
    }

    d1.setAttribute("onclick", "clickBox(1)");
    d2.setAttribute("onclick", "clickBox(2)");
    d3.setAttribute("onclick", "clickBox(3)");
    d4.setAttribute("onclick", "clickBox(4)");
    d5.setAttribute("onclick", "clickBox(5)");
    d6.setAttribute("onclick", "clickBox(6)");
    d7.setAttribute("onclick", "clickBox(7)");
    d8.setAttribute("onclick", "clickBox(8)");
    d9.setAttribute("onclick", "clickBox(9)");

    $("#turn").css("background-image", "url('img/osmall.bmp')")
    $(".field").css("background-image", "url('img/nic.bmp')")

}

function clickBox(nr) { // opisuje co sie dzieje gdy kliknie sie box o numerze "nr" z poziomu HTML lub AI go wybierze z poziomu JS

    if (!turnOfAI && !momentOfWin) {

        checkWin(nr, turn) // wytrigerowanie funkcji sprawdzaj¹cej potencjaln¹ wygran¹ niezale¿nie od rodzaju gracza

        if (turn == "o") {
            turn = "x" // zmiana gracza
            $("#turn").css("background-image", "url('img/xsmall.bmp')") // podmiana malego obrazka na krzy¿yk
            $("#box" + nr).css("background-image", "url('img/o.bmp')") // zaznaczenie kó³ka
            if (level != "friend") {
                turnOfAI = true // zabezpieczenie aby nie mozna bylo nic wytrigerowac przed wykonaniem ruchu przez AI
                setTimeout(() => {
                    turnOfAI = false
                    // wytrigerowanie AI
                    if (level == "easy") easyAI()
                    else if (level == "medium") mediumAI()
                    else impossibleAI() // gdy level == "impossible"
                }, 500)
            }
        } else {
            turn = "o" // zmiana gracza
            $("#turn").css("background-image", "url('img/osmall.bmp')") // podmiana malego obrazka na kó³ko
            $("#box" + nr).css("background-image", "url('img/x.bmp')") // zaznaczenie krzy¿yka
        }

        $("#box" + nr).removeAttr("onclick").removeClass("field").addClass("inactive") // usuniecie trigera funkcji clickBox oraz podmiana klasy w CSS

    }

}

function checkWin(currentNr, currentTurn) { // zostawia œlad w tablicy verifiedBoxes oraz sprawdza potencjaln¹ wygran¹ kó³ka lub krzy¿yka

    if (currentTurn == "o") {
        verifiedBoxes.o[currentNr - 1] = true // zapis ruchu danego gracza w tablicy

        nrOfTurn = 0 // reset licznika tur

        // licznik tur oparty na wykonanych ju¿ ruchach kó³ka
        for (b = 0; b <= 8; b++) {
            nrOfTurn += verifiedBoxes.o[b]
        }

        if (// w poziomie
            verifiedBoxes.o[0] && verifiedBoxes.o[1] && verifiedBoxes.o[2] ||
            verifiedBoxes.o[3] && verifiedBoxes.o[4] && verifiedBoxes.o[5] ||
            verifiedBoxes.o[6] && verifiedBoxes.o[7] && verifiedBoxes.o[8] ||
            // w pionie
            verifiedBoxes.o[0] && verifiedBoxes.o[3] && verifiedBoxes.o[6] ||
            verifiedBoxes.o[1] && verifiedBoxes.o[4] && verifiedBoxes.o[7] ||
            verifiedBoxes.o[2] && verifiedBoxes.o[5] && verifiedBoxes.o[8] ||
            // na ukos
            verifiedBoxes.o[0] && verifiedBoxes.o[4] && verifiedBoxes.o[8] ||
            verifiedBoxes.o[2] && verifiedBoxes.o[4] && verifiedBoxes.o[6]) {
            alert('Kó³ko wygrywa !')
            $(".field").removeAttr("onclick").removeClass("field").addClass("inactive")
            momentOfWin = true
        }

        else if (nrOfTurn == 5) { // w przypadku remisu
            alert('Remis !')
        }

    } else {

        verifiedBoxes.x[currentNr - 1] = true // zapis ruchu danego gracza w tablicy

        if (// w poziomie
            verifiedBoxes.x[0] && verifiedBoxes.x[1] && verifiedBoxes.x[2] ||
            verifiedBoxes.x[3] && verifiedBoxes.x[4] && verifiedBoxes.x[5] ||
            verifiedBoxes.x[6] && verifiedBoxes.x[7] && verifiedBoxes.x[8] ||
            // w pionie
            verifiedBoxes.x[0] && verifiedBoxes.x[3] && verifiedBoxes.x[6] ||
            verifiedBoxes.x[1] && verifiedBoxes.x[4] && verifiedBoxes.x[7] ||
            verifiedBoxes.x[2] && verifiedBoxes.x[5] && verifiedBoxes.x[8] ||
            // na ukos
            verifiedBoxes.x[0] && verifiedBoxes.x[4] && verifiedBoxes.x[8] ||
            verifiedBoxes.x[2] && verifiedBoxes.x[4] && verifiedBoxes.x[6]) {
            alert('Krzy¿yk wygrywa !')
            $(".field").removeAttr("onclick").removeClass("field").addClass("inactive")
            momentOfWin = true
        }

    }

}

function easyAI() { // opisuje mechanikê sztucznej inteligencji na poziomie uposledzonym

    for (b = 0; b <= 8; b++) {
        verifiedBoxes.all[b] = verifiedBoxes.x[b] + verifiedBoxes.o[b] // po zsumowaniu true i false wynik jest 1, a false i false 0
    }

    availableBox()

}

function mediumAI() { // opisuje mechanikê sztucznej inteligencji na poziomie srednim

    nrOfTurn = 0 // reset licznika tur

    for (b = 0; b <= 8; b++) {
        verifiedBoxes.all[b] = verifiedBoxes.x[b] + verifiedBoxes.o[b] // po zsumowaniu true i false wynik jest 1, a false i false 0
    }

    // licznik tur oparty na wykonanych ju¿ ruchach kó³ka
    for (b = 0; b <= 8; b++) {
        nrOfTurn += verifiedBoxes.o[b]
    }

    // ustaw sie jak najblizej kolka w sposob randomowy
    if (nrOfTurn == 1) {
        if (verifiedBoxes.o[0]) {
            randomNr = Math.floor(Math.random() * 2) + 1
            if (randomNr == 1) clickBox(2)
            else if (randomNr == 2) clickBox(4)
        }
        else if (verifiedBoxes.o[1]) {
            randomNr = Math.floor(Math.random() * 3) + 1
            if (randomNr == 1) clickBox(1)
            else if (randomNr == 2) clickBox(3)
            else if (randomNr == 3) clickBox(5)
        }
        else if (verifiedBoxes.o[2]) {
            randomNr = Math.floor(Math.random() * 2) + 1
            if (randomNr == 1) clickBox(2)
            else if (randomNr == 2) clickBox(6)
        }
        else if (verifiedBoxes.o[3]) {
            randomNr = Math.floor(Math.random() * 3) + 1
            if (randomNr == 1) clickBox(1)
            else if (randomNr == 2) clickBox(5)
            else if (randomNr == 3) clickBox(7)
        }
        else if (verifiedBoxes.o[4]) {
            randomNr = Math.floor(Math.random() * 4) + 1
            if (randomNr == 1) clickBox(2)
            else if (randomNr == 2) clickBox(4)
            else if (randomNr == 3) clickBox(6)
            else if (randomNr == 4) clickBox(8)
        }
        else if (verifiedBoxes.o[5]) {
            randomNr = Math.floor(Math.random() * 3) + 1
            if (randomNr == 1) clickBox(3)
            else if (randomNr == 2) clickBox(5)
            else if (randomNr == 3) clickBox(9)
        }
        else if (verifiedBoxes.o[6]) {
            randomNr = Math.floor(Math.random() * 2) + 1
            if (randomNr == 1) clickBox(4)
            else if (randomNr == 2) clickBox(8)
        }
        else if (verifiedBoxes.o[7]) {
            randomNr = Math.floor(Math.random() * 3) + 1
            if (randomNr == 1) clickBox(5)
            else if (randomNr == 2) clickBox(7)
            else if (randomNr == 3) clickBox(9)
        }
        else if (verifiedBoxes.o[8]) {
            randomNr = Math.floor(Math.random() * 2) + 1
            if (randomNr == 1) clickBox(6)
            else if (randomNr == 2) clickBox(8)
        }
    }

    // skontruj kolko stawiajac sie w linii potencjalnej wygranej kolka (o ile nie ma tam juz postawionego x'a) w przeciwnym wypadku zajmij przyleg³y wolny box
    else if (nrOfTurn == 2) {
        if (verifiedBoxes.o[0] && verifiedBoxes.o[1] && verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.o[3] && verifiedBoxes.o[4] && verifiedBoxes.all[5] != 1) clickBox(6)
        else if (verifiedBoxes.o[6] && verifiedBoxes.o[7] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.o[1] && verifiedBoxes.o[2] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[5] && verifiedBoxes.all[3] != 1) clickBox(4)
        else if (verifiedBoxes.o[7] && verifiedBoxes.o[8] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.o[0] && verifiedBoxes.o[3] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.o[1] && verifiedBoxes.o[4] && verifiedBoxes.all[7] != 1) clickBox(8)
        else if (verifiedBoxes.o[2] && verifiedBoxes.o[5] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.o[3] && verifiedBoxes.o[6] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[7] && verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.o[5] && verifiedBoxes.o[8] && verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.o[0] && verifiedBoxes.o[4] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.o[2] && verifiedBoxes.o[4] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[8] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[6] && verifiedBoxes.all[2] != 1) clickBox(3)
        else adjacentBox()
    }

    // ustaw sie tak zeby wygrac, a jesli nie ma takiej mozliwosci to zajmij przyleg³y wolny box
    else if (nrOfTurn == 3 || nrOfTurn == 4) {
        if (verifiedBoxes.x[0] && verifiedBoxes.x[1] && verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.x[3] && verifiedBoxes.x[4] && verifiedBoxes.all[5] != 1) clickBox(6)
        else if (verifiedBoxes.x[6] && verifiedBoxes.x[7] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.x[1] && verifiedBoxes.x[2] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.x[4] && verifiedBoxes.x[5] && verifiedBoxes.all[3] != 1) clickBox(4)
        else if (verifiedBoxes.x[7] && verifiedBoxes.x[8] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.x[0] && verifiedBoxes.x[3] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.x[1] && verifiedBoxes.x[4] && verifiedBoxes.all[7] != 1) clickBox(8)
        else if (verifiedBoxes.x[2] && verifiedBoxes.x[5] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.x[3] && verifiedBoxes.x[6] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.x[4] && verifiedBoxes.x[7] && verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.x[5] && verifiedBoxes.x[8] && verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.x[0] && verifiedBoxes.x[4] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.x[2] && verifiedBoxes.x[4] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.x[4] && verifiedBoxes.x[8] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.x[4] && verifiedBoxes.x[6] && verifiedBoxes.all[2] != 1) clickBox(3)
        else adjacentBox()
    }

}

function impossibleAI() { // opisuje mechanikê sztucznej inteligencji na poziomie niemozliwym - nie da sie wygrac, mozna co najwyzej zremisowac

    nrOfTurn = 0 // reset licznika tur

    for (b = 0; b <= 8; b++) {
        verifiedBoxes.all[b] = verifiedBoxes.x[b] + verifiedBoxes.o[b] // po zsumowaniu true i false wynik jest 1, a false i false 0
    }

    // licznik tur oparty na wykonanych ju¿ ruchach kó³ka
    for (b = 0; b <= 8; b++) {
        nrOfTurn += verifiedBoxes.o[b]
    }

    if (nrOfTurn == 1) {

        // ustaw sie w sposob inteligentny
        if (verifiedBoxes.o[0] || verifiedBoxes.o[2] || verifiedBoxes.o[6] || verifiedBoxes.o[8]) clickBox(5)
        else if (verifiedBoxes.o[1]) clickBox(8)
        else if (verifiedBoxes.o[7]) clickBox(2)
        else if (verifiedBoxes.o[3]) clickBox(6)
        else if (verifiedBoxes.o[5]) clickBox(4)
        else if (verifiedBoxes.o[4]) clickBox(3)

    }

    else if (nrOfTurn == 2) {

        // skontruj kolko stawiajac sie na skraju linii potencjalnej wygranej kolka (o ile nie ma tam juz postawionego x'a)
        if (verifiedBoxes.o[0] && verifiedBoxes.o[1] && verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.o[3] && verifiedBoxes.o[4] && verifiedBoxes.all[5] != 1) clickBox(6)
        else if (verifiedBoxes.o[6] && verifiedBoxes.o[7] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.o[1] && verifiedBoxes.o[2] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[5] && verifiedBoxes.all[3] != 1) clickBox(4)
        else if (verifiedBoxes.o[7] && verifiedBoxes.o[8] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.o[0] && verifiedBoxes.o[3] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.o[1] && verifiedBoxes.o[4] && verifiedBoxes.all[7] != 1) clickBox(8)
        else if (verifiedBoxes.o[2] && verifiedBoxes.o[5] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.o[3] && verifiedBoxes.o[6] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[7] && verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.o[5] && verifiedBoxes.o[8] && verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.o[0] && verifiedBoxes.o[4] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.o[2] && verifiedBoxes.o[4] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[8] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[6] && verifiedBoxes.all[2] != 1) clickBox(3)

        // skontruj kolko stawiajac sie w srodku linii potencjalnej wygranej kolka (o ile nie ma tam juz postawionego x'a)
        else if (verifiedBoxes.o[0] && verifiedBoxes.o[2] && verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.o[2] && verifiedBoxes.o[8] && verifiedBoxes.all[5] != 1) clickBox(6)
        else if (verifiedBoxes.o[6] && verifiedBoxes.o[8] && verifiedBoxes.all[7] != 1) clickBox(8)
        else if (verifiedBoxes.o[0] && verifiedBoxes.o[6] && verifiedBoxes.all[3] != 1) clickBox(4)

        // w przeciwnym wypadku odpowiednio zareaguj
        else if (verifiedBoxes.o[1] && verifiedBoxes.x[7] && (verifiedBoxes.o[3] || verifiedBoxes.o[6])) clickBox(1)
        else if (verifiedBoxes.o[1] && verifiedBoxes.x[7] && (verifiedBoxes.o[5] || verifiedBoxes.o[8])) clickBox(3)
        else if (verifiedBoxes.o[1] && verifiedBoxes.x[7] && verifiedBoxes.o[4]) clickBox(9)
        else if (verifiedBoxes.o[5] && verifiedBoxes.x[3] && (verifiedBoxes.o[0] || verifiedBoxes.o[1])) clickBox(3)
        else if (verifiedBoxes.o[5] && verifiedBoxes.x[3] && (verifiedBoxes.o[6] || verifiedBoxes.o[7])) clickBox(9)
        else if (verifiedBoxes.o[5] && verifiedBoxes.x[3] && verifiedBoxes.o[4]) clickBox(7)
        else if (verifiedBoxes.o[7] && verifiedBoxes.x[1] && (verifiedBoxes.o[0] || verifiedBoxes.o[3])) clickBox(7)
        else if (verifiedBoxes.o[7] && verifiedBoxes.x[1] && (verifiedBoxes.o[2] || verifiedBoxes.o[5])) clickBox(9)
        else if (verifiedBoxes.o[7] && verifiedBoxes.x[1] && verifiedBoxes.o[4]) clickBox(3)
        else if (verifiedBoxes.o[3] && verifiedBoxes.x[5] && (verifiedBoxes.o[1] || verifiedBoxes.o[2])) clickBox(1)
        else if (verifiedBoxes.o[3] && verifiedBoxes.x[5] && (verifiedBoxes.o[7] || verifiedBoxes.o[8])) clickBox(7)
        else if (verifiedBoxes.o[3] && verifiedBoxes.x[5] && verifiedBoxes.o[4]) clickBox(9)
        else if (verifiedBoxes.o[4] && verifiedBoxes.x[2] && verifiedBoxes.o[6]) clickBox(1)
        else adjacentBox() // zajmij przyleg³y wolny box

    }

    else if (nrOfTurn == 3 || nrOfTurn == 4) {

        // wstaw x na skraju linii potencjalnej wygranej x'a (o ile nie ma tam ju¿ postawionego kó³ka)
        if (verifiedBoxes.x[0] && verifiedBoxes.x[1] && verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.x[3] && verifiedBoxes.x[4] && verifiedBoxes.all[5] != 1) clickBox(6)
        else if (verifiedBoxes.x[6] && verifiedBoxes.x[7] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.x[1] && verifiedBoxes.x[2] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.x[4] && verifiedBoxes.x[5] && verifiedBoxes.all[3] != 1) clickBox(4)
        else if (verifiedBoxes.x[7] && verifiedBoxes.x[8] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.x[0] && verifiedBoxes.x[3] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.x[1] && verifiedBoxes.x[4] && verifiedBoxes.all[7] != 1) clickBox(8)
        else if (verifiedBoxes.x[2] && verifiedBoxes.x[5] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.x[3] && verifiedBoxes.x[6] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.x[4] && verifiedBoxes.x[7] && verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.x[5] && verifiedBoxes.x[8] && verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.x[0] && verifiedBoxes.x[4] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.x[2] && verifiedBoxes.x[4] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.x[4] && verifiedBoxes.x[8] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.x[4] && verifiedBoxes.x[6] && verifiedBoxes.all[2] != 1) clickBox(3)

        // wstaw x w srodku linii potencjalnej wygranej x'a (o ile nie ma tam ju¿ postawionego kó³ka)
        else if (verifiedBoxes.x[0] && verifiedBoxes.x[2] && verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.x[2] && verifiedBoxes.x[8] && verifiedBoxes.all[5] != 1) clickBox(6)
        else if (verifiedBoxes.x[6] && verifiedBoxes.x[8] && verifiedBoxes.all[7] != 1) clickBox(8)
        else if (verifiedBoxes.x[0] && verifiedBoxes.x[6] && verifiedBoxes.all[3] != 1) clickBox(4)
        else if (verifiedBoxes.x[1] && verifiedBoxes.x[7] && verifiedBoxes.all[4] != 1) clickBox(5)
        else if (verifiedBoxes.x[3] && verifiedBoxes.x[5] && verifiedBoxes.all[4] != 1) clickBox(5)
        else if (verifiedBoxes.x[2] && verifiedBoxes.x[6] && verifiedBoxes.all[4] != 1) clickBox(5)
        else if (verifiedBoxes.x[0] && verifiedBoxes.x[8] && verifiedBoxes.all[4] != 1) clickBox(5)

        // skontruj kolko stawiajac sie na skraju linii potencjalnej wygranej kolka (o ile nie ma tam juz postawionego x'a)
        else if (verifiedBoxes.o[0] && verifiedBoxes.o[1] && verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.o[3] && verifiedBoxes.o[4] && verifiedBoxes.all[5] != 1) clickBox(6)
        else if (verifiedBoxes.o[6] && verifiedBoxes.o[7] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.o[1] && verifiedBoxes.o[2] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[5] && verifiedBoxes.all[3] != 1) clickBox(4)
        else if (verifiedBoxes.o[7] && verifiedBoxes.o[8] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.o[0] && verifiedBoxes.o[3] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.o[1] && verifiedBoxes.o[4] && verifiedBoxes.all[7] != 1) clickBox(8)
        else if (verifiedBoxes.o[2] && verifiedBoxes.o[5] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.o[3] && verifiedBoxes.o[6] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[7] && verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.o[5] && verifiedBoxes.o[8] && verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.o[0] && verifiedBoxes.o[4] && verifiedBoxes.all[8] != 1) clickBox(9)
        else if (verifiedBoxes.o[2] && verifiedBoxes.o[4] && verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[8] && verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.o[4] && verifiedBoxes.o[6] && verifiedBoxes.all[2] != 1) clickBox(3)

        // skontruj kolko stawiajac sie w srodku linii potencjalnej wygranej kolka (o ile nie ma tam juz postawionego x'a)
        else if (verifiedBoxes.o[0] && verifiedBoxes.o[2] && verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.o[2] && verifiedBoxes.o[8] && verifiedBoxes.all[5] != 1) clickBox(6)
        else if (verifiedBoxes.o[6] && verifiedBoxes.o[8] && verifiedBoxes.all[7] != 1) clickBox(8)
        else if (verifiedBoxes.o[0] && verifiedBoxes.o[6] && verifiedBoxes.all[3] != 1) clickBox(4)
        else adjacentBox() // zajmij przyleg³y wolny box

    }

}

function adjacentBox() { // funkcja pomocnicza do funkcji mediumAI() oraz impossibleAI() - stawia krzy¿yk w pusty box obok jakiegokolwiek x'a o ile jest to mozliwe

    if (verifiedBoxes.x[0]) {
        if (verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.all[3] != 1) clickBox(4)
        else if (verifiedBoxes.all[4] != 1) clickBox(5)
        else availableBox()
    }
    else if (verifiedBoxes.x[1]) {
        if (verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.all[3] != 1) clickBox(4)
        else if (verifiedBoxes.all[4] != 1) clickBox(5)
        else if (verifiedBoxes.all[5] != 1) clickBox(6)
        else availableBox()
    }
    else if (verifiedBoxes.x[2]) {
        if (verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.all[4] != 1) clickBox(5)
        else if (verifiedBoxes.all[5] != 1) clickBox(6)
        else availableBox()
    }
    else if (verifiedBoxes.x[3]) {
        if (verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.all[4] != 1) clickBox(5)
        else if (verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.all[7] != 1) clickBox(8)
        else availableBox()
    }
    else if (verifiedBoxes.x[4]) {
        if (verifiedBoxes.all[0] != 1) clickBox(1)
        else if (verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.all[3] != 1) clickBox(4)
        else if (verifiedBoxes.all[5] != 1) clickBox(6)
        else if (verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.all[7] != 1) clickBox(8)
        else if (verifiedBoxes.all[8] != 1) clickBox(9)
        else availableBox()
    }
    else if (verifiedBoxes.x[5]) {
        if (verifiedBoxes.all[1] != 1) clickBox(2)
        else if (verifiedBoxes.all[2] != 1) clickBox(3)
        else if (verifiedBoxes.all[4] != 1) clickBox(5)
        else if (verifiedBoxes.all[7] != 1) clickBox(8)
        else if (verifiedBoxes.all[8] != 1) clickBox(9)
        else availableBox()
    }
    else if (verifiedBoxes.x[6]) {
        if (verifiedBoxes.all[3] != 1) clickBox(4)
        else if (verifiedBoxes.all[4] != 1) clickBox(5)
        else if (verifiedBoxes.all[7] != 1) clickBox(8)
        else availableBox()
    }
    else if (verifiedBoxes.x[7]) {
        if (verifiedBoxes.all[3] != 1) clickBox(4)
        else if (verifiedBoxes.all[4] != 1) clickBox(5)
        else if (verifiedBoxes.all[5] != 1) clickBox(6)
        else if (verifiedBoxes.all[6] != 1) clickBox(7)
        else if (verifiedBoxes.all[8] != 1) clickBox(9)
        else availableBox()
    }
    else if (verifiedBoxes.x[8]) {
        if (verifiedBoxes.all[4] != 1) clickBox(5)
        else if (verifiedBoxes.all[5] != 1) clickBox(6)
        else if (verifiedBoxes.all[7] != 1) clickBox(8)
        else availableBox()
    }

}

function availableBox() { // funkcja pomocnicza do funkcji easyAI() oraz adjacentBox() - zajmij pierwszy lub ostatni wolny box w sposob randomowy

    firstAvailableBox = verifiedBoxes.all.indexOf(0)
    lastAvailableBox = verifiedBoxes.all.lastIndexOf(0)
    randomNr = Math.floor(Math.random() * 2) + 1
    if (randomNr == 1) clickBox(firstAvailableBox + 1)
    else if (randomNr == 2) clickBox(lastAvailableBox + 1)

}