import os
import urllib.parse
import requests
import csv

API_KEY = os.environ.get("N4shxJsBsGLLvTM9VQvKxXdn")
headers = {"apikey": API_KEY}

query = {"q": "best bike trail", "hl": "en"}
url = "https://api.serpwow.com/images?" + urllib.parse.urlencode(query)

resp = requests.get(url, headers=headers)

try:
    # Check if the response contains valid JSON
    results = resp.json()

    # Check if 'image_results' key is present in the response
    if 'image_results' in results:
        with open("images.csv", "w", newline='', encoding='utf-8') as csvfile:
            f = csv.writer(csvfile)
            f.writerow(["thumbnail", "title", "link"])  # Writing header row

            for result in results["image_results"]:
                f.writerow([
                    result.get('thumbnail', ''),  # Using 'thumbnail' instead of 'src' for image URL
                    result.get('title', ''), 
                    result.get('link', '')
                ])
    else:
        print("No 'image_results' found in the response.")

except ValueError:
    print("Response from the API is not valid JSON:")
    print(resp.content.decode('utf-8'))  # Print the response content to investigate the issue
