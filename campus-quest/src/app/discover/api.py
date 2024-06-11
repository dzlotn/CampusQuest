import sys
import json
from serply import Serply

# import system library
import sys

serply = Serply("N4shxJsBsGLLvTM9VQvKxXdn")

# take passed variable values
college = str(sys.argv[1])


def getImage(college):
    results = serply.image(college + "logo wikimedia transparent background")
    imgs = results["image_results"]
    for i in imgs:
        if "commons.wikimedia.org" in i["link"]["domain"]:
            print( i["link"]["href"])
            break


getImage(college)
