require("dotenv").config()
const express = require("express") 
const app = express() 
const bodyParser = require("body-parser")
const cors = require("cors") 
const colors = require("colors")
const PORT = process.env.PORT ||3000  
const {dbConnect} = require("./connection")
const {userRouter} = require("./routes/userRoutes")
const {paperRouter} = require("./routes/paperRoutes")

// middleware 
app.use(bodyParser.urlencoded({extended: false}))
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json())
// app.use(cors({ origin: 'https://code-maestro-opal.vercel.app' }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://code-maestro-opal.vercel.app"); // Set the allowed origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Set the allowed HTTP methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Set the allowed headers
    next();
})
const corsOptions ={
    origin:'https://code-maestro-opal.vercel.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// DB Connection 
dbConnect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB Connection successfull".bgGreen.white)
}).catch(()=>{
    console.log("No DB Connection".bgRed.white)
})

// routes
app.use("/users",userRouter) 
app.use("/papers",paperRouter) 

// Server Connection 
app.listen(PORT,(()=>{
    console.log(`Listening on ${PORT}`.bgGreen.white)
}))