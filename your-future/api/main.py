
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key='super secret key'
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqldb://root:Ab123123@119.8.175.170:3306/yourfuture"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from routes.data import data
app.register_blueprint(data,url_prefix='//')
