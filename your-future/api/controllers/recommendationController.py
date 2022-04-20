from models.model import uniscoresdataset, Courses, Dataset1

def recommendationLogic(request):
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

def universityRequestLogic(request):
    """
    1. give complete list of universities
    2. give list of universities with filters applied(country/course)
    """
    country = request.args.get("country", default="*", type=str)
    course = request.args.get("course", default="*", type=str)
    keyword = request.args.get("keyword", default="*", type=str)

    if(keyword!="*"):
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
    return {'data' : list}