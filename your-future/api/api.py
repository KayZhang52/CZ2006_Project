
from flask import Flask, jsonify, render_template, request, flash
from flask_sqlalchemy import SQLAlchemy
import sys, json



app = Flask(__name__)

#establish database connection
app.secret_key='super secret key'
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqldb://root:Ab123123@119.8.175.170:3306/yourfuture"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Dataset1(db.Model):
    institution = db.Column(db.String, primary_key = True)
    score = db.Column(db.String)
    location = db.Column(db.String)
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Users(db.Model):
    username = db.Column(db.String)
    email = db.Column(db.String, primary_key = True)
    password = db.Column(db.String)
    firstName = db.Column(db.String)
    lastName = db.Column(db.String)
    country = db.Column(db.String)
    currentUniversity = db.Column(db.String)
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


#endpoint for university data
@app.route('/universities', methods= ['GET', 'POST'])
def universities_query():
    """need to query database"""
    country = request.args.get("country", default="*", type=str)
    if(country!="*"):
        results = Dataset1.query.filter(Dataset1.location == country).order_by(Dataset1.institution).limit(100).all()
    else:
        results = Dataset1.query.limit(100).all()
    list = []
    for row in results:
        list.append(row.as_dict())
    jsonifiedResult = json.dumps(list)
    return {'data' : jsonifiedResult}

#endpoint for specific university
@app.route('/university', methods= ['GET', 'POST'])
def university_query():
    institution = request.args.get("institution", default="*", type=str)
    if(institution!="*"):
        result = Dataset1.query.filter(Dataset1.institution == institution).order_by(Dataset1.score).first()
    else:
        return "not found 404."
    print(result)
    return {'data':''}

@app.route('/sqltest')
def querydb():
    return f"Done!!"

@app.route('/')
def basic():
    return "hi"

@app.route('/user/signup', methods=['POST'])
def sign_up():
    # if(request.method=='POST'):
    #     data=request.json
    #     print(data)
    #     new_user = Users(username=data['username'], password=data['password'], email=data['email'])
    #     db.session.add(new_user)
    #     db.session.commit()
    #     return "successful"
    # else:
    #     return ""
    return "successful"

@app.route('/user/login', methods=['POST'])
def login():
    # if(request.method=='POST'):
    #     data=request.json
    #     print(data["email"])
    #     print("asdf")
    #     user = Users.query.filter_by(email=data["email"]).first()
    #     if user:
    #         if user.password == data['password']:
    #             return "successful"
    #         else:
    #             return "incorrect password"
    #     return "email have no registed account"

    return "successful"

