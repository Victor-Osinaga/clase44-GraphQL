import UsersMONGO from '../container/UsersMONGO.js'
import userSchema from '../models/userSchema.js'
import parseArgs from 'minimist'

const options = { default: {PORT: 8080, DAO: "mongoAtlas"}, alias: {p: "PORT", d: "DAO"}}
const DAO = parseArgs(process.argv.slice(2), options).DAO

let usersDAO;
switch (DAO) {
    case 'mongoAtlas':
        usersDAO = new UsersMONGO('users', userSchema)
    break;

    default:
        usersDAO = new UsersMONGO('users', userSchema)
    break;
}

export {
    usersDAO,
}

// const usersDAO = new UsersMONGO('users', userSchema)

// export {
//     usersDAO
// }

// const usersExtend = class usersDAO extends UsersMONGO{}
// export const usersDAO = new usersExtend('users', userSchema)