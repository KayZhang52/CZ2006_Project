from main import db

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

