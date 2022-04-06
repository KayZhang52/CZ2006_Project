import sqlalchemy as db
import sys

#establish database connection
engine = db.create_engine("mysql+mysqldb://root:Ab123123@119.8.175.170:3306/yourfuture")
connection = engine.connect()
metadata= db.MetaData()

dataset1=db.Table('dataset1', metadata, autoload=True, autoload_with=engine)
print(dataset1.columns.keys())

query = db.select([dataset1])
ResultProxy = connection.execute(query)
ResultSet = ResultProxy.fetchall()
print(ResultSet[:5])