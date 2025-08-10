// associations.js
import User from './userModel.js';
import Course from './courseModel.js';

export const setupAssociations = () => {
  Course.belongsTo(User, {
    foreignKey: 'lecturerId',
    as: 'lecturer'
  });

  User.hasMany(Course, {
    foreignKey: 'lecturerId',
    as: 'courses'
  });
};