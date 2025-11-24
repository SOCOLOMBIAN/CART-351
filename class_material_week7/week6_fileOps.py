import json

# # Open rainbow.txt in append mode, open for reading c
# # rainbowFile = open("files/rainbow.txt", "r")
# # out = rainbowFile.read(4)
# # print(out)
# # out_2= rainbowFile.read()
# # print(out_2)
# # rainbowFile.close()

# rainbowFile = open("files/rainbow.txt", "r")
# # # outline = rainbowFile.readline()
# # # print(outline)
# # outlines = rainbowFile.readlines()
# # print(outlines)

# # sampleFile= open("files/sample_text.txt", "w+")

# # animalList= []
# # for i in range(3):
# #     a_name = input("enter animal: ")
# #     animalList.append(a_name+ '\n')
# # sampleFile.writelines(animalList)
# #     # sampleFile.write(a_name)
# #     # sampleFile.write("\n")
# # sampleFile.close()

# sampleFile_a = open("files/sample_text.txt", "a")
# nameList = []
# for i in range(3):
#     name= input("type name: ")
#     nameList.append(name + "\n")
# sampleFile_a.writelines(nameList)
# sampleFile_a.close()

# Read from file and parse JSON
# jsonFile = open("files/test.json", "r")
# data = json.load(jsonFile)
# print(data)
# print(type(data)) # a list

# json_str = '{"name":"Sabs", "fav_col":"red", "fav_city":"montreal"}'
# data_2 = json.loads(json_str) 
# print(data_2["name"])

# data_toSave = {"name":"mandy", "fav_col":"blue", "fav_city":"winnipeg"}
# data_s = json.dumps (data_toSave, indent=4)
# fileToOpen = open("files/new_sample.json", "w")
# fileToOpen.write(data_s)

# data_toSave_2= {"name":"mandy", "fav_col":"blue", "fav_city":["list",3,4,True,"abc"]}
# fileToOpen= open("files/new_sample.json", "w")
# json.dump(data_toSave_2,fileToOpen,indent =4)
# fileToOpen.close()

jsonFile = open("files/new_sample_b.json", "r+")
data = json.load(jsonFile)
print(data['fav_city'])
print(type(data['fav_city']))
# #go to beginning of file
jsonFile.seek(0)
data['fav_city'].append("another element")
data["newKey"] = 1234
#output to the file
json.dump(data,jsonFile, indent =4)