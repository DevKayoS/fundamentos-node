import http from 'node:http'

// GET => Buscar recurso no back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação especifica de um recurso no back-end

// Stateful - Stateless
// Stateful salvando em memoria caso seja derrubado o servidor sera perdido todos os dados
// Stateless - nao salva nada em memoria salva os dados externamente  

// JSON -javascript object notation

// cabecalhos (requisicao/resposta) => Metadados

const users = [];

const server = http.createServer((req, res)=> {
  const {method, url} = req

  if(method === 'GET' && url === '/users'){
    return res
    .setHeader('Content-type', 'application/json')
    .writeHead(200)
    .end(JSON.stringify(users))
  }

  //created user in memory
  if (method === 'POST' && url === '/users'){
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com'
    })

    return res
      .writeHead(201) 
      .end()
  }

  return res.writeHead(404).end('Not found')
})


server.listen(3333)

