#print("hello world")

# call for the request
import requests

#add my key for the weather API 
token = "79809a7dd45c290747d082657bd73fcaedfdd200"

#temperature range for the game 
temp_min = 20
temp_max = 28

#air quality 
aqi_min = 10
aqi_max = 50

#game text introduction
print(" 🌡️ temperature and pollution guessing game 💨 ")
print(f"Goal: find the perfect city with the temperature and air quality necessary {temp_min}, {temp_max}, AQI: {aqi_min} and {aqi_max}")

#interaction
name = input ("write your name: ")
user_city = input("type the name of a city: ")

#url for the wesite weatherApi
url = f"https://api.waqi.info/search/?token={token}&keyword={user_city}"
response= requests.get(url)
data= response.json()

print(data)


station_uid = data['data'][0]['uid']

feed_url = f"https://api.waqi.info/feed/@{station_uid}/?token={token}"
feed_response = requests.get(feed_url)
feed_data = feed_response.json()
    
print(feed_data)