const fs = require("fs");

function readMatrix(filePath) {
    return fs.readFileSync(filePath, "utf-8").split("\n").map(line => line.split(''));
}

function findXMAS(matrix) {
    let counter = 0;
    for (let i = 1; i < matrix.length-1; i++) {
        for (let j = 1; j < matrix[i].length-1; j++) {
            if (matrix[i][j] === "A") {
                let diagonal1 =  [matrix[i+1][j+1],matrix[i-1][j-1]]
                let diagonal2 =  [matrix[i-1][j+1],matrix[i+1][j-1]]
                if (((diagonal1[0] === "M" && diagonal1[1] === "S") || (diagonal1[0] === "S" && diagonal1[1] === "M"))&&((diagonal2[0] === "M" && diagonal2[1] === "S") || (diagonal2[0] === "S" && diagonal2[1] === "M"))) {
                    counter++;
                }
                
            }
        }
    }
    return counter;
}
const matrix = readMatrix("./4/input4.txt");
console.log(findXMAS(matrix));
