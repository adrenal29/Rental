const mongoose = require('mongoose')

 const PropertySchema = new mongoose.Schema({
   price:String,
   place:String,
   numBathrooms:String,
   numRooms:String,
   schoolsNearby:String,
   email:String
 })

 const PropertyModel = mongoose.model("property", PropertySchema)
 
 module.exports = PropertyModel