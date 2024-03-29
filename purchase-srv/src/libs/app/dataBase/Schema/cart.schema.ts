import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
   userId:String,
   cartProductId:[String],
},{
    versionKey:false
})
const cart = mongoose.model("carts",courseSchema)

export {
   cart
}
