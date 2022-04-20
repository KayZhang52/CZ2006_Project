from models.user import Users
from main import db

def authenticateLogin(request):
    data=request.json
    user = Users.query.filter_by(email=data["email"]).first()
    if user:
        if user.password == data['password']:
            return {'loginStatus':"successful", 'userDetails':user.as_dict()}
        else:
            return {'loginStatus':"incorrect password"}
    return {'loginStatus':"email have no registered account"}

def authenticateSignup(request):
    if(request.method=='POST'):
        data=request.json        
        user = Users.query.filter_by(email=data["email"]).first()
        if user:
            return "failed"
        new_user = Users(username=data['username'], password=data['password'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return "successful"
    else:
        return "failed"