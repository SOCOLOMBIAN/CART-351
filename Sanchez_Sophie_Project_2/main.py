from flask import Flask,render_template,request, jsonify,session,redirect,url_for
import json 
import os

app = Flask(__name__)
app.secret_key = "your_secret_key"
DATA_FILE = "data.txt"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        session["user"] = { # save session 
            "name": request.form.get("name"),
            "month": request.form.get("month"),
            "question": request.form.get("user_question")
        }
        return redirect(url_for("card"))
    return render_template("register.html") 

@app.route("/card")
def card():
    user = session.get("user")
    if not user:
        return redirect(url_for("register"))
    return render_template("card.html", user=user)

@app.route("/saveCardData")
def saveCardData():
    try:
        card_name = request.args.get('cardName')
        card_message= request.args.get('cardMessage')
        user= session.get("user")
        
        if not user:
            return jsonify({"success": False, "message":"No data found"})
        
        #the reading object variables
        reding= {
            "name": user.get("name"),
            "month": user.get("month"),
            "question": user.get("question"),
            
        }

@app.route("/reading")
def reading():
    user = session.get("user")
    if not user:
        return redirect(url_for("register"))
    return render_template("reading.html", user=user)


app.run(debug=True)