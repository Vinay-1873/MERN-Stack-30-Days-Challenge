const mongoose = require('mongoose')

const Drinks = new mongoose.Schema({
    name:{type:String, require:true},
    price:{type:Number, require:true},
    inStock:{type:Boolean,default:true}
})

module.exports=mongoose.model('drink',Drinks)