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
