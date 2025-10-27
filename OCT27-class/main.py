#library
from flask import Flask,render_template,request,redirect,url_for
import os
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html",
                           user={"username":"sabine"},
                           passedDictionary={
                                            "fav_color":"fuscia", 
                                             "fav_veg":"cauliflower",
                                             "fav_fruit":"kiwi",
                                             "fav_animal":"toucan"
                                             },
                            imgPath = "../static/images/pineapple_2.jpg"
                                        
                           ) 

@app.route("/inputPlant")
def addPlantData():
    return render_template("addPlantData.html") 

#version 2
# @app.route("/thank_you")
# def thank_you():
#     app.logger.info(request.args)
  
#     if('a_name' in request.args):
#         owner_name = request.args["a_name"] 
#         app.logger.info(owner_name)
#          #url is not clean
#         #return render_template("thankyou.html",owner_name = request.args["a_name"]) 
        
#         # issue we lose the parameters! - but url is clean :)
#         return redirect(url_for("thank_you")) 
#     #part of the reloading process... we redirect - then headers rewritten and reload the template
#     else:
#         return render_template("thankyou.html") 
    
@app.route("/thank_you")
def thank_you():
    app.logger.info(request.args)
    owner_name = request.args["a_name"] 
    app.logger.info(owner_name)
         #url is not clean
    return render_template("thankyou.html",owner_name = owner_name) 



@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"),404


app.run(debug=True)