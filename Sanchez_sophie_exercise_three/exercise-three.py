from flask import Flask,render_template,request, jsonify
import os
import json 
app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads' # Or os.path.join(app.instance_path, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16 MB limit

# the default route
@app.route("/")
def index():
      return render_template("index.html")


# Task: CAPTURE & POST & FETCH & SAVE
@app.route("/t2")
def t2():
    return render_template("t2.html")

@app.route("/postDataFetch",methods = ['POST'])
def postDataFetch():
    
    data= request.get_json()
    app.logger.info(data)
    
    #emotion data
    userName= data.get("userName")
    emotion= data.get("emotion")
    intensity= data.get("intensity")
    
    #save data to data.txt
    with open('files/data.txt', 'a') as f:
        f.write(f"{userName}: {emotion} {intensity}\n")
    
    #return json 
    return jsonify({
        "status": "success!",
        "message": f"{userName}, you {emotion} emotion is saved",
        "details": f"intensity: {intensity} /10"
    })
    
# run
app.run(debug=True)