import http from 'node:http'
import { randomUUID } from 'node:crypto';
import { json } from './middlewares/json.js'
import {Database} from './middlewares/database.js'

// GET => Buscar recurso no back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação especifica de um recurso no back-end

// Stateful - Stateless
// Stateful salvando em memoria caso seja derrubado o servidor sera perdido todos os dados
// Stateless - nao salva nada em memoria salva os dados externamente  

// JSON -javascript object notation

// cabecalhos (requisicao/resposta) => Metadados

const database = new Database();

const server = http.createServer(async (req, res)=> {
  await json(req, res)

  const {method, url} = req

  if(method === 'GET' && url === '/users'){
    const users = database.select('users')

    return res
    .end(JSON.stringify(users))
  }

  //created user in memory
  if (method === 'POST' && url === '/users'){
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

  return res.writeHead(404).end('Not found')
})


server.listen(3333)

