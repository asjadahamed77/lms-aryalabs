import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser'
import "./config/db.js";


//App Config
const app = express()
const port = process.env.PORT || 4000

const allowedOrigins = ['http://localhost:5173']


app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))

//API Endpoints

app.get('/',(req,res)=>{
    res.send("API WORKING...")
})

app.listen(port,()=> console.log("Server Started on Port",port))
