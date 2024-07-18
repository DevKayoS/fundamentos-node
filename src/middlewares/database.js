import fs from 'node:fs/promises'

const databasePath = new URL('../../db.json', import.meta.url)

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

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }
  select(table){
    const data = this.#database[table] ?? []
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
}