const fs = require("fs");
const input  = fs.readFileSync("./fs.txt", "utf-8").split("\n");
let firstCol = [];
let secondCol = [];
for (let i = 0; i < input.length; i++) {
    let row = input[i].split(" ");
    firstCol.push(Number(row[0]));
    secondCol.push(Number(row[3]));
}
firstCol= firstCol.sort((a, b) => a - b);
secondCol= secondCol.sort((a, b) => a - b);
let  sum = 0;
for (let i = 0; i < firstCol.length; i++) {
    sum += Math.abs(firstCol[i] - secondCol[i]);
}
console.log(firstCol);
console.log(secondCol);
console.log(sum);