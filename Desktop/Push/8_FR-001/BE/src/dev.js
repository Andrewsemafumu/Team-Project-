require("dotenv/config");

const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app);
const port = process.env.PORT
const cors = require("cors");
const middleware = require("./middleware/middelware");
const authController = require("./controller/auth.controller");
const bookingController = require("./controller/booking.controller");
const specialtyController = require("./controller/specialty.controller");
const UserController = require("./controller/user.controller");
const recordController = require("./controller/record.controller");

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

// route for get all specialty http://localhost:3000/api/v1/smartcare/specialty/all method get
app.get(ROOT_URL + "/specialty/all", new specialtyController().getall);

// route for login http://localhost:3000/api/v1/smartcare/auth/register method post
app.post(ROOT_URL + "/auth/login", new authController().login);

// route for create account http://localhost:3000/api/v1/smartcare/auth/login method post
app.post(ROOT_URL + "/auth/register", new authController().register);






//check role login already
app.use(middleware.checkRole(["ADMIN", "RECEPTION", "DOCTOR", "CLIENT"]));

// route for get all user http://localhost:3000/api/v1/smartcare/user/all method get
app.get(ROOT_URL + "/user/all", new UserController().getall);

// route for update account info infor http://localhost:3000/api/v1/smartcare/account/change method post
app.put(ROOT_URL + "/account/change", new UserController().edit);

// route for change password http://localhost:3000/api/v1/smartcare/account/changepass method post
app.put(ROOT_URL + "/account/changepass", new UserController().edit_pass);

// route for get all doctor freetime base startdate, enddate and doctorID http://localhost:3000/api/v1/smartcare/booking/freetime method get
app.get(ROOT_URL + "/doctor/freetime", new bookingController().getdoctor_freetime);

// route for get a booking http://localhost:3000/api/v1/smartcare/booking method get
app.get(ROOT_URL + "/booking", new bookingController().get);

// route for get all booking base on clientID http://localhost:3000/api/v1/smartcare/booking/patient/all method get
app.get(ROOT_URL + "/booking/patient/all", new bookingController().getallfor_patient);

// route for get all booking base on doctorID http://localhost:3000/api/v1/smartcare/booking/doctor/all method get
app.get(ROOT_URL + "/booking/doctor/all", new bookingController().getallfor_doctor);

// route for create booking http://localhost:3000/api/v1/smartcare/booking method post
app.post(ROOT_URL + "/booking", new bookingController().create);

// route for edit booking http://localhost:3000/api/v1/smartcare/booking method put
app.put(ROOT_URL + "/booking", new bookingController().edit);

// route for delete booking http://localhost:3000/api/v1/smartcare/booking method delete
app.delete(ROOT_URL + "/booking", new bookingController().delete);

// route for get a diagnose http://localhost:3000/api/v1/smartcare/diagnose method get
app.get(ROOT_URL + "/diagnose", new recordController().get);

// route for get all diagnose history of one patient http://localhost:3000/api/v1/smartcare/diagnose/history method get
app.get(ROOT_URL + "/diagnose/history", new recordController().get_history);

// route for create a diagnose http://localhost:3000/api/v1/smartcare/diagnose method post
app.post(ROOT_URL + "/diagnose", new recordController().create);

// route for update a diagnose http://localhost:3000/api/v1/smartcare/diagnose method put
app.put(ROOT_URL + "/diagnose", new recordController().update);



//check role login already
app.use(middleware.checkRole(["ADMIN", "RECEPTION", "DOCTOR"]));





//check role admin and reception already
app.use(middleware.checkRole(["ADMIN", "RECEPTION"]));

// route for get all booking http://localhost:3000/api/v1/smartcare/booking/all method get
app.get(ROOT_URL + "/booking/all", new bookingController().getall);

// route for get user http://localhost:3000/api/v1/smartcare/user method get
app.get(ROOT_URL + "/user", new UserController().get);

// route for create new user http://localhost:3000/api/v1/smartcare/user method post
app.post(ROOT_URL + "/user", new UserController().add);

// route for delete user http://localhost:3000/api/v1/smartcare/user method delete
app.delete(ROOT_URL + "/user", new UserController().delete);

// route for mod user http://localhost:3000/api/v1/smartcare/user method put
app.put(ROOT_URL + "/user", new UserController().edit);


//check role admin only 
app.use(middleware.checkRole(["ADMIN"]));

// route for get specialty http://localhost:3000/api/v1/smartcare/specialty method get
app.get(ROOT_URL + "/specialty", new specialtyController().get);

// route for create new specialty http://localhost:3000/api/v1/smartcare/specialty method post
app.post(ROOT_URL + "/specialty", new specialtyController().create);

// route for edit specialty http://localhost:3000/api/v1/smartcare/specialty method put
app.put(ROOT_URL + "/specialty", new specialtyController().edit);

// route for delete specialty http://localhost:3000/api/v1/smartcare/specialty method delete
app.delete(ROOT_URL + "/specialty", new specialtyController().delete);






// start server listen at port
server.listen(port , ()=>{
    console.log(`App running on port ${port}`);
})
