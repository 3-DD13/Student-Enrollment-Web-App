from flask import Flask
from flask_cors import CORS
from database import db

def create_app():
  app = Flask(__name__)
  CORS(app)

  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///school.db'

  db.init_app(app)

  from routes import api_bp
  app.register_blueprint(api_bp)

  return app

if __name__ == '__main__':
  app = create_app()
  with app.app_context():
    db.create_all()
  app.run(debug = True, port = 8000)
