import  boom  from "@hapi/boom";
import { models }  from "../db/sequelize.js";


class CharacterService {
  constructor(){
    this.characters = models.Character
  }

  async findAll(){
    const data1 = await this.characters.findAll();
    return data1
  }

  async findOne({id}){
    const character = this.characters.findByPk(id)
    if(!character){
      throw boom.notFound('character not found')
    }
    return character
  }

  async create(data){
    console.log(data);
    const newCharacter = await this.characters.create(data)
    return newCharacter
  }

  async update(id, data){

  }

  async delete(id){

  }
}

export default CharacterService;
