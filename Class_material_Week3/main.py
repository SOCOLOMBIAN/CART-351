class_professors = {
    'Cart_253_A':'Pippin Bar',
    'Cart_211':'Brad Todd',
    'Cart_214':'Joanna Berzowska', 
    'Cart_215':'Jonathan Lessard'
}

print(type(class_professors))

dict_2 = {}
print(type(dict_2))
#print(class_professors['Cart_255'])
cart_key = 'Cart_215'
print(class_professors[cart_key])
print(class_professors.keys())
print(class_professors.keys())

for key in class_professors.keys():
    print(key)
    print(class_professors[key])
    
for key in class_professors:
    print (key)
    print(class_professors[key])
        
    print(class_professors.values())
    print(class_professors.items())

print('CART_253_A' in class_professors)
