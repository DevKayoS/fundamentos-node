// ?search=kayo&page=2 -> ['search=kayo', 'page=2']

//funcao para extrair os parametros de busca da url
export function extractQueryParams(query){
  //tirando o ? da query -> criando um array apartir da query q e separada por & -> transformando o array em um objeto
  return query.substr(1).split('&').reduce((queryParams, param)=>{
    const [key, value] = param.split('=')
    queryParams[key] = value

    // vai devolver {search: "Kayo", page: '2'}
    return queryParams
  }, {}) 
}