const header = document.querySelector('header');

let now = null;
let gapBetweenChange = null;

let milliTick = setInterval(function () {
    now = new Date().getMilliseconds();
    gapBetweenChange = 1000 - now;
}, 1);

let secondTick = setInterval(function () {
    let setStart = setTimeout(function () { 

        let reaD = fetch('./key/password.txt')
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log("***");
                console.log(`Active Answer: ${data}`);
                console.log(`Millisecond count: ${now}`);
                console.log("***");
            })


    }, gapBetweenChange );
}, 1000);