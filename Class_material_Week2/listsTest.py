#!/usr/bin/python3
fruit = ["apples","bananas","carrots"] # simple list of strings 
mixed_list = [1,3, "string", True, ["a","b","c"]] #list of mixed types

for item in fruit:
    print(item)
    
# testString = "test one two three"
# for element in testString:
#     print(element)
    
newItems= [] #empty list 
newItems.append("hello")
for i in range(2,10):
    newItems.append(i)
    
print(newItems)

print(newItems[0])
print(len(newItems))
lengthOfList = len(newItems)
print(newItems[lengthOfList-1]) # return to the last list 
   
newItems.insert(2,"new item at position 2")
print(newItems)
anotherList= ["a","b","c"]

#extending a list with another list 
# newItems+=anotherList
# #newItems.extend(anotherList)
# print(newItems)

thirdList= newItems+ newItems+ anotherList
print(thirdList)
# print(thirdList.index("afgfgf"))
# thirdList.remove("a")
# print(thirdList)
# thirdList.pop()
# print(thirdList)
# thirdList.pop(0)
# print(thirdList)

# joinOn= "*"
# newStringsList= ["apples","oranges","pears"]
# #convert from list to string 
# listAsString= joinOn.join(newStringsList)
# print(listAsString)
# #convert from string to list 
# newSliptList = listAsString.split("p")
# print(newSliptList)

aList= [1,2,3,4,5,"a","b","c"]
print(aList[1:4])
print(aList[ : :]) #entire list
print(aList[2:]) # 3 item to end 
print(aList[:4]) # beggining to 4th item 
print(aList[1:8:2]) #every second item between position 1 and 8

print(aList[-2])

