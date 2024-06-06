import requests
from bs4 import BeautifulSoup

def get_college_location(college_name):
    # Replace spaces in the college name with '_' for the Wikipedia URL
    college_name_url = '_'.join(college_name.split())

    # Wikipedia URL for the college
    url = f"https://en.wikipedia.org/wiki/{college_name_url}"

    # Sending HTTP request
    response = requests.get(url)

    # Parsing HTML content
    soup = BeautifulSoup(response.text, 'html.parser')

    # Finding the location information
    location_tag = soup.find("span", {"class": "geo"})
    
    if location_tag:
        # Extracting the latitude and longitude from the location tag
        latitude, longitude = location_tag.text.split("; ")
        return latitude, longitude
    else:
        return None, None

# Example usage
college_name = "Stanford_University"
latitude, longitude = get_college_location(college_name)
if latitude and longitude:
    print(f"The geographical location of {college_name.replace('_', ' ')} is: Latitude {latitude}, Longitude {longitude}")
else:
    print(f"Unable to find the geographical location of {college_name.replace('_', ' ')}")
