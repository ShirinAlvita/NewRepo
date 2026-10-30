
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

// Secret key used for JWT
const SECRET_KEY = "mysecretkey";

// Sample user credentials
var users = [
    { username: "admin", password: "12345" }
];

// Student data
var students = [
    { id: 1, name: "Ananya", marks: 90 },
    { id: 2, name: "Rahul", marks: 85 }
];

// LOGIN - Generate JWT token
app.post("/login", function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    var user = users.find(function(u) {
        return u.username == username &&
               u.password == password;
    });

    if (user) {

        var token = jwt.sign(
            { username: username },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token: token
        });

    }
    else {
        res.status(401).send("Invalid username or password");
    }

});

// MIDDLEWARE - Verify JWT token
function verifyToken(req, res, next) {

    var authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).send("Access denied. Token required");
    }

    var token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).send("Invalid token format");
    }

    jwt.verify(token, SECRET_KEY, function(err, decoded) {

        if (err) {
            return res.status(401).send("Invalid or expired token");
        }

        req.user = decoded;
        next();

    });

}

// CREATE - Insert student (Authorized)
app.post("/students", verifyToken, function(req, res) {

    var ob = {
        id: req.body.id,
        name: req.body.name,
        marks: req.body.marks
    };

    students.push(ob);

    res.send("Student inserted successfully");

});

// READ - Display students (Authorized)
app.get("/students", verifyToken, function(req, res) {

    res.json(students);

});

// UPDATE - Update student (Authorized)
app.put("/students/:id", verifyToken, function(req, res) {

    var id = Number(req.params.id);
    var found = false;

    for (var i = 0; i < students.length; i++) {

        if (students[i].id == id) {

            students[i].name = req.body.name;
            students[i].marks = req.body.marks;

            found = true;
            break;
        }
    }

    if (found) {
        res.send("Student updated successfully");
    }
    else {
        res.status(404).send("Student not found");
    }

});

// DELETE - Delete student (Authorized)
app.delete("/students/:id", verifyToken, function(req, res) {

    var id = Number(req.params.id);
    var found = false;

    for (var i = 0; i < students.length; i++) {

        if (students[i].id == id) {

            students.splice(i, 1);

            found = true;
            break;
        }
    }

    if (found) {
        res.send("Student deleted successfully");
    }
    else {
        res.status(404).send("Student not found");
    }

});

// Start server
app.listen(3000, function() {

    console.log("Server running on port 3000");

});
