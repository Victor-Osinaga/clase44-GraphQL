import { User } from "./User.js";

class RepositoryUser{
    constructor(dao){
        this.dao = dao
    }

    async repoGetUserByUsername(username){
        const user = await this.dao.getUserbyUsername(username)
        if(!user) return null
        
        const userNoDto = new User(user)
        return userNoDto
    }

    async repoGetUserById(id){
        const user = await this.dao.getUserById(id)
        const userNoDto = new User(user)
        return userNoDto
    }

    async repoSave(userDto){
        await this.dao.save(userDto)
    }
}

export {
    RepositoryUser
}