from flask_mysqldb import MySQL 

def ConnectDB(objArg):
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO reviews VALUES(%s, %s, %s, %s)''', ("ntu", 'CS', 'i love software engineering', 5))
    mysql.connection.commit()
    cursor.close()
    return f"Done!!"
