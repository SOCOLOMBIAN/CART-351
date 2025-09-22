#!/usr/bin/python3
# # print(30 +5)
# # print(30 /5) # float divison 
# # print(30 //5) #floor divison 
# # print(100-25 * 4) # rules of precedence 
# # print (3%4)
# # print(5**2) #25
# # print(5**3) #35
# # print ( 3 > 5) # >, <, !=,==,>=,<=

# # print(False and True)
# # print(not(True))

# cars= 100
# space_in_car= 3
# drivers= 30
# passengers= 90
# passangers= 56.23
# cars_not_driven = cars-drivers
# cars_driven= drivers
# car_pool_capacity = cars_driven * space_in_car

# car_name= "subaru"
# car_statement = f"the cars name is {car_name}"

# print("the cars name is",car_name)
# print(f"the cars name is {car_name}")
# print(car_statement)

# my_name= input("type your name: ")
# print(my_name)
# my_age= input("type your age: ")


# def least_diff(x1, x2, x3):
#     #body of function 
   
#     diff_1 =abs(x1-x2)
#     diff_2 =abs(x2-x3)
#     diff_3 =abs(x1-x3)
#     return min(diff_1,diff_2,diff_3)

# least_diff_a = least_diff(20,60,6)
# least_diff_b = least_diff(20,600,6)

# # print(least_diff_a)
# # help(least_diff)

# def process(alteringFunction,text):
#     newText = alteringFunction(text)
#     return newText

# def textToUpper(text):
#     return text.upper()

# def textToLower(text):
#     return text.lower()

# print(textToLower("SABINE"))
# print(textToUpper("banana"))

# print (process(textToLower, "sanDia"))
# print (process(textToUpper, "Test"))

# var_one = 21
# var_two= 4

# if (var_one> var_two):
#     print("var one is greater")
# else:
#     print("var_two is greater")
    
#     if (var_one> var_two):
#         print ("var one is grater")
#     elif (var_one == var_two):
#         print("they are the same")
#     else:
#         print("not the same")

num=5 
for i in range(0,num,2):
    print(i)
