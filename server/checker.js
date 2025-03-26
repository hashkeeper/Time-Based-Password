const { response } = require('express');
const fs = require('fs');

function readCypher() {
    return fs.readFileSync('./key/password.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }
    });
}

function readUserInput() {
    return fs.readFileSync('./key/userinput.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }
    })
}

let booL = false;
if(readCypher === readUserInput) {
    booL = true;
    process.send(booL);
} else if (readCypher !== readUserInput) {
    process.send(booL);
}