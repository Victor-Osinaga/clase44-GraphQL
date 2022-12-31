class User {
    #id
    #username
    #password
    #admin
    constructor({id, username, password, admin}){
        this.setId(id)
        this.setUsername(username)
        this.setPassword(password)
        this.setAdmin(admin)
    }

    // getter y setter ID
    setId(id){
        this.#id = id
    }
    getId(){
        return this.#id
    }

    // getter y setter USERNAME
    setUsername(username){
        this.#username = username
    }
    getUsername(){
        return this.#username
    }
    
    // getter y setter PASSWORD
    setPassword(password){
        if(!password) throw new Error('password requerida')
        this.#password = password
    }
    getPassword(){return this.#password}

    // GETER Y SETTER ADMIN
    setAdmin(admin){
        this.#admin = admin
    }
    getAdmin(){
        return this.#admin
    }
    
    // DTO
    convertToDTO(){
        return Object.freeze({
            id: this.#id,
            username: this.#username,
            password: this.#password,
            admin: this.#admin,
        })
    }
}

export {User}