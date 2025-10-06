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
#user_city = input("type the name of a city: ")

#looping
game_win= False

while game_win == False:
    user_city = input("type the name of a city: ")
  

# if the user wants to leave the game?

#url for the wesite weatherApi to search te city 
    url = f"https://api.waqi.info/search/?token={token}&keyword={user_city}"
    response= requests.get(url)
    data= response.json()

#check the data available fro the city, sometimes city is not available 
    if data['status'] != 'ok' or len(data['data']) == 0:
        print(f" your search for {user_city} was not found, try typing another city! 🙂 ")
    

#get the station uid  (the number of the location an unique id)
    station_uid = data['data'][0]['uid']
    station_name= data['data'][0]['station']['name']
    print(station_name)
    print(station_uid)

#information of the station 
    feed_url = f"https://api.waqi.info/feed/@{station_uid}/?token={token}"
    feed_response = requests.get(feed_url)
    feed_data = feed_response.json()
#print(feed_data)

#check if the status of the city is good, if not find the user needs to put imput city
    if feed_data['status'] != 'ok':
        print(f" your search for {station_name} was not found, try typing another city! 🙂 ")

# getting the important part of data
    response_data_feed = feed_data ['data']
    aqi= response_data_feed['aqi']
    temp= response_data_feed ['iaqi'] ['t'] ['v']
    print(response_data_feed ['iaqi'])


#how to get the temperature?
    

#check the condtions of the temperature

    temp_good= temp_min <= temp <= temp_max
    print(temp_good)
    aqi_good=  aqi_min <= aqi <= aqi_max


#check if the condtions are truth or false
    if temp_good and aqi_good:
        print(f"Congratulations {name}")
        print(f"you found the perfect city {user_city}")
        print(f"Congratulations {temp}")
        print(f"Congratulations {aqi}")
        game_win = True
    else:
        print(f"try again, another city {user_city}")

    
    
    

