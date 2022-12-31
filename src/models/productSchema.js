import { Schema } from "mongoose"

const productSchema = new Schema({
    id: {type: Number},
    name: {type: String, required: true/*, max: 10*/},
    description: {type: String, required: true},
    photo: {type: String, required: true},
    price: {type: Number, required: true},
    code: {type: String, required: true},
    stock: {type: Number, required: true},
    timestamp: {type: String, required: true}
})

export default productSchema