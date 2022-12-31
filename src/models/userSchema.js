// import bcryptjs from 'bcryptjs'
import { Schema } from "mongoose"

// const encryptedPassword = bcryptjs.hashSync(password, 8)
// console.log(encryptedPassword)

const userSchema = new Schema({
    id: {type: String},
    username: {type: String},
    // email: {type: String},
    password: {type: String},
    admin: {type: Boolean}
})

export default userSchema