'use strict';
import { CHARACTER_TABLE, CharacterSchema } from "../models/character.model.js";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  await queryInterface.createTable(CHARACTER_TABLE, CharacterSchema);
}
export async function down(queryInterface) {
  await queryInterface.dropTable(CHARACTER_TABLE);
}
