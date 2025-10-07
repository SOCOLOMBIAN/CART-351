#print("hello world")

# call for the request
import requests

#import colorama library
import colorama 
from colorama import Fore, Back, Style
colorama.init(autoreset=True)

#add my key for the weather API 
token = "79809a7dd45c290747d082657bd73fcaedfdd200"

#temperature range for the game 
temp_min = 20
temp_max = 28

#air quality 
aqi_min = 10
aqi_max = 50

#game text introduction with colors 
print( "\n" + Fore.CYAN + "="* 60)
print( Fore.YELLOW + Style.BRIGHT+ " 🌡️ Welcome to temperature and pollution guessing game 💨 ")
print(Fore.CYAN + "="* 60) #this line was a suggestion of 
print( Fore.GREEN + f"the goal is to find the perfect city with: \n ")
print( Fore.GREEN + f"the temperature {temp_min} and {temp_max} \n ")
print( Fore.GREEN + f"air quality: {aqi_min} and {aqi_max} ")
print( Fore.MAGENTA + "\n Type 'quit' to exit anytime")

#interaction: the user needs to put their name
print( "\n" + Fore.CYAN + "="* 60)
name = input (Fore.YELLOW + " 🖊️ write your name: ")
print(Fore.CYAN + "="* 60)

#user_city = input("type the name of a city: ")

#looping
game_win= False

#looping starting game 
while game_win == False:
    user_city = input( Fore.YELLOW + "\ntype the name of a city: " + Style.RESET_ALL)


# if the user wants to leave the game, (this was made with the help of ressource)
    if user_city.lower() == 'quit':
        print(Fore.MAGENTA + f"\n thanks for playing, {name}! 👋🏼 ")
        break

#url for the wesite weatherApi to search te city 
    url = f"https://api.waqi.info/search/?token={token}&keyword={user_city}"
    response= requests.get(url)
    data= response.json()

#check the data available for the city, sometimes city is not available 
    if data['status'] != 'ok' or len(data['data']) == 0:
        print(Fore.RED + f"your search for {user_city} was not found, try typing another city! 🙂 ")
        continue #this suggestion was with the ressource of debugging with AI since the code did not continue to work 
    
#get the station uid  (the number of the location an unique id)
    station_uid = data['data'][0]['uid']
    station_name= data['data'][0]['station']['name']
    print(station_name)
    print(station_uid)

#checking the city that the user imput 
    print(Fore.CYAN + f"\n Found station {station_name}")

#information of the station 
    feed_url = f"https://api.waqi.info/feed/@{station_uid}/?token={token}"
    feed_response = requests.get(feed_url)
    feed_data = feed_response.json()
#print(feed_data)

#check if the status of the city is good, if not find the user needs to write the name of another city
    if feed_data['status'] != 'ok':
        print( Fore.RED + f" your search for {station_name} was not found, try typing another city! 🙂 ")

# getting the important part of data the air quality and the temperature 
    response_data_feed = feed_data ['data']
    aqi= response_data_feed['aqi']
    temp= response_data_feed ['iaqi'] ['t'] ['v']
    print(response_data_feed ['iaqi'])

#check the condtions of the temperature
    temp_good= temp_min <= temp <= temp_max
    #print(temp_good)
    aqi_good=  aqi_min <= aqi <= aqi_max

#temperature conditions with color
    if temp_good:
        print(Fore.GREEN + f"temperature: {temp} is perfect")
    elif temp_min <temp_min:
        print(Fore.BLUE + f"temperature: {temp} too cold ❄️ ")
    else:
        print(Fore.RED + f"temperature: {temp} too hot 🔥 ")
    
    #air quality conditions with color 
    if aqi_good:
        print(Fore.GREEN + f"temperature: {aqi} is perfect")
    elif aqi <aqi_min:
        print(Fore.BLUE + f"air quality: {aqi} too clean 🌬️ ")
    else:
        print(Fore.RED + f" Air quality: {aqi} too polluted 💨 ")
        

#check if the condtions are truth or false
    if temp_good and aqi_good:
        
        print( "\n" + Fore.CYAN + "="* 60)
        print(Fore.YELLOW + Style.BRIGHT + f"Congratulations!! 🎉 {name}")
        print( "\n" + Fore.CYAN + "="* 60)
        print(Fore.CYAN + f"you found the perfect city {user_city}")
        print(Fore.GREEN + f"\n 🌡️ tempearature: {temp}")
        print(Fore.GREEN + f"\n  💨air pollution: level {aqi}")
        game_win = True
    else:
        print( Fore.RED + Style.BRIGHT + " keep trying, type another city")

    
    
    

