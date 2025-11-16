from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import json 
import os

app = Flask(__name__)
app.secret_key = "your_secret_key_change_this_in_production"
DATA_FILE = "files/data.json"

if not os.path.exists("files"):
    os.makedirs("files")
    app.logger.info("Created files directory")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        session["user"] = {
            "name": request.form.get("name"),
            "month": request.form.get("selectMonth"),
            "question": request.form.get("user_question")
        }
        app.logger.info(f"User registered: {session['user']['name']}")
        return redirect(url_for("card"))
    return render_template("register.html") 

@app.route("/card")
def card():
    user = session.get("user")
    if not user:
        return redirect(url_for("register"))
    return render_template("card.html", user=user)

@app.route("/reading")
def reading():
    user = session.get("user")
    if not user:
        return redirect(url_for("register"))
    
    card_name = request.args.get("cardName", "")
    card_message = request.args.get("cardMessage", "")
    
    return render_template("reading.html", 
                           user=user,
                           card_name= card_name,
                           card_message=card_message)

@app.route('/saveCardData')
def save_card_data():
    # Get user from session
    user = session.get("user")
    if not user:
        app.logger.error("No user in session")
        return jsonify({"success": False, "message": "No user in session"})
    
    # Get card data from query parameters
    card_name = request.args.get("cardName")
    card_message = request.args.get("cardMessage")
    
    app.logger.info(f"Saving card: {card_name} for user: {user['name']}")
    
    session["selected_card"] = {
        "name": card_name,
        "message": card_message
    }
    
    
    complete_reading = {
        "name": user.get("name"),
        "birthMonth": user.get("month"),
        "question": user.get("question") if not user.get("hide_question") else "[private]",
        "selectedCard": card_name,
        "cardMessage": card_message,
    }
    
    if os.path.exists(DATA_FILE):
        app.logger.info("File exists, reading data")
        # File exists 
        jsonFile = open(DATA_FILE, "r")
        theList = json.load(jsonFile)
        jsonFile.close()
        
        #  new reading
        theList.append(complete_reading)
        
        # Write back to file
        jsonFile_write = open(DATA_FILE, "w")
        json.dump(theList, jsonFile_write, indent=4)
        jsonFile_write.close()
        
    else:
        app.logger.info("File does not exist, creating new file")
        # File doesn't exist create
        jsonFile = open(DATA_FILE, "w")
        list_m = [complete_reading]
        json.dump(list_m, jsonFile, indent=4)
        jsonFile.close()
    
    return jsonify({"success": True, "message": "Reading saved"})

# get request to get all readings
@app.route('/getReadings')
def get_readings():
    if os.path.exists(DATA_FILE):
        app.logger.info("Reading all readings from file")
        jsonFile = open(DATA_FILE, "r")
        readings = json.load(jsonFile)
        jsonFile.close()
        return jsonify({"success": True, "readings": readings})
    else:
        app.logger.info("No readings file exists yet")
        return jsonify({"success": True, "readings": []})

if __name__ == "__main__":
    app.run(debug=True)
