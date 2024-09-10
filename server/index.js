require("dotenv").config();
const express = require('express');
const cors = require('cors');

const app = express();

// Mount the Router : to use the router in your main express app,you can "mount" it at
// specific url prefix;
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router")
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewars/error-middleware");


// handle cors
const corsOption = {
    origin: 'http://localhost:5173',
    methods: " POST, GET, DELETE, HEAD,PUT,PATCH",
    credential: true
}
app.use(cors(corsOption));

// middleware
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// lets define admin route
app.use("/api/admin", adminRoute)


// app.get("/", (req, res) => {

//     res.status(200).send("Welcome, hello everyOne")
// });
// app.get("/register", (req, res) => {

//     res.status(200).send("Welcome, hello everyOne and this is register page")
// });

app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    });
});