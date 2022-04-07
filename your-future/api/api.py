
from flask import Flask, jsonify, render_template, request, flash
from flask_sqlalchemy import SQLAlchemy
import sys, json

def myPrint(list):
    print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    for thing in list:
        print(thing)
    print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")


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

class Reviews(db.Model):
    reviewId = db.Column(db.Integer, primary_key=True)
    university=db.Column(db.String)
    username = db.Column(db.String)
    comment = db.Column(db.String)
    rating = db.Column(db.Integer)
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


#endpoint for university data
@app.route('/universities', methods= ['GET'])
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
    myPrint(["list of universities requested", list[0:4], "..."])
    return {'data' : list}

#endpoint for specific university
@app.route('/university', methods= ['GET'])
def university_query():
    institution = request.args.get("institution", default="*", type=str)
    if(institution!="*"):
        result = Dataset1.query.filter(Dataset1.institution == institution).order_by(Dataset1.score).first()
    else:
        return {'data': ''}
    myPrint(result.as_dict())
    return {'data': result.as_dict()}

@app.route('/sqltest')
def querydb():
    return f"Done!!"

@app.route('/')
def basic():
    return "hi"

@app.route('/user/signup', methods=['POST'])
def sign_up():
    if(request.method=='POST'):
        data=request.json        
        myPrint(["user signup.", list(data.values())])
        user = Users.query.filter_by(email=data["email"]).first()
        if user:
            return "failed"
        new_user = Users(username=data['username'], password=data['password'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return "successful"
    else:
        return "failed"

@app.route('/user/login', methods=['POST'])
def login():
    if(request.method=='POST'):
        data=request.json
        myPrint(["user login attempt.", list(data.values())])
        user = Users.query.filter_by(email=data["email"]).first()
        if user:
            if user.password == data['password']:
                return {'loginStatus':"successful", 'userDetails':user.as_dict()}
            else:
                return {'loginStatus':"incorrect password"}
        return {'loginStatus':"email have no registered account"}
        
@app.route('/reviews', methods=['GET', 'POST'])
def reviews():
    if(request.method=='POST'):
        data=request.json
        new_review=Reviews(username=data['username'], comment=data['comment'], rating=data['rating'], university=data['university'])
        db.session.add(new_review)
        db.session.commit()
        myPrint(['review submited', 'comment: '+data['comment']])
        return 'successful'
    else:
        school = request.args.get('institution', default="*", type=str)
        queryResult = Dataset1.query.filter(Reviews.university == school).all()
        list = []
        for review in queryResult:
            list.append(review.as_dict())
        return {'data':list}

@app.route('/yourfuturecore', methods=['GET', 'POST'])
#sqlalchemy
#how to inner join 2 tables eg. course = CS and country = Singapore
#SQLAlchemy, ORM tutorial
#how to conditionally filter based on the json object
def recommendationLogic():
    if(request.method=='POST'):
        data=request.json #data contains user's filters
        print('data')
        queryResult = Dataset1.query.filter(country, course, education, faculty)




