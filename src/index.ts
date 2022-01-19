import express, { Request, Response, NextFunction } from 'express'
import usersRoute from './routes/users.route';

const app = express();

//Configurações da aplicação
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configurações de Rotas
app.use(usersRoute)

// quando chegar a requisição do tipo get...
app.get('/status', (
        req: Request,
        res: Response, 
        next: NextFunction
)=> {
    res
        .status(200)
        .send({
            foo: "barrr"
        })
})

// Inicialização do servidor
// escutando a porta 3000
app.listen(3000, ()=> { console.log('server success') })