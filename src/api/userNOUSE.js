import { usersDAO } from "../DAO/usersDAO.js";

export async function ensureUniqueName(username){
    const user = await usersDAO.getUserbyUsername(username)
    if(user) throw new Error('nombre de usuario no disponible')
}