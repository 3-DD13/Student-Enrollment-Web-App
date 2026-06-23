from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
  app = Flask(__name__)
  CORS(app)

  app.config['SQLALCHEMY_DATABASE_URI'] = 'splite:///school.db'

  db.init_app(app)

  from routes import api_bp
  app.register_blueprint(api_bp)

  return app


class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  role = db.Column(db.String(20), default='student')
  enrollments = db.relationship('Enrollment', backref='user', lazy=True)

class Course(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  course_name = db.Column(db.String(100), nullable=False)
  enrollments = db.relationship('Enrollment', backref='course', lazy=True)

class Enrollment(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
  grade = db.Column(db.String(2), nullable=True)

