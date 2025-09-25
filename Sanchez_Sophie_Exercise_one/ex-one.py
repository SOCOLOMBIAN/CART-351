# 1. import the library 
import requests 

#2. get our key
token = "79809a7dd45c290747d082657bd73fcaedfdd200" # replace this with your own key

#3. get website url variable
url = "https://api.waqi.info/search/"

# 4. acces the data trough the dictionnary 
response = requests.get(url, params={"token": token, "keyword": "montreal"})

#5. response variabke containing the parsed JSON response
results = response.json()

#6. confirm and verify the data
print(results)

#7. tis is a class dictionary <class 'dict'>
print(type(results))

#8. the dictionary has 2 keys dict_keys(['status', 'data'])
print(results.keys())

#9.acces to content of the 'data' field 
responseData= results['data']

#10. find  the type of responde data, is a <class 'list'>
print(type(responseData))

#11. each item represent dicitionary entries of montreal
for item in responseData:
    print(item)

#12
print("type of item:", type(item))

#13 the type of key associated are dict_keys(['uid', 'aqi', 'time', 'station'])
print (item.keys())

#14 name of the station in responsedata, assign the name of latitude,longitude, air quality and uid and print the coordinates 
for station in responseData:
    latitude= station ['station'] ['geo'] [0]
    longitude= station ['station'] ['geo'] [1]
    aqui= station ['aqi']
    uid= station ['uid']
    print (f"Air Quality: {aqui}")
    print (f" uid: {uid}")
    print(f"lat:{latitude} log:{longitude}") 

#part 6

#1 /feed/5460/?token=79809a7dd45c290747d082657bd73fcaedfdd200
 
url_feed = "https://api.waqi.info/feed/@5460"
response_feed = requests.get(url_feed, params={"token": token})
results_feed = response_feed.json()
print(results_feed)

#2  name the expression to acces to the content of the data 
response_data_feed= results_feed ['data']

#3 the type of item: <class 'dict'>
print("type of item:", type(response_data_feed))

#4 for loop to iterate trough response_data_feed
for item in response_data_feed:
    print(f"key: {item}, value: {response_data_feed[item]}") #key and value

#5 expression to acces the field of aqi and dominentpol
# aqi: Air Quality Index 
# dominentpol: The pollutant 
iaqi_value= response_data_feed ['iaqi']
dominentpol_value= response_data_feed ['dominentpol']

print(f"iaqui: {iaqi_value}")
print(f"dominetpol: {dominentpol_value}")

#6 acces to the iaqi fiel
iaqi_value= response_data_feed ['iaqi']

print("type of item:", type(iaqi_value))
print (iaqi_value.keys())

#acces to dominant pollutant to get it value from iaqi field
print (f"value for dominant pollutant: {dominentpol_value}")

# value for dominant pollutant: pm25
for pollutant_item in response_data_feed["iaqi"]:
    print(pollutant_item)

#7 explain
# use the requests for the API calls 
# the procces can be to create identifiers of the cities 
# a loop that goes troughout all the cities 
# extract the coordinates of each station and the dominant pollutant 