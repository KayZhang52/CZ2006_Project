
from flask import Flask, jsonify, render_template, request, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
import sys, json
from datetime import datetime

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
    reviewDateTime = db.Column(db.DateTime)
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Courses(db.Model):
    institution = db.Column(db.String, primary_key=True)
    course = db.Column(db.String, primary_key=True)
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class uniscoresdataset(db.Model):
    WorldRanking = db.Column(db.Integer, primary_key=True)
    WorldRankingScore = db.Column(db.Float)
    Institution = db.Column(db.String)
    Location = db.Column(db.String)
    QualityOfEducationScore = db.Column(db.Float)
    EmploymentScore = db.Column(db.Float)
    FacultyScore = db.Column(db.Float)
    ResearchScore = db.Column(db.Float)
    Score = db.Column(db.Float)
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class uniscoresdatasetfull(db.Model):
    WorldRanking = db.Column(db.Integer, primary_key=True)
    WorldRankingScore = db.Column(db.Float)
    Institution = db.Column(db.String)
    Location = db.Column(db.String)
    QualityOfEducationScore = db.Column(db.Float)
    EmploymentScore = db.Column(db.Float)
    FacultyScore = db.Column(db.Float)
    ResearchScore = db.Column(db.Float)
    Score = db.Column(db.Float)
    Course = db.Column(db.String)
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

#endpoint for university data
@app.route('/universities', methods= ['GET'])
def universities_query():
    """
    1. give complete list of universities
    2. give list of universities with filters applied(country/course)
    """
    country = request.args.get("country", default="*", type=str)
    course = request.args.get("course", default="*", type=str)
    myPrint(["country: "+country, "course: "+course])
    if(country!="*" and course!="*"):
        results = Dataset1.query.join(Courses, Dataset1.institution==Courses.institution).filter(Dataset1.location == country).filter(Courses.course==course).limit(100).all()
    elif country!="*":
        results = Dataset1.query.filter(Dataset1.location == country).limit(100).all()
    elif course!="*":
        results = Dataset1.query.join(Courses, Dataset1.institution==Courses.institution).filter(Courses.course == course).limit(100).all()
        
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
        new_review=Reviews(username=data['username'], comment=data['comment'], rating=data['rating'], university=data['university'], reviewDateTime=datetime.now())
        db.session.add(new_review)
        db.session.commit()
        myPrint(['review submited', 'comment: '+data['comment']])
        return 'successful'
    else:
        school = request.args.get('institution', default="*", type=str)
        queryResult = Reviews.query.filter(Reviews.university == school).all()
        list = []
        for review in queryResult:
            list.append(review.as_dict())
        myPrint(['reviews of ' + school + ' requested', list[0:4], "..."])
        return {'data':list}

@app.route('/yourfuturecore', methods=['GET', 'POST'])
def recommendationLogic():
    if(request.method=='POST'):
        data=request.json #data contains user's filters
        new_recommendation = data

        dataUni = uniscoresdataset.query.with_entities(uniscoresdataset.Institution,uniscoresdataset.Location,uniscoresdataset.QualityOfEducationScore,uniscoresdataset.FacultyScore,uniscoresdataset.ResearchScore,uniscoresdataset.Score).order_by(uniscoresdataset.Score).all()
        #myPrint(dataUni)
        dataUnilist = []
        for row in dataUni:
            dataUniRow = {'Institution':row[0],'Location':row[1],'QualityOfEducationScore':row[2],'FacultyScore':row[3],'ResearchScore':row[4],'Score':row[5]}
            dataUnilist.append(dataUniRow)
        #myPrint(dataUnilist) 
        #list of dictionaries of unis

        dataCourse = Courses.query.with_entities(Courses.institution,Courses.course).all()
        #myPrint(dataCourse)
        dataCourselist = []
        for row in dataCourse:
            dataCourseRow = {'Institution':row[0],'course':row[1]}
            dataCourselist.append(dataCourseRow)
        #myPrint(dataCourselist) 
        #list of dics of courses

        unifulllist = []
        unifull = uniscoresdatasetfull.query.with_entities(uniscoresdatasetfull.Institution,uniscoresdatasetfull.Location,uniscoresdatasetfull.QualityOfEducationScore,uniscoresdatasetfull.FacultyScore,uniscoresdatasetfull.ResearchScore,uniscoresdatasetfull.Score,uniscoresdatasetfull.Course).order_by(uniscoresdatasetfull.Score).all()
        for row in unifull:
            unifullrow = {'Institution':row[0],'Location':row[1],'QualityOfEducationScore':row[2],'FacultyScore':row[3],'ResearchScore':row[4],'Score':row[5],'Course':row[6]}
            unifulllist.append(unifullrow)
        #myPrint(unifulllist)

        # list2 = sorted(list2, key = lambda i: i['Score'])

        for row in unifulllist:
            newScore = new_recommendation['education']*row['QualityOfEducationScore'] + new_recommendation['faculty']*row['FacultyScore']+ new_recommendation['research']*row['ResearchScore']
            row['newScore'] = newScore
        #myPrint(unifulllist)
    
        finallist = []
        returns = []
        returnlist = []
        for row in unifulllist:
            if row['Course'] == new_recommendation['course']:
                finallist.append(row)
        finallist = sorted(finallist, key = lambda i: i['newScore'], reverse = True)
        finallisttop5 = []
        finallisttop5 = finallist[0:]
        #myPrint(finallisttop5)
        keyslist = []
        for row in finallisttop5:
            returns.append(row['Location'])
            returns.append(row['Institution'])
            returns.append(row['Course'])
            returns.append(row['Score'])
            returns.append(row['newScore'])
            keysdictionary = {'Location', 'Institution','Course', 'Score','newScore'}
            returnskeys = {key: None for key in keysdictionary}
            returnskeys['Location'] = returns[0]
            returnskeys['Institution'] = returns[1]
            returnskeys['Course'] = returns[2]
            returnskeys['Score'] = returns[3]
            returnskeys['newScore'] = returns[4]
            keyslist.append(returnskeys)
            returnskeys = {key: None for key in keysdictionary}
            returns = []
            
        return {'data' : keyslist}

@app.route('/countries', methods= ['GET'])
def getCountries():
    results = Dataset1.query.with_entities(Dataset1.location).group_by(Dataset1.location).all()
    list = []
    for row in results:
        list.append(row.location)
    myPrint(["list of countries", list[0:4], "..."])
    return {'data' : list}

@app.route('/courses', methods= ['GET'])
def getCourses():
    results = Courses.query.with_entities(Courses.course).group_by(Courses.course).all()
    list = []
    for row in results:
        list.append(row.course)
    myPrint(["list of courses", list[0:4], "..."])
    return {'data' : list}




