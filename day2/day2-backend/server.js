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

   app.post('/api/drinks',async(req,res)=>{
    try{
        const newDrink=new drink(res.body);
        await newDrink.save();
        res.status(201).json({message:'new drink added successfully',drink:newDrink});
    }catch{
        res.status(400).json({error:error.message});
    }
   })

   app.get('/api/drinks', async (req, res) => {
    try {
        const allDrinks = await drink.find(); // .find() grabs everything in the collection
        res.status(200).json(allDrinks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/drinks/:id', async (req, res) => {
    try {
        // findByIdAndUpdate takes 3 things: the ID, the new data, and a rule to return the updated version
        const updatedDrink = await drink.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Drink updated!", drink: updatedDrink });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/drinks/:id', async (req, res) => {
    try {
        await drink.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Drink removed from the menu." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}....`);
})   