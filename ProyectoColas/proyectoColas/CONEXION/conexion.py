import mysql.connector

conexion = mysql.connector.connect(user='root', password='29595',
                                   host='localhost',
                                   database='injupen_db',
                                   port='3306')

print(conexion)



