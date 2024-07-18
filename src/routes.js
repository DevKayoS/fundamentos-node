import { Database } from "./database.js"
import {randomUUID} from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select('users')
      return res
      .end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const {name, email} = req.body

      const users = {
        id: randomUUID(),
        name,
        email
      }
  
      database.insert('users', users)
  
      return res
        .writeHead(201) 
        .end()
    }
  },
  //rota para atualizar o usuário
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'), // usando Route Param
    handler: (req, res) => {
      const {id} = req.params
      const {name, email} = req.body

      database.update('users', id)
      
      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'), // usando Route Param
    handler: (req, res) => {
      const {id} = req.params

      database.delete('users', id)
      //retornando um statuscode de 204 pois ele é um status de sucess sem conteudo
      return res.writeHead(204).end()
    }
  },
]