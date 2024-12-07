const fs = require("fs");

function readMatrix(filePath) {
    return fs.readFileSync(filePath, "utf-8").split("\n").map(line => line.split(''));
}

const directions = [[-1, -1], [-1, 0], [-1, 1],[0, -1], [0, 1],[1, -1], [1, 0], [1, 1]];

function isValidPosition(matrix, row, col) {
    return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
}

function findXMAS(matrix) {
    let counter = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "X") {
                directions.forEach(([dx, dy]) => {
                    let [newI, newJ] = [i + dx, j + dy];
                    if (isValidPosition(matrix, newI, newJ) && matrix[newI][newJ] === "M") {
                        counter += checkWord(matrix, newI, newJ, dx, dy);
                    }
                });
            }
        }
    }
    return counter;
}

function checkWord(matrix, i, j, dx, dy) {
    const word = "MAS";
    for (let k = 1; k < word.length; k++) {
        i += dx;
        j += dy;
        if (!isValidPosition(matrix, i, j) || matrix[i][j] !== word[k]) {
            return 0;
        }
    }
    return 1;
}

const matrix = readMatrix("./4/input4.txt");
console.log(findXMAS(matrix));