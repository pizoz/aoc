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
    
    printMatrix(matrix);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == ".") {
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
    console.log("Last position: ", guardPosition);
    printMatrix(matrix);
    return matrix;
}

function navigateMatrix(matrix, guardPosition) {
    let direction = [-1, 0];
    let visitedDirections = new Set();
    let inALoop = false;
    while (isValidPosition(matrix, guardPosition[0], guardPosition[1])) {

        matrix[guardPosition[0]][guardPosition[1]] = "^";
        const tuple = JSON.stringify([guardPosition, direction]);
        if (visitedDirections.has(tuple)) {
            console.log(tuple);
            inALoop = true;
            break;
        }
        visitedDirections.add(tuple);
        matrix[guardPosition[0]][guardPosition[1]] = "X";
        let nextPosition = [guardPosition[0] + direction[0], guardPosition[1] + direction[1]];
        
        if (isValidPosition(matrix, nextPosition[0], nextPosition[1]) && matrix[nextPosition[0]][nextPosition[1]] == "#") {
            direction = rotate90deg(direction);
            nextPosition = [guardPosition[0] + direction[0], guardPosition[1] + direction[1]];
        }
        guardPosition = nextPosition;
    }

    return inALoop;
}
function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(i)
        console.log(matrix[i].join(' '));
    }
}
console.log(solve(matrix));