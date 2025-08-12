import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Batch = db.define('Batch', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'unique_batch_name',
      msg: 'Batch name already exists'
    },
    validate: {
      notEmpty: { msg: 'Batch name cannot be empty' }
    }
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Year must be an integer' }
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
});

export default Batch;