import { DataTypes } from 'sequelize';

import { sequelize } from '../databases/conecta.js';
import { Usuario } from './Usuario.js';

export const Livro = sequelize.define('Livro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  pagina: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
});

Livro.belongsTo(Usuario,{
    foreignKey: {
        name: 'usuario_id',
        allowNull: false}
})

Usuario.hasMany(Livro, {
    foreignKey: 'usuario_id'
  })
  