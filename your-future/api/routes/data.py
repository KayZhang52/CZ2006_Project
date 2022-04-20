from flask import Blueprint, request
from models.model import Dataset1, Courses, Reviews, uniscoresdataset, uniscoresdatasetfull, db
from models.user import Users
from datetime import datetime
from controllers.user_controller import authenticateLogin, authenticateSignup
from controllers.recommendationController import recommendationLogic, universityRequestLogic
from controllers.reviewController import reviewLogic

data = Blueprint('data', __name__)

#endpoint for university data
@data.route('/universities', methods= ['GET'])
def universities_query():
    return universityRequestLogic(request)

#endpoint for specific university
@data.route('/university', methods= ['GET'])
def university_query():
    institution = request.args.get("institution", default="*", type=str)
    if(institution!="*"):
        result = Dataset1.query.filter(Dataset1.institution == institution).order_by(Dataset1.score).first()
    else:
        return {'data': ''}
    return {'data': result.as_dict()}

@data.route('/user/signup', methods=['POST'])
def sign_up():
    authenticateSignup(request)

@data.route('/user/login', methods=['POST'])
def login():
    return authenticateLogin(request)
        
@data.route('/reviews', methods=['GET', 'POST'])
def reviews():
    return reviewLogic(request)


@data.route('/yourfuturecore', methods=['GET', 'POST'])
def recommendationHandler():
    return recommendationLogic(request)

@data.route('/countries', methods= ['GET'])
def getCountries():
    results = Dataset1.query.with_entities(Dataset1.location).group_by(Dataset1.location).all()
    list = []
    for row in results:
        list.append(row.location)
    return {'data' : list}

@data.route('/courses', methods= ['GET'])
def getCourses():
    results = Courses.query.with_entities(Courses.course).group_by(Courses.course).all()
    list = []
    for row in results:
        list.append(row.course)
    return {'data' : list}

