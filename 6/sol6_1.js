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
    console.log("Inizio a trovare la posizione del guardiano");
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == "^") {
                console.log("Guardiano trovato");
                return [i, j];
            }
        }
    }
}
function solve(matrix) {
    console.log("Inizio a risolvere il problema");
    let guardPosition = findGuard(matrix);
    let direction = [-1, 0];
    let steps = 0;
    let visited = new Set();
    
    while (isValidPosition(matrix, guardPosition[0], guardPosition[1])) {
        matrix[guardPosition[0]][guardPosition[1]] = "^";
        console.log(visited.has(guardPosition))
        if (!(visited.has(JSON.stringify(guardPosition)))) {
            // se la casella in cui mi trovo non è ancora una X, aggiungo un passo e cerco il prossimo
            
            visited.add(JSON.stringify(guardPosition));
            steps++;
            
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
    console.log("Last position: " + guardPosition);
    printMatrix(matrix);
    return steps;
}
function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(i)
        console.log(matrix[i].join(''));
    }
}
let sum = solve(matrix);
console.log(sum)