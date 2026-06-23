from database import db

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  role = db.Column(db.String(20), default='student')
  enrollments = db.relationship('Enrollment', backref='user', lazy=True)

class Course(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  course_name = db.Column(db.String(100), nullable=False)
  enrollments = db.relationship('Enrollment', backref='course', lazy=True)
  teacher_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)

class Enrollment(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
  grade = db.Column(db.String(2), nullable=True)