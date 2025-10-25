from flask import Flask, render_template

app = Flask(__name__)

#default path entry point
@app.route("/")
def index():
    return '<h1> hello world </h1>'

@app.route("/user")
def user():
    return "<h1> hello user </h1>"

#inside angle brackets is the dynamic variable
@app.route("/user/<name>")
def user_name(name):
    return f"<h2> this is the user <span style= 'color:orange'> {name}'s page"

#@app.route("/pineapple")
#def pineapple():
   #return render_template("pineapple.html")

@app.route("/pineapple")
def pineapple():
    userLoggeIn= True
    a_new_list= [1,2,3,4,5]
    color_list= ["red","bleu","green","yellow","pink"]
    return render_template("pineapple.html", a_new_list= a_new_list, 
                           color_list=color_list,
                           userLoggeIn=userLoggeIn)


app.run(debug=True)