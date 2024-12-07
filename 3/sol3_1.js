const fs = require("fs");
const input = fs.readFileSync("./3/input3.txt", "utf-8")
const divided = input.split("mul(")
let total = 0;
for (let i = 0; i < divided.length; i++) {
    let j = divided[i].indexOf(")");
    if (j >  7) {
        continue;
    }
    let numbersWithComma = divided[i].slice(0,j)
    let numbers = numbersWithComma.split(",").map(Number);
    if (!numbers[0] || !numbers[1]) {
        continue;
    }
    total += numbers[0]*numbers[1]
}
console.log("87163705")
console.log(total)