from flask import Flask,render_template,request, jsonify,session,redirect,url_for
import json 
import os

app = Flask(__name__)
app.secret_key = "your_secret_key"
DATA_FILE = "data.txt"

os.makedirs('files', exist_ok= True)

#route for the index page 
@app.route("/")
def index():
    return render_template("index.html")

#route for the personal register and then get the card
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        session["user"] = { # save session 
            "name": request.form.get("name"),
            "month": request.form.get("selectMonth"),
            "question": request.form.get("user_question")
        }
        return redirect(url_for("card"))
    return render_template("register.html") 

#
@app.route("/card")
def card():
    user = session.get("user")
    if not user:
        return redirect(url_for("register"))
    return render_template("card.html", user=user)


# data that will be stored from the js of the card 
@app.route("/saveCardData")
def saveCardData():
    try:
        card_name = request.args.get('cardName')
        card_message= request.args.get('cardMessage')
        user= session.get("user")
        
        if not user:
            return jsonify({"success": False, "message":"No data found"})
        
        #the reading object variables
        reading= {
            "name": user.get("name"),
            "month": user.get("month"),
            "question": user.get("question"),
            "cardName": card_name,
            "cardMessage": card_message
        }
        
        print(f"DEBUG: Reading object created: {reading}")
        
        # debuged this part 
        readings= []
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r') as f:
                try:
                    content = f.read()
                    print(f"DEBUG: File content before: {content}")
                    if content.strip():
                        readings = json.loads(content)
                    else:
                        readings = []
                except json.JSONDecodeError as e:
                    print(f"DEBUG: JSON decode error: {e}")
                    readings = []
                    
        readings.append(reading)
        print(f"readings {len(readings)}")
        
        #save to file 
        with open (DATA_FILE, 'r') as f:
            verification= f.read()
            print(f"Debug {verification}")
            
        return jsonify({"success": True, "message": "reading saved"})
    
    except Exception as e:
        print(f"ERROR saving: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"success": False, "message": str(e)})
            
       
@app.route("/reading")
def reading():
    user = session.get("user")
    if not user:
        return redirect(url_for("register"))
    return render_template("reading.html", user=user)

@app.route("/getReadings")
def get_readings():
    try:
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r') as f:
                content = f.read()
                if content.strip():
                    readings = json.loads(content)
                else:
                    readings = []
            return jsonify({"success": True, "readings": readings})
        else:
            return jsonify({"success": True, "readings": []})
    except Exception as e:
        print(f"Error reading data: {e}")
        return jsonify({"success": False, "message": str(e)})

if __name__ == "__main__":
    app.run(debug=True)