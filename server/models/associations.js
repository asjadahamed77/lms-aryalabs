import User from './userModel.js';
import Course from './courseModel.js';
import Batch from './batchModel.js';
import Assignment from './assignmentModel.js';
import Resource from './resourceModel.js';
import Quiz from './quizModel.js';

export const setupAssociations = () => {
  // Existing associations
  Course.belongsTo(User, {
    foreignKey: 'lecturerId',
    as: 'lecturer'
  });

  User.hasMany(Course, {
    foreignKey: 'lecturerId',
    as: 'courses'
  });

  // New associations
  Assignment.belongsTo(User, {
    foreignKey: 'lecturerId',
    as: 'lecturer'
  });

  Assignment.belongsTo(Course, {
    foreignKey: 'courseId',
    as: 'course'
  });

  Assignment.belongsTo(Batch, {
    foreignKey: 'batchId',
    as: 'batch'
  });

  Resource.belongsTo(User, {
    foreignKey: 'lecturerId',
    as: 'lecturer'
  });

  Resource.belongsTo(Course, {
    foreignKey: 'courseId',
    as: 'course'
  });

  

  

  Quiz.belongsTo(User, {
    foreignKey: 'lecturerId',
    as: 'lecturer'
  });

  Quiz.belongsTo(Course, {
    foreignKey: 'courseId',
    as: 'course'
  });

  Quiz.belongsTo(Batch, {
    foreignKey: 'batchId',
    as: 'batch'
  });

  // Batch associations
  Batch.hasMany(Assignment, {
    foreignKey: 'batchId',
    as: 'assignments'
  });

  Batch.hasMany(Quiz, {
    foreignKey: 'batchId',
    as: 'quizzes'
  });
};