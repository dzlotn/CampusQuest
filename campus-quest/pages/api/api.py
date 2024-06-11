import sys
import json
from serply import Serply

serply = Serply('N4shxJsBsGLLvTM9VQvKxXdn')

def getImage(college):
    results = serply.image(college + " logo wikimedia transparent background")
    imgs = results["image_results"]
    for i in imgs:
        if "commons.wikimedia.org" in i["link"]["domain"]:
            return i["link"]["href"]
    return None

if __name__ == '__main__':
    # Read data from stdin
    input_data = json.loads(sys.stdin.read())
    college_name = input_data.get('college')
    
    # Call the function and print the result as JSON
    result = getImage(college_name)
    print(json.dumps({"url": result}))
