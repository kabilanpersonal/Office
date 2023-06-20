const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Login"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    console.log(username,password);
    //var username="admin2@gmail.com";
    //var password="Admin@123";

    connection.query("SELECT * FROM login where Username = ? and Password = ?",[username,password],function(error,results,fields){
        console.log(results);
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/invalid");
        }
        res.end();
    })
})

// when login is success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")

})

// when login is fail
app.get("/invalid",function(req,res){
    res.sendFile(__dirname + "/invalid.html")
})


// set app port 
app.listen(4500);