shopping = {'vegetables': ['spinach','carrots','brocolli','lettuce'],
            'fruit': ['canteloupe','bananas'],
            'bakery': ['bagels','rye bread']}
print(shopping['fruit'])
for item in shopping['fruit']:
    print(item)

print(shopping['vegetables'][0])

shopping_rev = {
            'vegetables': {"green":["spinach","broccoli","lettuce"],
                           "orange":["carrots"]
                           },
            'fruit': ['canteloupe', 'banananas'],
            'bakery': ['bagels', 'rye bread']}
print(shopping_rev['vegetables']['orange'][0])
shopping_rev['cleaning_items'] = ['dish soap', 'sponges']
print(shopping_rev)