const fs = require("fs");

function readMatrix(filePath) {
    return fs.readFileSync(filePath, "utf-8").split("\n").map(line => line.split(''));
}

const matrix = readMatrix("./6/input6.txt");

function isValidPosition(matrix, i, j) {
    return i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length;
}

function rotate90deg(direction) {
    let string = JSON.stringify(direction);
    if (string == "[-1,0]") {
        return [0, 1];
    }
    if (string == "[0,1]") {
        return [1, 0];
    }
    if (string == "[1,0]") {
        return [0, -1];
    }
    if (string == "[0,-1]") {
        return [-1, 0];
    }
    return direction;
}

function findGuard(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == "^") {
                return [i, j];
            }
        }
    }
}
// I BELIEVE THIS FUNCTION WORKS
function solve(matrix) {
    let count = 0;
    let guardPosition = findGuard(matrix);
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == "."  ) {
                let matrixCopy = JSON.parse(JSON.stringify(matrix));
                matrixCopy[i][j] = "#";
                if (navigateMatrix(matrixCopy, guardPosition)) {
                    count++;
                }
            }
        }
    }
    return count;
}
//WORKS
function walk(matrix) {
    let guardPosition = findGuard(matrix);
    let direction = [-1, 0];
    let visited = new Set();

    while (isValidPosition(matrix, guardPosition[0], guardPosition[1])) {
        matrix[guardPosition[0]][guardPosition[1]] = "^";
        if (!(visited.has(JSON.stringify(guardPosition)))) {
            // se la casella in cui mi trovo non è ancora una X, aggiungo un passo e cerco il prossimo
            visited.add(JSON.stringify(guardPosition));
        }
        matrix[guardPosition[0]][guardPosition[1]] = "X";
        let nextPosition = [guardPosition[0] + direction[0], guardPosition[1] + direction[1]];
        if (isValidPosition(matrix, nextPosition[0], nextPosition[1]) && matrix[nextPosition[0]][nextPosition[1]] == "#") {
            // se la prossima casella è un muro, cambio direzione
            direction = rotate90deg(direction);
            nextPosition = [guardPosition[0] + direction[0], guardPosition[1] + direction[1]];
        }

        guardPosition = nextPosition;

    }
    return matrix;
}

function navigateMatrix(matrix, guardPosition) {
    let direction = [-1, 0];
    let visitedDirections = new Set();
    let hitWalls = new Set();
    while (isValidPosition(matrix, guardPosition[0], guardPosition[1])) {

        matrix[guardPosition[0]][guardPosition[1]] = "^";
        // const tuple = JSON.stringify([guardPosition, direction]);
        // if (visitedDirections.has(tuple)) {
        //     return true;
        // }
        // visitedDirections.add(tuple);
        matrix[guardPosition[0]][guardPosition[1]] = "X";
        let nextPosition = [guardPosition[0] + direction[0], guardPosition[1] + direction[1]];
        
        if (isValidPosition(matrix, nextPosition[0], nextPosition[1]) && matrix[nextPosition[0]][nextPosition[1]] == "#") {
            const secondTuple = JSON.stringify([nextPosition, direction]);
            if (hitWalls.has(secondTuple)) {
                return true;
            }
            hitWalls.add(secondTuple);
            direction = rotate90deg(direction);
            nextPosition = [guardPosition[0] + direction[0], guardPosition[1] + direction[1]];
            if (matrix[nextPosition[0]][nextPosition[1]] == "#") {
                continue;
            }
        }
        guardPosition = nextPosition;
    }

    return false;
}
function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(i)
        console.log(matrix[i].le)
        console.log(matrix[i].join(''));
    }
}
const result = solve(matrix);
console.log("Mia risposta: ", result);
console.log("Risposta corretta: 1586");
if (result === 1586) {
    console.log("Test passed");
} else {
    console.log("Test failed");
}
