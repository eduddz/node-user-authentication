import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';

const usersRoute = Router()

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction)=> {
    const users = [{ username: 'Eduardo' }]

    res.status(StatusCodes.OK).json(users)
})

/**
 * <{ uuid: string }>
 * permite o autocomplete
 */
usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    res.status(StatusCodes.OK).send({ uuid })
})

usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    res.status(StatusCodes.CREATED).send(newUser)
})

usersRoute.put('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const usuario = req.body

    usuario.uuid = uuid
    res.status(StatusCodes.OK).send({ usuario })
})

export default usersRoute;