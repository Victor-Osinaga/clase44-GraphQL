import bcryptjs from 'bcryptjs';

import { usersDAO } from '../DAO/usersDAO.js';

export async function autenticar(username, password) {
    let usuario
    try {
        usuario = await usersDAO.getUserbyUsername(username)
    } catch (error) {
        throw new Error('error de autenticacion')
    }

    if(bcryptjs.compareSync(password, usuario.password)){
        return usuario
    }else{
        throw new Error('error de autenticacion')
    }
}