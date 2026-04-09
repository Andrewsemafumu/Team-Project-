require("dotenv/config");

const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app);
const port = process.env.PORT
const cors = require("cors");
const middleware = require("./middleware/middelware");

require("./config/connectSql")

// config server, config json, url encode
app.set('trust proxy', true);
app.use(express.json({ limit: '300mb' }));
app.use(express.urlencoded({limit: '300mb', extended: true }));

// config C.O.R.S
app.use(cors({
    origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"],
    allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Tokenizer', 'Authorization'],
    credentials: true
}));

// test route http://localhost:3000/api/test
app.get("/api/test", (req, res)=>{
    res.send("Hello!")
});


// base root route
const ROOT_URL = "/api/v1/smartcare"






// allow all roles
app.use(middleware.checkRole([]));

// route for public (include not auth)

app.get("/allroletest", (req, res)=>{
    res.send("Public Route!")
})




//check role login already
app.use(middleware.checkRole(["ADMIN", "RECEPTION", "DOCTOR", "CLIENT"]));

// route for all roles in system

app.get("/privaterole", (req, res)=>{
    res.send("Private Route!")
})



//check role login already
app.use(middleware.checkRole(["ADMIN", "RECEPTION", "DOCTOR"]));

// route for ADMIN, RECEPTION, DOCTOR

app.get("/privaterole", (req, res)=>{
    res.send("Local Role Route!")
})





//check role admin and reception already
app.use(middleware.checkRole(["ADMIN", "RECEPTION"]));

// Route for Manager roles

app.get("/managerrole", (req, res)=>{
    res.send("Manager Route!")
})





//check role admin only 
app.use(middleware.checkRole(["ADMIN"]));

// Route for Admin role

app.get("/adminrole", (req, res)=>{
    res.send("Local Role Route!")
})





// start server listen at port
server.listen(port , ()=>{
    console.log(`App running on port ${port}`);
})
