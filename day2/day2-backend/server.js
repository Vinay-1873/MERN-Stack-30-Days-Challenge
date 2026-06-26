require('dotenv').config();
const express= require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const drink=require('./drink');

const app = express()
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
   .then(()=>console.log("Database connected successfully"))
   .catch(err=>console.log(err));
   

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}....`);
})   