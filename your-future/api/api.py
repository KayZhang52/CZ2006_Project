from flask import Flask
from flask_mysqldb import MySQL
import json

app = Flask(__name__)
app.config['MYSQL_HOST'] = "119.8.175.170"
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Ab123123'
app.config['MYSQL_DB'] = 'yourfuture'
mysql = MySQL(app)

#needs work on the front end, fetch is asynchronous hence mechanisms needed to avoid error
@app.route('/givedatabitch')
def get_data():
    f=open("dataset1.json")
    obj = json.load(f)
    return {"elements":obj}; 

@app.route('/sqltest')
def querydb():
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO reviews VALUES(%s, %s, %s, %s)''', ("ntu", 'CS', 'i love software engineering', 5))
    mysql.connection.commit()
    cursor.close()
    return f"Done!!"

