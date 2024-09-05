const express=require("express")
const dotenv=require("dotenv").config()
const cors=require("cors")
const bodyParser=require('body-parser')

const port =process.env.PORT||5000
const connectDB=require("./database/db")
const userRoutes=require("./routes/userRoutes")
const blogRoutes=require("./routes/blogRoutes")

const app=express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
connectDB()

app.get("/",(req,res)=>{
    res.send("hello world!")
})

app.use("/api/user",userRoutes)
app.use("/api/blog",blogRoutes)

app.listen(port,()=>{
    console.log(`server is running on at: localhost:${port}`)
})