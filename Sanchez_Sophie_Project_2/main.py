from flask import Flask,render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", 
                           user={"username":"sophie"}
    )
    
@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/card")
def card():
    return render_template("card.html")

app.run(debug=True)