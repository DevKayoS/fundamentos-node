import http from 'node:http'
import { json } from './middlewares/json.js'
import {Database} from './database.js'
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// GET => Buscar recurso no back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação especifica de um recurso no back-end

// Stateful - Stateless
// Stateful salvando em memoria caso seja derrubado o servidor sera perdido todos os dados
// Stateless - nao salva nada em memoria salva os dados externamente  

// JSON -javascript object notation

// cabecalhos (requisicao/resposta) => Metadados

// Query Paramaters: URL stateful => Filtros, paginação, não-obrigatorias
// Route Paramaters: identificação de recurso
// Request body: Envio de informações de um formulário (HTTPs)

// http://localhost:3333/users?userId=1
// GET http://localhost:3333/users/1 -> basicamente pegando o usuario pelo id
// DELETE http://localhost:3333/users/1 -> deletando o usuario pelo id

//POST http://localhost:3333/users -> criando um usuário novo

//Edição e remoção de usuário

const database = new Database();

const server = http.createServer(async (req, res)=> {
  const {method, url} = req
  
  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route){
    const routeParams = req.url.match(route.path)
    const {query, ...params} = routeParams.groups

    req.params  = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end('Not found')
})


server.listen(3333)

