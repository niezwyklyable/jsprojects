
function rotation(fig) {

    if (fig.color == 'blue') { // I-block

        if (fig.stateNum == 0) {

            // kolizja z obu stron - brak rotacji
            if ((cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1 &&
                (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1 ||
                    cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 1] == 1 ||
                    cells.matrix[fig.pos.x + 1 + 4][20 - fig.pos.y - 1] == 1)) ||
                (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1 &&
                    (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1 ||
                        cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 1] == 1 ||
                        cells.matrix[fig.pos.x + 1 - 2][20 - fig.pos.y - 1] == 1)) ||
                cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 0 &&
                cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 0 &&
                cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 1] == 1 &&
                cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 1] == 1) {

                return

            } // kolizja tylko z lewej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } // kolizja tylko z prawej strony - rotacja wymuszona - przypadek nr 1
            else if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1) {

                fig.pos.x -= 2 * fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } // kolizja tylko z prawej strony - rotacja wymuszona - przypadek nr 2
            else if (cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 1] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 1) {

            // kolizja z gory i z dolu - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 0] == 1 ||
                cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 2] == 1 ||
                cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 3] == 1) {

                return

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 2) {

            // kolizja z obu stron - brak rotacji
            if ((cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 2] == 1 &&
                (cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 2] == 1 ||
                    cells.matrix[fig.pos.x + 1 + 4][20 - fig.pos.y - 2] == 1 ||
                    cells.matrix[fig.pos.x + 1 + 5][20 - fig.pos.y - 2] == 1)) ||
                (cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 2] == 1 &&
                    (cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 2] == 1 ||
                        cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 2] == 1 ||
                        cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 2] == 1)) ||
                cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 2] == 0 &&
                cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 2] == 0 &&
                cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 2] == 1 &&
                cells.matrix[fig.pos.x + 1 + 4][20 - fig.pos.y - 2] == 1) {

                return

            } // kolizja tylko z lewej strony - rotacja wymuszona - przypadek nr 1
            else if (cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 2] == 1) {

                fig.pos.x += 2 * fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } // kolizja tylko z lewej strony - rotacja wymuszona - przypadek nr 2
            else if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 2] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } // kolizja tylko z prawej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 2] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 3) {

            // kolizja z gory i z dolu - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 0] == 1 ||
                cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 1] == 1 ||
                cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 3] == 1) {

                return

            } else rotate(fig) // brak kolizji - rotacja swobodna

        }

    } else if (fig.color == 'purple') { // T-block

        if (fig.stateNum == 0) {

            // kolizja z gory - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 0] == 1) {

                return

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 1) {

            // kolizja z obu stron - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1 &&
                cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 1] == 1) {

                return

            } // kolizja tylko z prawej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 2) {

            // kolizja z dolu - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 2] == 1) {

                return

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 3) {

            // kolizja z obu stron - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1 &&
                cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 1] == 1) {

                return

            } // kolizja tylko z lewej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        }

    } else if (fig.color == 'red') { // S-block

        if (fig.stateNum == 0) {

            // kolizja z prawej strony - rotacja wymuszona
            if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 2] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 1) {

            // kolizja z obu stron - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 2] == 1 &&
                cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 1] == 1) {

                return

            }
            // kolizja z lewej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 2] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 2) {

            // kolizja z lewej strony i z gory - brak rotacji
            if ((cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 0] == 1 ||
                cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1) &&
                cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 0] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            }
            // kolizja z lewej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 0] == 1 ||
                cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 3) {

            // kolizja z obu stron - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 0] == 1 &&
                (cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 0] == 1 ||
                    cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 1] == 1 ||
                    cells.matrix[fig.pos.x + 1 - 2][20 - fig.pos.y - 1] == 1) ||
                cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 0] == 1 &&
                cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 0] == 1 &&
                cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 1] == 1) {

                return

            }
            // kolizja z prawej strony - rotacja wymuszona - przypadek nr 1
            else if (cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 0] == 1) {

                fig.pos.x -= 2 * fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            }
            // kolizja z prawej strony - rotacja wymuszona - przypadek nr 2
            else if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 0] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        }

    } else if (fig.color == 'green') { // Z-block

        if (fig.stateNum == 0) {

            // kolizja z obu stron - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 0] == 1 &&
                cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 2] == 1) {

                return

            }
            // kolizja z prawej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 0] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 1) {

            // kolizja z obu stron - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1 &&
                cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 2] == 1) {

                return

            }
            // kolizja z lewej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 2) {

            // kolizja z gory - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 0] == 1) {

                return

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 3) {

            // kolizja z obu stron - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 0] == 1 &&
                cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 1] == 1 ||
                cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1 &&
                cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 0] == 1) {

                return

            }
            // kolizja z lewej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 0] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            }
            // kolizja z prawej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        }

    } else if (fig.color == 'orange') { // L-block

        if (fig.stateNum == 0) {

            // kolizja z obu stron - brak rotacji
            if ((cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1 ||
                cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 2] == 1) &&
                cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 1] == 1 ||
                cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1 &&
                (cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 1] == 1 ||
                    cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 2] == 1)) {

                return

            }
            // kolizja tylko z lewej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1 ||
                cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 2] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            }
            // kolizja tylko z prawej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 1) {

            // kolizja z gory - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 0] == 1 ||
                cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 0] == 1) {

                return

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 2) {

            // kolizja z obu stron - brak rotacji
            if ((cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 0] == 1 ||
                cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1) &&
                cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 1] == 1 ||
                cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1 &&
                (cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 0] == 1 ||
                    cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 1] == 1)) {

                return

            }
            // kolizja tylko z lewej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            }
            // kolizja tylko z prawej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 0] == 1 ||
                cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log(fig.pos.x)

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 3) {

            // kolizja z gory - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 0] == 1) {

                return

            } else rotate(fig) // brak kolizji - rotacja swobodna

        }

    } else if (fig.color == 'pink') { // J-block

        if (fig.stateNum == 0) {

            // kolizja z obu stron - brak rotacji
            if ((cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 0] == 1 ||
                cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1) &&
                cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 1] == 1 ||
                cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1 &&
                (cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 0] == 1 ||
                    cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 1] == 1)) {

                return

            }
            // kolizja tylko z lewej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 0] == 1 ||
                cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log('kolizja tylko z lewej strony')

            }
            // kolizja tylko z prawej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log('kolizja tylko z prawej strony')

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 1) {

            // kolizja z gory - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 0] == 1 &&
                cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 0] == 1) {

                return

            }
            // kolizja tylko z prawej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 0] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log('kolizja tylko z prawej strony')

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 2) {

            // kolizja z obu stron - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1 &&
                (cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 1] == 1 ||
                    cells.matrix[fig.pos.x + 1 + 3][20 - fig.pos.y - 2] == 1) ||
                (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1 ||
                    cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 2] == 1) &&
                cells.matrix[fig.pos.x + 1 - 1][20 - fig.pos.y - 1] == 1) {

                return

            }
            // kolizja tylko z lewej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 0][20 - fig.pos.y - 1] == 1) {

                fig.pos.x += fig.speedX
                rotate(fig)
                //console.log('kolizja tylko z lewej strony')

            }
            // kolizja tylko z prawej strony - rotacja wymuszona
            else if (cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 1] == 1 ||
                cells.matrix[fig.pos.x + 1 + 2][20 - fig.pos.y - 2] == 1) {

                fig.pos.x -= fig.speedX
                rotate(fig)
                //console.log('kolizja tylko z prawej strony')

            } else rotate(fig) // brak kolizji - rotacja swobodna

        } else if (fig.stateNum == 3) {

            // kolizja z gory - brak rotacji
            if (cells.matrix[fig.pos.x + 1 + 1][20 - fig.pos.y - 0] == 1) {

                return

            } else rotate(fig) // brak kolizji - rotacja swobodna

        }

    }

}

function rotate(fig) { // funkcja pomocnicza do funkcji rotation()

    if (fig.stateNum < fig.matStates.length - 1) fig.stateNum++
    else fig.stateNum = 0
    fig.matrix = fig.matStates[fig.stateNum]
    //console.log('stateNum: ' + fig.stateNum)

}
