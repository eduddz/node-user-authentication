import express from 'express'
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

//Configurações da aplicação
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// quando chegar a requisição do tipo get...
app.use(statusRoute)

// Configurações de Rotas
app.use(usersRoute)


// Inicialização do servidor
// escutando a porta 3000
app.listen(3000, () => { console.log('server success') })