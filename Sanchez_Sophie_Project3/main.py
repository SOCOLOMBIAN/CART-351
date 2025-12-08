from flask import Flask,render_template,request,redirect, url_for,session,jsonify
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from datetime import datetime
from bson.objectid import ObjectId
import os

load_dotenv()
db_user= os.getenv('MONGODB_USER')
db_pass= os.getenv('DATABASE_PASSWORD')
db_name = os.getenv('DATABASE_NAME')

app = Flask(__name__)
app.secret_key= 'BAD_SECRET_KEY'
UPDLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER']= UPDLOAD_FOLDER 
app.config['MAX_CONTENT_LENGTH']= 16 * 1024 * 1024
uri = f"mongodb+srv://{db_user}:{db_pass}@cluster0.8uqe4zh.mongodb.net/{db_name}?retryWrites=true&w=majority"
app.config['MONGO_URI']= uri 
mongo= PyMongo(app)
format_string = "%Y-%m-%d"

# Weekly questions
WEEKLY_QUESTIONS = {
    1: [
        {"q": "You have three assignments due next week. What do you do?", 
         "options": [
             {"text": "Start all of them today", "physical": 5, "mental": -10},
             {"text": "Make a schedule and work on them gradually", "physical": 10, "mental": 10},
             {"text": "I'll start tomorrow", "physical": -5, "mental": -5}
         ]},
        {"q": "How many hours did you sleep last night?",
         "options": [
             {"text": "Less than 5 hours", "physical": -15, "mental": -10},
             {"text": "6-7 hours", "physical": 5, "mental": 5},
             {"text": "8+ hours", "physical": 15, "mental": 10}
         ]}
    ],
    2: [
        {"q": "You're feeling overwhelmed. What do you do?",
         "options": [
             {"text": "Take a short walk outside", "physical": 10, "mental": 15},
             {"text": "Push through and keep working", "physical": -10, "mental": -15},
             {"text": "Talk to a friend about it", "physical": 5, "mental": 10}
         ]},
        {"q": "When was your last proper meal?",
         "options": [
             {"text": "I had a good meal today", "physical": 15, "mental": 5},
             {"text": "I've been snacking", "physical": -5, "mental": 0},
             {"text": "I forgot to eat", "physical": -15, "mental": -10}
         ]}
    ],
    3: [
        {"q": "Midterms are coming. How do you prepare?",
         "options": [
             {"text": "Study a little each day", "physical": 10, "mental": 10},
             {"text": "Cram the night before", "physical": -15, "mental": -15},
             {"text": "Study groups with friends", "physical": 5, "mental": 15}
         ]},
        {"q": "Do you take breaks when studying?",
         "options": [
             {"text": "Yes, every hour", "physical": 10, "mental": 10},
             {"text": "Sometimes", "physical": 0, "mental": 0},
             {"text": "No, I power through", "physical": -10, "mental": -10}
         ]}
    ],
    4: [
        {"q": "You're behind on work. What's your approach?",
         "options": [
             {"text": "Ask for help or extension", "physical": 5, "mental": 10},
             {"text": "Work all night to catch up", "physical": -20, "mental": -15},
             {"text": "Prioritize the most important tasks", "physical": 10, "mental": 10}
         ]},
        {"q": "How often do you exercise or move your body?",
         "options": [
             {"text": "Daily or almost daily", "physical": 20, "mental": 15},
             {"text": "A few times a week", "physical": 10, "mental": 5},
             {"text": "Rarely or never", "physical": -10, "mental": -5}
         ]}
    ]
}
 
@app.route("/")
def base():
    return render_template("information.html")

@app.route("/create", methods=['GET', 'POST'])
def create():
    return render_template("create.html")

# the route to post the character data
@app.route("/character", methods=['POST'])
def character():
    data = request.get_json()
    
    character_data = {
        'name': data.get('name'),
        'degree': data.get('degree'),
        'physical_health': 80,
        'mental_health': 80,
        'week': 1,
        'question_index': 0,
        'created_at': datetime.now()
    }
    # save on mongo
    result = mongo.db.characters.insert_one(character_data)
    session['character_id'] = str(result.inserted_id)
    return jsonify({"success": True})

#route to start the game for the questions
@app.route("/game")
def game():
    if 'character_id' not in session:
        return redirect(url_for('create'))
    
    character = mongo.db.characters.find_one({'_id': ObjectId(session['character_id'])}) 
    if not character:
        return redirect(url_for('create'))
      
      #all the questions 
    return render_template("game.html", character=character, questions= WEEKLY_QUESTIONS)



@app.route("/submit_answer", methods=['POST'])
def submit_answers():
    if 'character_id' not in session:
        return jsonify({'error': 'no character'})
    
    data = request.get_json()
    answers = data.get('answers', [])
    
    character = mongo.db.characters.find_one({'_id':ObjectId(session['character_id'])})
    
    # Calculate total health changes
    total_physical = character['physical_health']
    total_mental = character['mental_health']
   
    for answer in answers:
        total_physical += answer['physical']
        total_mental += answer['mental']
        
    total_physical = max(0, min(100, total_physical))
    total_mental = max(0, min(100, total_mental))

    mongo.db.characters.update_one(
        {'_id': ObjectId(session['character_id'])},
        {'$set': {
            'physical_health': total_physical,
            'mental_health': total_mental,
            'answers': answers
        }}
    )
    
    return jsonify({
        'success': True,
        'physical_health': total_physical,
        'mental_health': total_mental
    })

#added route for game ending     
@app.route("/end")
def end():
    if 'character_id' not in session:
        return redirect(url_for('create'))
    
    character = mongo.db.characters.find_one({'_id': ObjectId(session['character_id'])})
    if not character:
        return redirect(url_for('create'))
    
    return render_template("end.html", character=character)


@app.route("/submit_reflection", methods=['POST'])
def submit_reflection():
    data = request.get_json()
    
    if 'character_id' not in session:
       return jsonify({'error': 'no character'})
    
    character = mongo.db.characters.find_one({'_id': ObjectId(session['character_id'])})
    
    avg_health = (character['physical_health'] + character['mental_health']) / 2
    
    # Fixed status calculation
    if avg_health >= 60:
        status = 'thriving'
    elif avg_health >= 30:
        status = 'struggling'
    else:
        status = 'critical'
    
    reflection_data = {
        'character_name': character['name'],
        'degree': character['degree'],
        'final_physical': character['physical_health'],
        'final_mental': character['mental_health'],
        'reflection': data.get('reflection'),
        'status': status,
        'created_at': datetime.now()
    }
    
    mongo.db.reflections.insert_one(reflection_data)
    
    return jsonify({'success': True})

#added a route for all the reflections 
@app.route("/reflections")
def reflections():
    all_reflections = list(mongo.db.reflections.find().sort('created_at', -1))
    
    # Calculate proper average health
    total_reflections = len(all_reflections)
    if total_reflections > 0:
        total_physical = sum(r['final_physical'] for r in all_reflections)
        total_mental = sum(r['final_mental'] for r in all_reflections)
        avg_health = round((total_physical + total_mental) / (total_reflections * 2))
    else:
        avg_health = 0
    
    return render_template("reflections.html", reflections=all_reflections, avg_health=avg_health)
    

if __name__ == '__main__':
    app.run(debug=True)