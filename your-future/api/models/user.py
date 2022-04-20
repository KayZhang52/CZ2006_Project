from main import db 

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