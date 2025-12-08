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

    
@app.route("/")
def base():
    return render_template("information.html")

@app.route("/create", methods=['GET', 'POST'])
def create():
    return render_template("create.html")

# the route to post the character on the js file of the user then on the mongo
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
    # save on mongo
    result = mongo.db.characters.insert_one(character_data)
    session['character_id'] = str(result.inserted_id)
    # back to js
    return jsonify({'good':True,'character_id': str(result.inserted_id)}) 

#route to start the game for the questions
@app.route("/game")
def game():
    if 'character_id' not in session:
        return redirect(url_for('create'))
    
    character = mongo.db.characters.find_one({'_id': (session['character_id'])})
    if not character:
        return redirect(url_for('create'))
    
    return render_template("game.html", character=character)
    




#added a route for all the reflections 
@app.route("/reflections")
def reflections():
    all_reflections = list(mongo.db.reflections.find().sort('created_at', -1))
    return render_template("reflections.html", reflections= all_reflections)
    


if __name__ == '__main__':
    app.run(debug=True)