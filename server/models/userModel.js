import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Name cannot be empty' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'unique_email',
      msg: 'Email already exists'
    },
    validate: {
      isEmail: { msg: 'Invalid email format' },
      notEmpty: { msg: 'Email cannot be empty' }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 100],
        msg: 'Password must be between 6-100 characters'
      }
    }
  },
  role: {
    type: DataTypes.ENUM('student', 'lecturer', 'admin'),
    allowNull: false,
    defaultValue: 'student',
    validate: {
      isIn: {
        args: [['student', 'lecturer', 'admin']],
        msg: 'Invalid role specified'
      }
    }
  },
  regNo: {
    type: DataTypes.STRING,
    unique: {
      name: 'unique_regno',
      msg: 'Registration number already exists'
    },
    allowNull: true,
    validate: {
      studentRequired(value) {
        if (this.role === 'student' && !value) {
          throw new Error('Registration number is required for students');
        }
      }
    }
  },
  faculty: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: { msg: 'Faculty cannot be empty' }
    }
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: { msg: 'Department cannot be empty' }
    }
  },
  batch: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      studentRequired(value) {
        if (this.role === 'student' && !value) {
          throw new Error('Batch is required for students');
        }
      }
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastLogin: {
    type: DataTypes.DATE
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
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeCreate: (user) => {
      if (user.regNo) {
        user.regNo = user.regNo.toUpperCase().trim();
      }
    }
  },
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] }
    },
    activeUsers: {
      where: { isActive: true }
    },
    students: {
      where: { role: 'student' }
    },
    lecturers: {
      where: { role: 'lecturer' }
    },
    admins: {
      where: { role: 'admin' }
    }
  }
});





export default User;