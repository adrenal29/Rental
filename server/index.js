const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const EmployeeModel = require("./models/User")
const PropertyModel = require("./models/Property")
// const authRoutes = require("./routes/auth.js")
// const listingRoutes = require("./routes/listing.js")
// const bookingRoutes = require("./routes/booking.js")
// const userRoutes = require("./routes/user.js")

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
// app.use("/auth", authRoutes)
// app.use("/properties", listingRoutes)
// app.use("/bookings", bookingRoutes)
// app.use("/users", userRoutes)

/* MONGOOSE SETUP */
const PORT = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "rentify",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));

  app.post("/login", (req, res) => {
   const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Send success response along with userType
                    res.json({status: "Success", userType: user.userType,email:user.email,});
                } else {
                    res.json({status: "Failure", message: "The password is incorrect"});
                }
            } else {
                res.json({status: "Failure", message: "No record existed"});
            }
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).json({status: "Error", message: "Server error occurred"});
        });
})

app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

try{
app.post('/postProperty',(req,res)=>{
    console.log(req.body)
    PropertyModel.create(req.body)
    .then(property => res.json(property))
    .catch(err => res.json(err))
})
}catch(err){
    console.log(err)
}

app.get('/getSellerProperties', (req, res) => {
    const userEmail = req.query.email; 
    console.log(userEmail)
    PropertyModel.find({ email: userEmail })
        .then(properties =>{
            console.log(properties)
            res.json(properties)
        } )
        .catch(err => res.json(err));
});
app.get('/getProperties', (req, res) => {
    PropertyModel.find()
        .then(properties =>{
            console.log(properties)
            res.json(properties)
        } )
        .catch(err => res.json(err));
});