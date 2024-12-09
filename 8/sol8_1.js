const fs = require("fs");

function readMatrix(filePath) {
    return fs.readFileSync(filePath, "utf-8").split("\n").map(line => line.split(''));
}
const matrix = readMatrix("./8/input8.txt");

function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(''));
        console.log(matrix[i].length);
    }
}
fs.writeFileSync('outputMatrix.txt', matrix.map(row => row.join('')).join('\n'));
printMatrix(matrix);
// funzione che controlla se una posizione è valida
function isValidPosition(matrix, i, j) {
    return i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length;
}
// funzione che restituisce le coordinate di tutte le antenne di un certo tipo
function findPositions(matrix, char) {
    let usedChar = false;
    let positions = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === char) {
                usedChar = true;
                positions.push([i, j]);
            }
        }
    }
    if (usedChar) {
        return positions;
    }
    return null;
}

function findnewPoint(point1, point2) {
    // calcolo la distanza tra i due punti e la applico al primo punto
    const distance = [point1[0] - point2[0], point1[1] - point2[1]];
    return [point1[0] + distance[0], point1[1] + distance[1]];
}
function solve(matrix) {
    
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    // mi salvo un insieme con le soluzioni, cosi che non siano duplicate
    let solutions = new Set();
    for (let char of chars) {
        // per  ogni carattere cerco le posizioni nella matrice iniziale
        const positions = findPositions(matrix, char);
        // se esiste almeno un antenna con quel carattere allora posso continuare
        if (positions != null) {

            // itero su tutte le coppie di posizioni
            for (let i = 0; i < positions.length; i++) {
                for (let j = 0; j < positions.length; j++) {
                    // se la posizione è la stessa non la considero
                    if (i == j) {
                        continue;
                    }
                    // mi salvo le due posizioni
                    const point1 = positions[i];
                    const point2 = positions[j];
                    // cerco il punto nuovo: lo faccio singolarmente cosi non devo ciclare sulle posizioni restanti ma posso farlo su tutte
                    const newPoint = findnewPoint(point1, point2);
                    // se il punto è valido (all'interno della matrice) e non è gia stato aggiunto lo aggiungo
                    if (isValidPosition(matrix, newPoint[0], newPoint[1])) {
                        if (!solutions.has(JSON.stringify(newPoint))) {
                            
                            solutions.add(JSON.stringify(newPoint));
                            // se era un punto non antenna allora lo segno (l'effetto è solo visivo, non serve all'algoritmo)
                            if (matrix[newPoint[0]][newPoint[1]] == ".") {
                                matrix[newPoint[0]][newPoint[1]] = "#";
                            }
                        } else {
                            // console.log("Already added", newPoint);
                        }

                    } else {
                        // console.log("Not valid", newPoint);
                    }
                }
            }
        }

    }
    // scrivo le posizioni trovate e la matrice in altri due file
    const solutionsArray = Array.from(solutions).sort();
    const output = solutionsArray.join('\n');

    fs.writeFileSync('example.txt', output);
    fs.writeFileSync('outputMatrixFinal.txt', matrix.map(row => row.join('')).join('\n'));
    for (let i = 0; i < solutionsArray.length; i++) {
        console.log(solutionsArray[i]);
    }
    console.log(solutions.size);
    // printMatrix(matrix);
}

solve(matrix);