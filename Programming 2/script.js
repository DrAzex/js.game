const matrix = createMatrix(20, 20);
const objectsMatrix = createObjectsMatrix(matrix);
const side = 30;
const socket = io();

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background("grey")
    frameRate(5);

}

function draw() {
    drawMatrix(matrix);
    updateObjectsMatrix(objectsMatrix);
}

io.socket.on('display message',newMatrix)

function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                fill("green");
            } else if (matrix[y][x] === 2) {
                fill("yellow");
            } else if (matrix[y][x] === 3) {
                fill("red");
            } else if (matrix[y][x] === 4) {
                fill("purple");
            } else if (matrix[y][x] === 5) {
                fill("blue");
            } else {
                fill("while");
            }
            rect(x * side, y * side, side, side);
        }

    }

}

io.socket.on('display message',matrix)

function updateObjectsMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const object = matrix[y][x];
            if (object) {
                object.update();
            }
        }

    }
}