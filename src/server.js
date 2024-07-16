import http from 'node:http'

// GET => Buscar recurso no back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação especifica de um recurso no back-end
const server = http.createServer((req, res)=> {
  const {method, url} = req

  if(method === 'GET' && url === '/users'){
    return res.end('Listagem de usuários')
  }

  if (method === 'POST' && url === '/users'){
    return res.end('criacão de usuário')
  }

  return res.end('Hello world')
})


server.listen(3333)

