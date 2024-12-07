const fs = require("fs");
const input = fs.readFileSync("./2/input2.txt", "utf-8").split("\n");
console.log(input.length);
let count = 0;
for (let i = 0; i < input.length; i++) {
    let array = input[i].split(" ");
    array = array.map(Number);
    
    if (safe) {
        count++;
    }
}
function isSafe(array) {
    let safe = true;
    let isIncreasing = array[0] < array[1];
    for (let j = 0; j < array.length ; j++) {
        if (j == 0) {
            continue;
        }

        if (isIncreasing && array[j-1] > array[j]) {
            console.log("No");
            safe = false;
        }
        if (!isIncreasing && array[j-1] < array[j]) {
            console.log("No");
            safe = false;
        }
        const result = Math.abs(Number(array[j - 1]) - Number(array[j]))

        if (!(result >= 1 && result <= 3)) {
            console.log("No");
            safe = false;
        }
    }
}
console.log(count);