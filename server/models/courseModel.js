import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Course = db.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Course name cannot be empty' }
    }
  },
  courseCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'unique_course_code',
      msg: 'Course code already exists'
    },
    validate: {
      notEmpty: { msg: 'Course code cannot be empty' }
    }
  },
  semester: {
    type: DataTypes.ENUM(
      'semester_1', 'semester_2', 'semester_3', 'semester_4',
      'semester_5', 'semester_6', 'semester_7', 'semester_8'
    ),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Semester is required' }
    }
  },
  faculty: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Faculty is required' }
    }
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Department is required' }
    }
  },
  lecturerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
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
}, {
  indexes: [
    {
      unique: true,
      fields: ['courseCode']
    },
    {
      fields: ['faculty']
    },
    {
      fields: ['department']
    }
  ]
});

Course.associate = (models) => {
  Course.belongsTo(models.User, { foreignKey: 'lecturerId', as: 'lecturer' });
};



export default Course;