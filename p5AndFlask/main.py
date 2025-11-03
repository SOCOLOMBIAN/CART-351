from flask import Flask,render_template,request
app= Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

app.run(debug= True)

# another route
@app.route('/p5Test')
def runpP5():
    return render_template("p5_WithFlask.html")

# for the get from p5
@app.route('/getDataFromP5')
def getDataFromP5():
    #give back request.args
    app.logger.info(request.args["id"])
    app.logger.info(request.args["score"])
    return({"inFile":"false"})