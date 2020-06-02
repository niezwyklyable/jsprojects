
class Figure {

    constructor(type, posY) {

        this.stateNum = 0
        this.pos = {
            x: 3,
            y: posY
        }
        this.speedX = 1
        this.speedY = 1
        this.settled = false
        this.truthTableLeft = [false]
        this.truthTableRight = [false]
        this.collisionLeft = false
        this.collisionRight = false
        this.hardDropUsed = false

        if (type == 0) { // O-block

            this.color = 'yellow'
            this.matStates = [
                [
                    [1, 1],
                    [1, 1]
                ]
            ]

        } else if (type == 1) { // I-block

            this.color = 'blue'
            this.matStates = [
                [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0]
                ]
            ]

        } else if (type == 2) { // T-block

            this.color = 'purple'
            this.matStates = [
                [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 1, 0]
                ],
                [
                    [0, 1, 0],
                    [1, 1, 0],
                    [0, 1, 0]
                ],
                [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                [
                    [0, 1, 0],
                    [0, 1, 1],
                    [0, 1, 0]
                ]
            ]

        } else if (type == 3) { // S-block

            this.color = 'red'
            this.matStates = [
                [
                    [0, 1, 1],
                    [1, 1, 0],
                    [0, 0, 0]
                ],
                [
                    [0, 1, 0],
                    [0, 1, 1],
                    [0, 0, 1]
                ],
                [
                    [0, 0, 0],
                    [0, 1, 1],
                    [1, 1, 0]
                ],
                [
                    [1, 0, 0],
                    [1, 1, 0],
                    [0, 1, 0]
                ]
            ]

        } else if (type == 4) { // Z-block

            this.color = 'green'
            this.matStates = [
                [
                    [1, 1, 0],
                    [0, 1, 1],
                    [0, 0, 0]
                ],
                [
                    [0, 0, 1],
                    [0, 1, 1],
                    [0, 1, 0]
                ],
                [
                    [0, 0, 0],
                    [1, 1, 0],
                    [0, 1, 1]
                ],
                [
                    [0, 1, 0],
                    [1, 1, 0],
                    [1, 0, 0]
                ]
            ]

        } else if (type == 5) { // L-block

            this.color = 'orange'
            this.matStates = [
                [
                    [0, 1, 0],
                    [0, 1, 0],
                    [0, 1, 1]
                ],
                [
                    [0, 0, 0],
                    [1, 1, 1],
                    [1, 0, 0]
                ],
                [
                    [1, 1, 0],
                    [0, 1, 0],
                    [0, 1, 0]
                ],
                [
                    [0, 0, 1],
                    [1, 1, 1],
                    [0, 0, 0]
                ]
            ]

        } else if (type == 6) { // J-block

            this.color = 'pink'
            this.matStates = [
                [
                    [0, 1, 0],
                    [0, 1, 0],
                    [1, 1, 0]
                ],
                [
                    [1, 0, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                [
                    [0, 1, 1],
                    [0, 1, 0],
                    [0, 1, 0]
                ],
                [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 0, 1]
                ]
            ]

        }

        this.matrix = this.matStates[this.stateNum]

    }

}
