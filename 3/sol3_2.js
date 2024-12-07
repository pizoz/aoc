const fs = require("fs");
const input = fs.readFileSync("./3/input3.txt", "utf-8")
function multiply(string) {
    const divided = string.split("mul(")
    let total = 0;
    for (let i = 0; i < divided.length; i++) {
        let j = divided[i].indexOf(")");
        if (j > 7) {
            continue;
        }
        let numbersWithComma = divided[i].slice(0, j)
        let numbers = numbersWithComma.split(",").map(Number);

        if (!numbers[0] || !numbers[1]) {
            continue;
        }
        total += numbers[0] * numbers[1]
    }
    return total;
}
const input2 = input.split("do")
let result = 0;
for (let i = 0; i < input2.length; i++) {
    if (input2[i].slice(0,5) == "n't()") {
        continue
    }
    if (input2[i].slice(0,2) == "()") {
        result += multiply(input2[i])
    }
    
}
console.log(result)