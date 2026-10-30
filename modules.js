
const os = require("os");
const http = require("http");
const fs = require("fs");
const path = require("path");

// OS MODULE
console.log("Operating System:", os.platform());

console.log("Architecture:", os.arch());

console.log("Free Memory:", os.freemem());


// PATH MODULE
console.log("File Name:", path.basename(__filename));


// FS MODULE
fs.writeFileSync("student.txt", "Welcome to Node.js");

console.log("File created successfully");


// HTTP MODULE
const server = http.createServer(function(req, res) {

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end("<h2>Welcome to Node.js Server</h2>");

});

server.listen(3000, function() {

    console.log("Server running at port 3000");

});
