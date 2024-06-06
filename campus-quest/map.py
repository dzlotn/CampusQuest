import pandas as pd 
import geopandas as gpd
import matplotlib.pyplot as plt 
from mpl_toolkits.basemap import Basemap # Sample Data (should be replaced with actual data from a CSV or other data source) 
data = { 'College': ['Harvard University', 'Stanford University', 'MIT'], 'Students': ['Alice, Bob', 'Charlie, Dave', 'Eve, Frank'], 'Latitude': [42.3770, 37.4275, 42.3601], 'Longitude': [-71.1167, -122.1697, -71.0942] } # Create a DataFrame
df = pd.DataFrame(data) # Plot the map fig, 
ax = plt.subplots(figsize=(15, 10)) # Setup Basemap 
m = Basemap( projection='merc', llcrnrlat=24, urcrnrlat=50, llcrnrlon=-125, urcrnrlon=-66, resolution='i', ax=ax ) 
m.drawcoastlines() 
m.drawcountries() 
m.drawstates() # Plot each college on the map 
for index, row in df.iterrows(): 
    x, y = m(row['Longitude'], row['Latitude']) 
    m.plot(x, y, 'bo', markersize=10) 
    plt.text(x, y, f"{row['College']}\n{row['Students']}", fontsize=12, ha='left', va='center', color='black') 
plt.title('College Destinations for HTHS Class of 2023') 
plt.show()
