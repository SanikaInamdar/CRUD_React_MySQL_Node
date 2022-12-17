const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//Making variable(can be any) 'db' for making call to databse in mysql when writing Queries.
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "demo",
});

//Creating API endpoint
//when ceating a request with express, (req,res) means request and response -it is a standard
//To get something from frontend- req
//To give something to frontend- res

//here getting variables from the frontend
app.post("/create", (req, res) => {
    console.log(req.body.name);
    const name = req.body.name;
    //bkend             //frontend one
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query("INSERT INTO Employee (name,age,country,position,wage) values (?,?,?,?,?)", [name, age, country, position, wage], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Values Inserted");
        }
    });
});

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM Employee", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

app.put('/update', (req, res) => {
    const id = req.body.id;   //id received from frontend
    const wage = req.body.wage; //changed wage received from frontend
    db.query("UPDATE Employee SET wage = ? WHERE id= ?", [wage, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM Employee WHERE id= ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});
app.listen(3001, () => {
    console.log("yay backend server running");
});