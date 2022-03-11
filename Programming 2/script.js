const matrix = createMatrix(20, 20);
const objectsMatrix = createObjectsMatrix(matrix);
const side = 30;

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background("grey")
    frameRate(5);

}

function draw() {
    drawMatrix(matrix);
    updateObjectsMatrix(objectsMatrix);
}




function createMatrix(horizontaLength, verticalLength) {
    const newMatrix = [];

    for (let y = 0; y < verticalLength; y++) {
        newMatrix[y] = [];
        for (let x = 0; x < horizontaLength; x++) {
            const randonSectionCursor = Math.random() * 100;

            if (randonSectionCursor < 20) {
                newMatrix[y][x] = 1;


            } else if (randonSectionCursor < 30) {
                newMatrix[y][x] = 2;

            } else if (randonSectionCursor < 40) {
                newMatrix[y][x] = 3;
            } else if (randonSectionCursor < 50) {
                newMatrix[y][x] = 4;
            } else if (randonSectionCursor < 60) {
                newMatrix[y][x] = 5;
            } else {
                newMatrix[y][x] = 0;
            }

        }

    }
    return newMatrix;
}
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
function createObjectsMatrix(matrix) {
    const newObjectsMatrix = [];

    for (let y = 0; y < matrix.length; y++) {
        newObjectsMatrix[y] = [];
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                const newGrass = new Grass(x, y, 1, matrix, newObjectsMatrix);
                newObjectsMatrix[y][x] = newGrass;
            } else if (matrix[y][x] === 2) {
                const newGrassEater = new GrassEater(x,y, 2 , matrix,newObjectsMatrix);
                newObjectsMatrix[y][x] = newGrassEater;
            } else if (matrix[y][x] === 3) {
                const newPredator = new Predator(x,y,3,matrix,newObjectsMatrix);
                newObjectsMatrix[y][x] = newPredator;
            } else if (matrix[y][x] === 4) {
                const newMan = new Man(x,y,4,matrix,newObjectsMatrix);
                newObjectsMatrix[y][x] = newMan;
            } else if (matrix[y][x] === 5) {
                const newDino = new Dino(x,y,5,matrix,newObjectsMatrix);
                newObjectsMatrix[y][x] = newDino; 
            } else {
                newObjectsMatrix[y][x] = null;
            }
        }
    }
    return newObjectsMatrix;
}
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