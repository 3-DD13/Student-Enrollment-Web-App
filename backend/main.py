from flask import Flask
from flask_cors import CORS
from database import db
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

def create_app():
  app = Flask(__name__)
  CORS(app)

  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///school.db'

  db.init_app(app)

  from routes import api_bp
  app.register_blueprint(api_bp)

  from models import User, Course, Enrollment
  admin = Admin(app, name='ACME University Admin', template_mode='bootstrap4')
  admin.add_view(ModelView(User, db.session))
  admin.add_view(ModelView(Course, db.session))
  admin.add_view(ModelView(Enrollment, db.session))

  return app

if __name__ == '__main__':
  app = create_app()
  with app.app_context():
    db.create_all()
  app.run(debug = True, port = 8000)
