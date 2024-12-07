const fs = require("fs");
const input = fs.readFileSync("./5/input5_1.txt", "utf-8").split("\n");
const couples = input.map(line => line.split("|").map(Number));
const updates = fs.readFileSync("./5/input5_2.txt", "utf-8").split("\n").map(line => line.split(",").map(Number));

function isValid(update, MustBeBefore) {
    let valid = true
    for (let i = 0; i < update.length - 1; i++) {
        let remaining = update.slice(i + 1);
        let current = update[i];
        for (let j = 0; j < remaining.length; j++) {
            let verified = remaining[j];
            if (MustBeBefore.has(current) && MustBeBefore.get(current).includes(verified)) {
                valid = false;
            }
        }
    }
    return valid;
}
function solve(couples, updates) {
    let sum = 0;
    let MustBeBefore = new Map();
    for (let i = 0; i < couples.length; i++) {
        if (MustBeBefore.has(couples[i][1])) {
            MustBeBefore.get(couples[i][1]).push(couples[i][0]);
        } else {
            MustBeBefore.set(couples[i][1], [couples[i][0]]);
        }
    }

    for (let i = 0; i < updates.length; i++) {
        if (!isValid(updates[i], MustBeBefore)) {
            console.log("Not valid");
            sum += reordered(updates[i], MustBeBefore);
        }
    }
    console.log(sum);
}
function reordered(update, MustBeBefore) {
    let middle = Math.floor(update.length / 2);
    while (!isValid(update, MustBeBefore)) {
        console.log(update)
        for (let i = 0; i < update.length-1; i++) {
            let current = update[i];
            let modified = false;
            for (let j = i + 1; j < update.length; j++) {
                let verified = update[j];
                if (MustBeBefore.has(current) && MustBeBefore.get(current).includes(verified)) {
                    let temp = update[i];
                    update[i] = update[j];
                    update[j] = temp;
                    modified = true;
                }
            }
            if (modified) {
                break;
            }
        }
    };
    return update[middle];
}
solve(couples, updates);