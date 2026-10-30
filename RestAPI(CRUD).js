
const http = require('http');

var students = [
    { id: 1, name: "Ananya", marks: 90 },
    { id: 2, name: "Rahul", marks: 85 }
];

const server = http.createServer(function(req, res) {

    // CREATE - Insert
    if (req.method === 'POST' && req.url === '/students') {

        let body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {

            let ob = JSON.parse(body);

            students.push(ob);

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end("Student inserted successfully");

        });

    }

    // READ - Display
    else if (req.method === 'GET' && req.url === '/students') {

        res.writeHead(200, {'Content-Type': 'application/json'});

        res.end(JSON.stringify(students));

    }

    // UPDATE
    else if (req.method === 'PUT' && req.url.startsWith('/students/')) {

        let id = Number(req.url.split('/')[2]);

        let body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {

            let data = JSON.parse(body);

            let found = false;

            for (let i = 0; i < students.length; i++) {

                if (students[i].id === id) {

                    students[i].name = data.name;
                    students[i].marks = data.marks;

                    found = true;
                    break;
                }
            }

            res.writeHead(found ? 200 : 404);
            res.end(found ? "Student updated successfully" : "Student not found");

        });

    }

    // DELETE
    else if (req.method === 'DELETE' && req.url.startsWith('/students/')) {

        let id = Number(req.url.split('/')[2]);

        let found = false;

        for (let i = 0; i < students.length; i++) {

            if (students[i].id === id) {

                students.splice(i, 1);

                found = true;
                break;
            }
        }

        res.writeHead(found ? 200 : 404);
        res.end(found ? "Student deleted successfully" : "Student not found");

    }

    else {

        res.writeHead(404);
        res.end("Route not found");

    }

});

server.listen(3000, function() {
    console.log("Server running on port 3000");
});
