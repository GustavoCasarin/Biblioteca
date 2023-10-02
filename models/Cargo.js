import { DataTypes } from 'sequelize';

import { sequelize } from '../databases/conecta.js';

export const Cargo = sequelize.define('cargo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING(40),
        allowNull: false
      }
    },
      {
        timestamps: false  
    }
    );