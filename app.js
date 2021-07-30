document.addEventListener('DOMContentLoaded', () => {
    //this will load after the HTML has been completely loaded
    // not waiting for stylesheet, images, etc to be loaded

    const grid = document.querySelector('.grid');
    const squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    const width = 10; //this is the width of the grid, every block is one, every line has 10 blocks, so to go to the NEXT line, we add 10 blocks

    // The Tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2,],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;

    // randomly select a tetromino
    let random = Math.floor(Math.random() * theTetrominoes.length);
    // let randomPos = Math.floor(Math.random()*8);
    // console.log(random);

    let current = theTetrominoes[random][currentRotation];

    // draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    }

    // undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
    }

    timerId = setInterval(moveDown, 800);


    // assign functions to keyCodes
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            // moveDown();
        }
    }

    document.addEventListener('keyup', control);

    // move down by undrawing from the previous position and drawing to the new one - every block of the tetromino moves by +width
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    // we make a prediction: if the when adding the next +width from the current position the Tetromino moves out of the grid, then we push the whole Tetromino under the grid by adding the .taken class
    function freeze() {
        if (current.some(index =>
            squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));

            // drop new Tetromino
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();

        }
    }

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if (!isAtLeftEdge) currentPosition -= 1;

        // if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        //     currentPosition += 1;
        // }

        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        if (!isAtRightEdge) currentPosition += 1;

        // if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        //     currentPosition -= 1;
        // }

        draw();
    }

    // rotate the tetramino
    function rotate() {
         undraw();
         currentRotation++;
         if (currentRotation === current.length) {
             currentRotation = 0;
         }
         current = theTetrominoes[random][currentRotation];
         draw();
    }

})