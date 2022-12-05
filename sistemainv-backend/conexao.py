import pymysql as MySQLdb

# Connect to the database
conn = MySQLdb.connect(host="localhost",
                            user="root",
                            password="",
                            db="sisinventario")

banco = conn.cursor()

