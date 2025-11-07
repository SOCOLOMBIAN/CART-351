from flask import Flask,render_template,request, jsonify
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
        session["user"] = {
            "name": request.form.get("name"),
            "month": request.form.get("month"),
            "question": request.form.get("user_question")
        }
    return redirect(url_for("card"))
return render_template("register.html")



@app.route("/reading")
def reading():
    return render_template("reading.html")

@app.route("/card")
def card():
    return render_template("card.html")

app.run(debug=True)