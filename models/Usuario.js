import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'

import { sequelize } from '../databases/conecta.js';
import { Cargo } from './Cargo.js';

export const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  nivelAcesso:{
    type: DataTypes.INTEGER(1),
    allowNull:false
  }
});

Usuario.beforeCreate(usuario => {
  const salt = bcrypt.genSaltSync(15)
  const hash = bcrypt.hashSync(usuario.senha, salt)
  usuario.senha = hash  
});

Cargo.hasMany(Usuario, { foreignKey: 'nivelAcesso', sourceKey: 'id' });

