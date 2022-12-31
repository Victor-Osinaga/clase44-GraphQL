import bcryptjs from 'bcryptjs'

import { User } from './User.js'
import {randomUUID} from 'crypto'

class ServicesUser {
    constructor(repository){
        this.userRepository = repository
    }

    async registerUser (data){
        const registered = await this.userRepository.repoGetUserByUsername(data.username)
        try {
            // si no encuentra ese dato mongoose devuelve null (username: username)
            if(registered != null) throw{msg: "mail no disponible", data: `${data.username}`}

            // data.password = await bcryptjs.hash(data.password, 8)
            // const userNoDto = new User({
            //     id: randomUUID(),
            //     ...data,
            //     admin: false
            // })

            const userNoDto = new User({
                id: randomUUID(),
                username: data.username,
                password: await bcryptjs.hash(data.password, 8),
                admin: false
            })
            const userDto = userNoDto.convertToDTO()
            await this.userRepository.repoSave(userDto)

            return userDto
        } catch (error) {
            throw error
        }
    }

    async autenticarUsuario(username, password){
        let userNoDto = await this.userRepository.repoGetUserByUsername(username)
        try {
            if(userNoDto == null){
                throw {msg: `email no registrado:`, data: `${username}`}
            }
            if(await bcryptjs.compare(password, userNoDto.getPassword())){
                const userDto = userNoDto.convertToDTO()
                return userDto
            }else{
                throw {msg: `contraseña incorrecta:`, data: `password`}
            }
        } catch (error) {
            // console.log(`inf err: ${error}`);
            throw error
        }
    }

    async getByUsername(username){
        const userNoDto = await this.userRepository.repoGetUserByUsername(username)

        const userDto = userNoDto.convertToDTO()
        return userDto
    }

    async getById(id){
        const userNoDto = await this.userRepository.repoGetUserById(id)

        const userDto = userNoDto.convertToDTO()
        return userDto
    }
}

export {
    ServicesUser,
}