from dotenv import load_dotenv
from flask import Flask,render_template,request,redirect, url_for,session
# use flask_pymongo instead of  normal pymongo (simplifies integration)
#import datetime
from datetime import datetime
from flask_pymongo import PyMongo
import os
load_dotenv()  # Load variables from .env and .flaskenv
db_user = os.getenv('MONGODB_USER')
db_pass = os.getenv('DATABASE_PASSWORD')
db_name = os.getenv('DATABASE_NAME')

app = Flask(__name__)
# set a config var
app.secret_key = 'BAD_SECRET_KEY'
UPLOAD_FOLDER = 'static/uploads' 
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16 MB limit
# uri = f"mongodb+srv://{db_user}: {db_pass} @cluster0.8uqe4zh.mongodb.net/?appName=Cluster0"
uri = f"mongodb+srv://{db_user}:{db_pass}@cluster0.8uqe4zh.mongodb.net/{db_name}?retryWrites=true&w=majority"
app.config["MONGO_URI"] = uri
mongo = PyMongo(app)
format_string = "%Y-%m-%d"
# try:
# #get details of the client
# #print (mongo.cx)
# #get collection
# #print(mongo.db.plantRepo)
# #print("You successfully connected to MongoDB!")
#     result = mongo.db.plantRepo.insert_one({"testKeyMon":"testValueMon"})
#     print(result)
# except Exception as e:
#     print(e)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/insertTestPage')
def insertTest():
    session.pop('ids', default=None)
    return render_template("testInsert.html")

# a route
@app.route('/insertMany')
def insertMany():
    data = [
{'owner_name': 'Sarah',
'plant_name' : 'Snake Plant',
'birthDate':datetime.strptime("2002-06-12", format_string),
'geoLoc': 'Montreal',
'descript': 'Description for the plant',
'imagePath': 'images/one.png'
},
{
'owner_name': 'Sarah',
'plant_name' :'Cactus',
'birthDate' :datetime.strptime("2005-06-13", format_string),
'geoLoc':'Toronto',
'descript':'Description for the plant',
'imagePath': 'images/seven.png'
},
 
 {
'owner_name': 'Sarah',
'plant_name' : 'Agapanthus',
'birthDate': datetime.strptime("2003-03-19", format_string),
'geoLoc': 'Halifax',
'descript': 'Description for the plant',
'imagePath': 'images/seventeen.png'
},
 {
'owner_name': 'Stephen',
'plant_name' : 'Baby Rubber Plant',
'birthDate ': datetime.strptime("1997-07-18", format_string),
'geoLoc': 'Edinborough',
'descript':'Description for the plant',
'imagePath': 'images/ten.png'
},
 
{
'owner_name': 'Stephen',
'plant_name' : 'Dahlia',
'birthDate' :datetime.strptime("2000-05-06", format_string),
'geoLoc':'London',
'descript':'Description for the plant',
'imagePath': 'images/thirteen.png'
},
 
{
'owner_name' : 'Harold',
'plant_name' : 'Daphne',
'birthDate': datetime.strptime("2012-10-21", format_string),
'geoLoc':'New York',
'descript':'Description for the plant',
'imagePath': 'images/three.png'
},
{
'owner_name' : 'Martha',
'plant_name' : 'Daylily',
'birthDate' :datetime.strptime("2017-08-21", format_string),
'geoLoc':'Paris',
'descript':'Description for the plant',
'imagePath': 'images/nine.png'
}
]
    try:
        # insert many works :)
        result = mongo.db.plantRepo.insert_many(data)
        session['ids'] = result.inserted_ids
        return redirect(url_for('testIds'))
    except Exception as e:
        print(e)


@app.route('/testIds')
def testIds():
    print(session['ids'])
    return render_template("testIds.html")

# a route
@app.route('/viewResults')
def viewResults():
    # result = mongo.db.plantRepo.find_one({})
    # result = mongo.db.plantRepo.find()
    # result = mongo.db.plantRepo.find({'points':{'$gt':5}})
    startTime = datetime.strptime("2003-01-12", format_string)
    endTime = datetime.strptime("2015-01-12", format_string)
    # result= mongo.db.plantRepo.find({'birthDate':{'$gt':startTime}})
    result = mongo.db.plantRepo.find({'$and':[{'birthDate':{'$gt':startTime}},{'birthDate':{'$lt':endTime}} ]})
    return render_template("viewResults.html",result=result)
    

@app.route('/updateOne')
def updateOne():
    try:
        updatedRepoItem= mongo.db.plantRepo.find_one_and_update(
            {'plant_name' :'Agapanthus'},
            {'$set':{'descript':'a more precise description'}}
            )
        return redirect(url_for("insertTest"))
    except Exception as e:
         print(e)
         

@app.route('/updatePoints')
def updatePoints():
    try:
        updatedRepoItem= mongo.db.plantRepo.find_one_and_update(
            {'user' :'maria'},
            {'$inc':{'points':2}}
            )
        return redirect(url_for("insertTest"))
    except Exception as e:
        print(e)

@app.route('/updateMany')
def updateMany():
     try:
        updatedRepoItem= mongo.db.plantRepo.update_many(
            {'owner_name' :'Sarah'},
            {'$set':{'descript':'a more precise description for all sarahs','title':'testALL'}}
            )
        return redirect(url_for("insertTest"))
     except Exception as e:
        print(e)

@app.route("/insertPlant")
def insertPlant():
    return render_template('insertPlant.html')


@app.route("/postPlantFormFetch",methods = ['POST'])
def postPlantFormFetch():
     #key is the same as in the form :)
    uploadedfile = request.files['the_file']
    #save file to uploads folder
    filePath = os.path.join(app.config['UPLOAD_FOLDER'], uploadedfile.filename)
    app.logger.info(filePath)
    uploadedfile.save(filePath)
    app.logger.info(uploadedfile.filename)
    

    dataToMongo = {
'owner_name': request.form['o_name'],
'plant_name' : request.form['a_name'],
'birthDate': datetime.strptime(request.form['a_date'], format_string),
'geoLoc': request.form['a_geo_loc'],
'descript': request.form['a_descript'],
'imagePath': f"uploads/{uploadedfile.filename}"
}
    
    try:
        res = mongo.db.plantRepo.insert_one(dataToMongo)
          #return the file name
        return({"imagePath":filePath})
    except Exception as e:
 
        print(e)  
    
    
    
    

  #return the file name
    return({"imagePath":filePath})


app.run(debug = True)