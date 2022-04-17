from flask import Blueprint, request
from model import Dataset1, Courses, Reviews, uniscoresdataset, uniscoresdatasetfull, Users, db
from datetime import datetime
from utilities import myPrint

data = Blueprint('data', __name__)

#endpoint for university data
@data.route('/universities', methods= ['GET'])
def universities_query():
    """
    1. give complete list of universities
    2. give list of universities with filters applied(country/course)
    """
    country = request.args.get("country", default="*", type=str)
    course = request.args.get("course", default="*", type=str)
    keyword = request.args.get("keyword", default="*", type=str)

    if(keyword!="*"):
        myPrint(["request for: ", keyword])
        results = Dataset1.query.filter(Dataset1.institution == keyword).order_by(Dataset1.score).all()
        list=[]
        if(results != None):
            for row in results:
                list.append(row.as_dict())
            return {'data': list}
    
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
@data.route('/university', methods= ['GET'])
def university_query():
    institution = request.args.get("institution", default="*", type=str)
    if(institution!="*"):
        result = Dataset1.query.filter(Dataset1.institution == institution).order_by(Dataset1.score).first()
    else:
        return {'data': ''}
    myPrint(result.as_dict())
    return {'data': result.as_dict()}

@data.route('/sqltest')
def querydb():
    return f"Done!!"

@data.route('/')
def basic():
    return "hi"

@data.route('/user/signup', methods=['POST'])
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

@data.route('/user/login', methods=['POST'])
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
        
@data.route('/reviews', methods=['GET', 'POST'])
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

@data.route('/yourfuturecore', methods=['GET', 'POST'])
def recommendationLogic():
    filter=request.json 
    joinedData = uniscoresdataset.query.join(Courses, uniscoresdataset.Institution==Courses.institution)
    if(filter['country']!="*"):
        joinedData = joinedData.filter(uniscoresdataset.Location==filter['country'])
    if(filter['course']!="*"):
        joinedData = joinedData.filter(Courses.course==filter['course'])
    list = []
    for row in joinedData:
        list.append(row.as_dict())
    for row in list:
        newScore = filter['education']*row['QualityOfEducationScore'] + filter['faculty']*row['FacultyScore']+ filter['research']*row['ResearchScore']
        row['newScore'] = newScore
    return {'data':list}

@data.route('/countries', methods= ['GET'])
def getCountries():
    results = Dataset1.query.with_entities(Dataset1.location).group_by(Dataset1.location).all()
    list = []
    for row in results:
        list.append(row.location)
    myPrint(["list of countries", list[0:4], "..."])
    return {'data' : list}

@data.route('/courses', methods= ['GET'])
def getCourses():
    results = Courses.query.with_entities(Courses.course).group_by(Courses.course).all()
    list = []
    for row in results:
        list.append(row.course)
    myPrint(["list of courses", list[0:4], "..."])
    return {'data' : list}

@data.route('/yourfuturecore2', methods=['GET', 'POST'])
def recommendationLogic2():
    filter=request.json 
    joinedData = uniscoresdataset.query.join(Courses, uniscoresdataset.Institution==Courses.institution)
    if(filter['country']!="*"):
        joinedData = joinedData.filter(uniscoresdataset.Location==filter['country'])
    if(filter['course']!="*"):
        joinedData = joinedData.filter(Courses.course==filter['course'])
    list = []
    for row in joinedData:
        list.append(row.as_dict())
    for row in list:
        newScore = filter['education']*row['QualityOfEducationScore'] + filter['faculty']*row['FacultyScore']+ filter['research']*row['ResearchScore']
        row['newScore'] = newScore
    return {'data':list}
