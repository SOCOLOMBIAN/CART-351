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
      
    return render_template("game.html", character=character)

# route for the current question
@app.route("/get_question")
def get_question():
    if 'character_id'not in session:
        return jsonify({'error': 'no character'})
    
    character = mongo.db.characters.find_one({'_id': ObjectId(session['character_id'])})
    week = character.get('week', 1)
    question_index = character.get('question_index', 0)
    
    #return if the questions are done 
    if week > len(WEEKLY_QUESTIONS):
        return jsonify({'game_over': True})
    
    questions = WEEKLY_QUESTIONS.get(week, [])
    if question_index >= len(questions):
        return jsonify({'week_complete': True, 'week': week})
    
    return jsonify({
        'question': questions[question_index],
        'week': week,
        'question_num': question_index + 1,
        'total_questions': len(questions)
    })    

@app.route("/answer", methods=['POST'])
def answer():
    if 'character_id' not in session:
        return jsonify({'error': 'no character'})
    
    data = request.get_json()
    option = data.get('option')
    
    character = mongo.db.characters.find_one({'_id':ObjectId(session['character_id'])})
    
    # Update health
    new_physical = max(0, min(100, character['physical_health'] + option['physical']))
    new_mental = max(0, min(100, character['mental_health'] + option['mental']))
    
    # Update character
    question_index = character.get('question_index', 0) + 1
    week = character.get('week', 1)
    
    update_data = {
        'physical_health': new_physical,
        'mental_health': new_mental,
        'question_index': question_index
    }
    
    # Check if week is complete
    if question_index >= len(WEEKLY_QUESTIONS.get(week, [])):
        update_data['week'] = week + 1
        update_data['question_index'] = 0
    
    mongo.db.characters.update_one(
        {'_id': (session['character_id'])},
        {'$set': update_data}
    )
    
    return jsonify({
        'success': True,
        'physical_health': new_physical,
        'mental_health': new_mental
    })

#added route for game ending     
@app.route("/end")
def end():
    if 'character' not in session:
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
    status = 'thriving' if avg_health >= 70 else 'struggling' if avg_health >= 40 else 'critical'
    
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
    return render_template("reflections.html", reflections= all_reflections)
    

if __name__ == '__main__':
    app.run(debug=True)