from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  role = db.Column(db.String(20), default='student')
  enrollments = db.relationship('Enrollment', backref='user', lazy=True)

class Course(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  courseName = db.Column(db.String(100), nullable=False)
  enrollments = db.relationship('Enrollment', backref='course', lazy=True)

class Enrollment(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('user.id', nullable=False))
  courseId = db.Column(db.Integer, db.ForeignKey('course.id', nullable=False))
  grade = db.Column(db.String(2), nullable=True)

