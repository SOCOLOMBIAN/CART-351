from flask import Flask,render_template,request
import os
app = Flask(__name__)


# the default route
@app.route("/")
def index():
      return render_template("index.html")


# Task: Variables and JinJa Templates
@app.route("/t1")
def t1():
      the_topic = "donuts"
      number_of_donuts = 28
      donut_data= {
      "flavours":["Regular", "Chocolate", "Blueberry", "Devil's Food"],
      "toppings": ["None","Glazed","Sugar","Powdered Sugar",
                   "Chocolate with Sprinkles","Chocolate","Maple"]
                   }
      
      icecream_flavors = ["Vanilla","Raspberry","Cherry", "Lemon"]
      return render_template("t1.html",the_topic = the_topic,
                             number_of_donuts= number_of_donuts,
                             donut_data= donut_data,
                             icecream_flavors=icecream_flavors)

#Task: HTML Form get & Data 
@app.route("/t2")
def t2():
    return render_template("t2.html")

#  route for the thank you route
@app.route("/thank_you_t2")
def thank_you_t2():
    app.logger.info(request.args)
    
    firstname = request.args["firstname"]
    donut = request.args["donut"]
    description= request.args["description"]
    
    combined = firstname + " " + donut + " " + description
    
    vowels= "aeiou"
    modified= ""
    for names in combined:
        if names in vowels:
            modified += "*"
        else:
            modified += names
        
    return render_template("thankyou_t2.html",result=modified)


#run
app.run(debug=True)