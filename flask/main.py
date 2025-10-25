from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return '<h1> Hello CART 351!</h1>'

@app.route("/about")
def about():
    firstName = "Sophie"
    return render_template("pineapple.html",firstNameKey = firstName)


@app.route("/contact")
def contact():
    firstName = "Maria"
    return render_template("pineapple.html",firstNameKey = firstName)
app.run(debug=True)
 