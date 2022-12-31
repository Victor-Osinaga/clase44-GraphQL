import { usersDAO } from "../../DAO/usersDAO.js";

import { RepositoryUser } from "./repositoryUser.js";

import { ServicesUser } from "./ServicesUser.js";

const repository = new RepositoryUser(usersDAO)

const userServices = new ServicesUser(repository)

export {
    userServices,
}