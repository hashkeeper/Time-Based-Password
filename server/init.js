const fs = require('fs');
const { fork } = require('child_process');
const express = require('express');

let now = null;
let gapBetweenChange = null;

let milliTick = setInterval(function () {
    now = new Date().getMilliseconds();
    gapBetweenChange = 1000 - now;
}, 1);

function cypher() {
  try {
    const runCypher = fork('./server/cypher.js');
  } catch (err) {
    if (err.code) {
      console.error(err.code);
    } else {
      console.error( err );
    }
  }
}

let secondTick = setInterval(function () {
    let setStart = setTimeout(function () { 
      console.log("***");
      
      cypher();

    }, gapBetweenChange )
}, 1000);


function checker(req, res) {
  let passResult = false;

  try {
    const runChecker = fork('./server/checker.js');
    runChecker.on('message', (result) => {
      passResult = result;
    })
  } catch (err) {
    if (err.code) {
      console.error(err.code);
    } else {
      console.error( err );
    }
  }

  if (passResult === false) {
    res.send("fail");
  } else if (passResult === true) {
    res.send("pass")
  }
}

// Launch server
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('./client'));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.post('/submit-form', (req, res) => {
  const { username, password } = req.body;
  
  fs.writeFileSync('./key/userinput.txt', password, {encoding:'utf8',flag:'w'});

  checker(req, res);
});
