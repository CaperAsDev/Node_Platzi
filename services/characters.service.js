import  boom  from "@hapi/boom";

class CharacterService {
  constructor(){
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

  findAll(){
    return this.characters
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
