
const express = require("express");
const app = express();

app.use(express.json());

// Temporary student records
var students = [
    { id: 1, name: "Ananya", marks: 90 },
    { id: 2, name: "Rahul", marks: 85 }
];

// CREATE - Insert a student
app.post("/students", function(req, res) {

    var ob = {
        id: req.body.id,
        name: req.body.name,
        marks: req.body.marks
    };

    students.push(ob);

    res.send("Student inserted successfully");
});

// READ - Display all students
app.get("/students", function(req, res) {

    res.json(students);

});

// UPDATE - Update a student
app.put("/students/:id", function(req, res) {

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
        res.send("Student not found");
    }

});

// DELETE - Delete a student
app.delete("/students/:id", function(req, res) {

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
        res.send("Student not found");
    }

});

// Start the server
app.listen(3000, function() {

    console.log("Server running on port 3000");

});
