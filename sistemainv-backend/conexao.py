import pymysql as MySQLdb

# Connect to the database
conn = MySQLdb.connect(host="localhost",
                            user="root",
                            password="182123",
                            db="sisinventario")

banco = conn.cursor()

