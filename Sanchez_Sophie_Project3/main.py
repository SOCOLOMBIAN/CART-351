from flask import Flask,render_template,request,redirect, url_for,session,jsonify
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from datetime import datetime
import os

load_dotenv()
db_user= os.getenv('MONGODB_USER')
db_pass= os.getenv('DATABASE_PASSWORD')
db_name = os.getenv('DATABASE_NAME')

app = Flask(__name__)
app.secret_key= 'BAD_SECRET_KEY'
UPDLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER']= UPDLOAD_FOLDER 
app.config['MAX_CONTENT_LENGTH']= 16 * 1024 * 1014
uri = f"mongodb+srv://{db_user}:{db_pass}@cluster0.8uqe4zh.mongodb.net/{db_name}?retryWrites=true&w=majority"
app.config['MONGO_URI']= uri 
mongo= PyMongo(app)
format_string = "%Y-%m-%d"

# try:
#     print(mongo.cx)
#     print(mongo.db)
#     print(mongo.db.dataUser)
#     print("succes")
#     result= mongo.db.dataUser.insert_one({"testkeymON": "TestValueMon"})
#     print(result) 
# except Exception as e:
#     print(e)
    
@app.route("/")
def base():
    return render_template("base.html")


@app.route("/create", methods=['GET', 'POST'])
def create():
    return render_template("create.html")

@app.route("/character", methods=['POST'])
def character():
    data = request.get_json()
    
    character_data = {
        'name': data.get('name'),
        'degree': data.get('degree'),
        'physical_health': 80,
        'mental_health': 80,
        'week': 1,
        'created_at': datetime.now()
    }
    result = mongo.db.characters.insert_one(character_data)
    # return render_template("character.html")



if __name__ == '__main__':
    app.run(debug=True)