
const fs = require("fs");

function readInput(filePath) {
    return fs.readFileSync(filePath, "utf-8").split("\n").map(line => line.split(': '));
}
const input = readInput("./7/input7.txt");

let map = [];

for (let i = 0; i < input.length; i++) {
    const value = Number(input[i][0]);
    const array = input[i][1].split(' ').map(Number);
    let tuple = [value, array];
    map.push(tuple);
}

function mul(n1,n2) {
    return n1*n2;
}
function sum(n1,n2) {
    return n1+n2;
}
function unite(n1,n2) {
    return Number(n1+""+n2);
}

function fromNumberToBinary(n, totalBits) {
    let binary = [];
    while (n > 0) {
        binary.push(n % 3);
        n = Math.floor(n / 3);
    }
    while (binary.length < totalBits) {
        binary.push(0);
    }
    return binary.reverse();
}

function fromBinaryToOperations(binary) {
    let operations = [];
    for (let i = 0; i < binary.length; i++) {
        if (binary[i] == 0) {
            operations[i] = mul;
        } else if (binary[i] == 1) {
            operations[i] = sum;
        } else {
            operations[i] = unite;
        }
    }
    return operations;
}

function calculateTotal(goal, values, operations) {
    let total = 0;
    for (let i = 0; i < operations.length; i++) {
        if (i == 0) {
            total = operations[i](values[i], values[i+1]);
        } else {
            let newtotal = operations[i](total, values[i+1]);
            if (newtotal > goal) {
                return false;
            }
            total = newtotal;
        }
        
    }
    if (total == goal) {
        console.log("Trovato",total,  goal, values, operations.map(op => op.name));
        return true;
    } else {
        return false;
    }
}

function solve(map) {
    let result =  0;
    for (let i = 0; i < map.length; i++) {
        let totalBits = map[i][1].length-1;
        let maxCounter = Math.pow(3, totalBits);
        console.log("maxCounter", maxCounter);
        let valid = false;
        for (let j = 0; j < maxCounter; j++) {
            const binary = fromNumberToBinary(j, totalBits);
            const operations = fromBinaryToOperations(binary);
            if (calculateTotal(map[i][0], map[i][1], operations)) {
                valid = true;
                break;
            }
        }
        if (valid) {
            result += map[i][0];
        }

    }
    return result;
    
}
console.log(solve(map));