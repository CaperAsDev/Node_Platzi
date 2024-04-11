import  boom  from "@hapi/boom";
import client from '../libs/postgres.js'
import sequelize from "../libs/sequelize.js";

class CharacterService {
  constructor(){
    this.pool = client
    this.pool.on('error', (err)=> console.log(err))
    this.characters = [
      {
        id:1,
        name: 'Amalthea',
        nickname: 'Ammy',
        age: 2000,
        favoriteColor: 'Purple',
        heigth: 168
      },
      {
        id:2,
        name: 'Samantha',
        nickname: 'Sammy',
        age: 500,
        favoriteColor: 'Wine',
        heigth: 173
      }
    ]
  }

  async findAll(){
    const data = await sequelize.query('SELECT * FROM tasks')
    console.log(data)
    return data
  }

  findOne({id}){
    const character = this.characters.find((ch)=>ch.id === id)
    if(!character){
      throw boom.notFound('character not found')
    }
  }

  create(){

  }

  update(){

  }

  delete(){

  }
}

export default CharacterService;
