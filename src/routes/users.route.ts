import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import userRepository from "../repositories/user.repository";

const usersRoute = Router()

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction)=> {
    const users = await userRepository.findAllUsers()
    res.status(StatusCodes.OK).send(users)
})

/**
 * <{ uuid: string }>
 * permite o autocomplete
 */
usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid

    // por ser uma promise, usando o await para aguardar a execução 
    const user = await userRepository.findAllId(uuid)
    res.status(StatusCodes.OK).send(user)
})

usersRoute.post('/users/', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body

    const uuid = await userRepository.create(newUser)
    res.status(StatusCodes.CREATED).send(newUser)
})

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const usuario = req.body

    usuario.uuid = uuid

    await userRepository.update(usuario)

    res.status(StatusCodes.OK).send({ usuario })
})

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    await userRepository.remove(uuid)

    res.status(StatusCodes.OK).send("deu certo")
})

export default usersRoute;