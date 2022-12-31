import { Schema } from "mongoose"

const cartSchema = new Schema({
    id: {type: Number},
    products: Array
})

export default cartSchema