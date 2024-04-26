import  boom  from "@hapi/boom";
import { models }  from "../libs/sequelize.postgres.js";


class CharacterService {
  constructor(){
    this.characters = models.Character
  }

  async findAll(){
    const data1 = await this.characters.findAll();
    console.log(data1);
    return data1
  }

  async findOne({id}){
    const character = this.characters.find((ch)=>ch.id === id)
    if(!character){
      throw boom.notFound('character not found')
    }
  }

  async create(data){
    const newCharacter = await this.characters.create(data)
    return newCharacter
  }

  async update(){

  }

  async delete(){

  }
}

export default CharacterService;
