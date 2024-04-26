'use strict';

import { CharacterSchema, CHARACTER_TABLE } from '../models/character.model.js';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  await queryInterface.addColumn(CHARACTER_TABLE, 'favoriteFood', CharacterSchema.favoriteFood);
}
export async function down(queryInterface) {
  await queryInterface.addColumn(CHARACTER_TABLE, 'favoriteFood', CharacterSchema.favoriteFood);
}
