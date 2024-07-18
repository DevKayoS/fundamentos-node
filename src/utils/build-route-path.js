// /users/:id 
// regex -> forma de encontrar um texto especifico dentro de um texto maior
export function buildRoutePath(path){
  //criando uma regex para pegar os parametros dinamicos da path
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
  
  const pathRegex = new RegExp(`^${pathWithParams}`)

  return pathRegex
}