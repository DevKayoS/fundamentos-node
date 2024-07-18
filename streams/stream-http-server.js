import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform{
  _transform(chunk, enconding, callback){
    const transformed = chunk.toString() * (-1)
    console.log(transformed)
    callback(null, Buffer.from(String(transformed)) )
  }
}
// req ->readbleStream
// res -> writableStream
const server = http.createServer(async (req, res)=> {
  const buffers = []

<<<<<<< HEAD
  
  return req
  .pipe(new InverseNumberStream())
  .pipe(res)
=======
  for await (const chunk of req){
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)
>>>>>>> d687b8f83e177596c6a3a0e58299d067c63beca4
})

server.listen(3334)