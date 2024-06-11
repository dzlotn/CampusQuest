from serply import Serply

serply = Serply('N4shxJsBsGLLvTM9VQvKxXdn')

def getImage(college):
    results = serply.image(college + "logo wikimedia transparent background")
    imgs = results["image_results"]
    for i in imgs:
        if "commons.wikimedia.org" in i["link"]["domain"]:
            print("WIKIMEDIA FOUND")
            return i["link"]["href"]
            
    
getImage("Cornell University")

print('Hello from python')