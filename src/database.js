import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}
  
  constructor(){
    fs.readFile(databasePath, 'utf-8')
    .then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(()=>{
      this.#persist()
    })
  }
  //persistindo o dado no banco de dados ficticio
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }
  select(table, search){
    let data = this.#database[table] ?? []
    //caso tenha query params vai ser enviado a busca
    if(search){
      data = data.filter(row => { //percorrendo todas as linhas da tabela
        //convertendo o objeto search em um array 
        return Object.entries(search).some(([key, value])=> {
          //verificando se dentro da linha do banco de dados existe o valor procurado
          return row[key].toLowerCase().includes(value.toLowerCase()) 
        })
      })
    }
    return data
  }
  insert(table,data){
     if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
     } else {
        //cria uma nova tabela e depois insere os dados dentro da table
        this.#database[table] = [data]
     }

     //persistindo o dado toda vez que e inserido um novo registro
    this.#persist()

     return data
  }
  //atualizando o usuário por id
  update(table, id, data){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    //na variavel acima caso ele nao ache um id que seja igual ao id que veio do req.params ele retorna -1 por isso o (rowindex -1)
    if(rowIndex > -1){
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
    }
  }
  //detelando usuario por id
  delete(table, id){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    //na variavel acima caso ele nao ache um id que seja igual ao id que veio do req.params ele retorna -1 por isso o (rowindex -1)
    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}