from googlesearch import search
import requests
import os

def download_image(query):
    # Create a folder to store downloaded images if it doesn't exist
    if not os.path.exists('downloaded_images'):
        os.makedirs('downloaded_images')

    try:
        # Search Google Images for the query
        search_results = search(query + " images")
        
        for search_url in search_results:
            if 'imgurl' in search_url:
                # Extract the image URL from the search result
                img_url = search_url.split('imgurl=')[1].split('&')[0]
                
                # Download the image
                img_response = requests.get(img_url)
                
                if img_response.status_code == 200:
                    # Save the image to a file
                    with open(f"downloaded_images/{query}.jpg", 'wb') as f:
                        f.write(img_response.content)
                    print(f"Image downloaded successfully as {query}.jpg")
                    return
                else:
                    print("Failed to download image")
        print("No images found")
    except StopIteration:
        print("No images found")

# Example usage
search_query = input("Enter your search query: ")
download_image(search_query)
