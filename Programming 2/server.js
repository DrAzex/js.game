var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

const newMatrix = [];

function createMatrix(horizontaLength, verticalLength) {

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

io.sockets.emit('send matrix', newMatrix)

const Grassarr = [];
const GrassEaterarr = [];
const Manarr = [];
const Dinoarr = [];
const Predatorarr = [];



let Grass = require("./Grass")
let GrassEater = require("./GrassEater")
let Man = require("./Man")
let Dino = require("./Dino")
let Predator = require("./Predator")

function createObjectsMatrix(matrix) {
    const newObjectsMatrix = [];

    for (let y = 0; y < matrix.length; y++) {
        newObjectsMatrix[y] = [];
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                const newGrass = new Grass(x, y, 1, matrix, newObjectsMatrix);
                Grassarr.push(newGrass)
                newObjectsMatrix[y][x] = newGrass;
            } else if (matrix[y][x] === 2) {
                const newGrassEater = new GrassEater(x,y, 2 , matrix,newObjectsMatrix);
                GrassEaterarr.push(newGrassEater)
                newObjectsMatrix[y][x] = newGrassEater;
            } else if (matrix[y][x] === 3) {
                const newPredator = new Predator(x,y,3,matrix,newObjectsMatrix);
                Predatorarr.push(newPredator)
                newObjectsMatrix[y][x] = newPredator;
            } else if (matrix[y][x] === 4) {
                const newMan = new Man(x,y,4,matrix,newObjectsMatrix);
                Manarr.push(newMan)
                newObjectsMatrix[y][x] = newMan;
            } else if (matrix[y][x] === 5) {
                const newDino = new Dino(x,y,5,matrix,newObjectsMatrix);
                Dinoarr.push(newDino)
                newObjectsMatrix[y][x] = newDino; 
            } else {s
                newObjectsMatrix[y][x] = null;
            }
        }
    }
    return newObjectsMatrix;
}
io.sockets.emit('send matrix', matrix)


function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)


io.on('connection', function (socket) {
    createObjectsMatrix(matrix)
})
