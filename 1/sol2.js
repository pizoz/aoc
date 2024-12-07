const fs = require("fs");
const input  = fs.readFileSync("./fs.txt", "utf-8").split("\n");
let firstCol = [];
let secondCol = [];
for (let i = 0; i < input.length; i++) {
    let row = input[i].split(" ");
    firstCol.push(Number(row[0]));
    secondCol.push(Number(row[3]));
}
let map = new Map();
for (let i = 0; i  < secondCol.length; i++) {
    if (map.has(secondCol[i])) {
        map.set(secondCol[i], map.get(secondCol[i]) + 1);
    } else {
        map.set(secondCol[i], 1);
    }
}
let sum = 0;
for ( let i = 0; i < firstCol.length; i++) {
    let value = map.get(firstCol[i]);
    if (value === null || value === undefined) {
        value = 0;
    }
    sum += firstCol[i] * value;
}
console.log(sum);