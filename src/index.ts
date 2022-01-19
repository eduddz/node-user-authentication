import express, { Request, Response, NextFunction } from 'express'

const app = express();

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

// escutando a porta 3000
app.listen(3000, ()=> { console.log('server success') })