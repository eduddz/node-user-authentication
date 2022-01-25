import { Script } from "vm"
import User from "../models/user.models"
import db from "../routes/db"

class UserRepository {
    async findAllUsers(): Promise<User[]> {
        // script sql
        const query = `
            SELECT uuid, username FROM application_user
        `
        /**
         * 
            db.query<User>(query).then((result) => {
             result.rows[0].username
            })
        */
        
        const { rows } = await db.query<User>(query)

        // se não retornar algo, retornará vazio
        return rows || []
    }

    /**
     * Vai receber o id e retornará uma promise com as infos do usuário lá dentro
     * $1 parametro
     * Se tivesse mais parametros > $1 $2 $3
     */
    async findAllId(uuid: string): Promise<User> {
        const query = `
            SELECT uuid, username FROM application_user WHERE uuid = $1
        `

        // Passando o uuid como parametro no $1
        // Se fosse mais parametros $1 & $2 > [uuid, name]
        const values = [uuid]
        const { rows } = await db.query<User>(query, values)

        // user = rows[0]
        const [ user ] = rows

        return user
    }

    async create(user: User): Promise<string> {
        const script = `
            INSERT INTO application_user (username, password) VALUES ($1, crypt($2, 'senha')) RETURNING uuid
        `
        
        const values = [user.username, user.password]
        const { rows } = await db.query<{ uuid: string }>(script, values)

        const [ newUser ] = rows
        return newUser.uuid
    }

    async update(user: User): Promise<string> {
        const script = `
            UPDATE application_user SET username = $1, password = crypt($2, 'senha') WHERE uuid = $3
        `

        const values = [user.username, user.password, user.uuid]

        const { rows } = await db.query<{ uuid: string}>(script, values)
        const [newUser] = rows
        return newUser.uuid
    }

    async remove(uuid: string): Promise<void> {
        const script = `
            UPDATE FROM application_user WHERE uuid = $1
        `

        const values = [uuid]
        await db.query(script, values)
    }

}

export default new UserRepository()