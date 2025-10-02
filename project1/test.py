#import the request for the weather
import requests

city= imput("enter a city name: ")

#write the api key for the open weather
api_key="629f1cc3c63fee4339bef39db763aff1"

#get the website url 
url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"

response= requests.get(url)
data= response.json()
print(data)