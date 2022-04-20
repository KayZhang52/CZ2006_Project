from models.model import Reviews
from main import db

def reviewLogic(request): 
    if(request.method=='POST'):
        data=request.json
        new_review=Reviews(username=data['username'], comment=data['comment'], rating=data['rating'], university=data['university'], reviewDateTime=datetime.now())
        db.session.add(new_review)
        db.session.commit()
        return 'successful'
    else:
        school = request.args.get('institution', default="*", type=str)
        queryResult = Reviews.query.filter(Reviews.university == school).all()
        list = []
        for review in queryResult:
            list.append(review.as_dict())
        return {'data':list}