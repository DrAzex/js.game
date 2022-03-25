let LivingCreature = require("./LivingCreature")

module.exports = class Grass extends LivingCreature{

    constructor(x, y, id, matrix, objectsMatrix) {
        super(x,y,id,matrix)
        this.objectsMatrix = objectsMatrix;
        this.energy = 0;
    

    }
    chooseCells(characterId) {
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let coordinates = this.directions[i];
            let x = coordinates[0];
            let y = coordinates[1];
            if (x >= 0 && x < this.matrix[0].length && y >= 0 && y < this.matrix.length) {


                if (this.matrix[y][x] == characterId) {
                    found.push(coordinates);

                }
            }
        }
        return found;
    }
    multiply() {
        this.energy++;

        let targetCells = this.chooseCells(0);
        let newCell = random(targetCells);

        if (this.energy >= 8 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;

            let newGrass = new Grass(newX, newY, this.id, this.matrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newGrass;

            this.energy = 0;
        }
    }
    update() {
        this.multiply();
    }
}