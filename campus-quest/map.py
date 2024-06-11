import pandas as pd 
import matplotlib.pyplot as plt 
from mpl_toolkits.basemap import Basemap
import numpy as np

# Sample data
data = { 
    'College': ['Harvard University', 'Stanford University', 'MIT'], 
    'Students': ['Alice, Bob', 'Charlie, Dave', 'Eve, Frank'], 
    'Latitude': [42.3770, 37.4275, 42.3601], 
    'Longitude': [-71.1167, -122.1697, -71.0942] 
}

# Create a DataFrame
df = pd.DataFrame(data) 

# Plot the map
fig, ax = plt.subplots(figsize=(15, 10))  # Create the figure and axes

# Setup Basemap
m = Basemap(
    projection='merc', 
    llcrnrlat=24, urcrnrlat=50, 
    llcrnrlon=-125, urcrnrlon=-66, 
    resolution='i', 
    ax=ax  # Pass the axes object to Basemap
) 

m.drawcoastlines() 
m.drawcountries() 
m.drawstates() 

# Define initial label positions around the map edges
label_positions = {
    'Harvard University': (-125, 55),
    'Stanford University': (-125, 50),
    'MIT': (-125, 45)
}

# Function to adjust positions to avoid overlap
def adjust_positions(label_positions, margin=0.05):
    adjusted_positions = []
    for label, pos in label_positions.items():
        label_x, label_y = pos
        adjusted = False
        for ap in adjusted_positions:
            while np.hypot(label_x - ap[0], label_y - ap[1]) < margin:
                label_y += margin
                adjusted = True
        if not adjusted:
            adjusted_positions.append((label_x, label_y))
        else:
            adjusted_positions.append((label_x, label_y))
    return adjusted_positions

# Adjust label positions to avoid overlap
adjusted_positions = adjust_positions(label_positions)

# Plot each college on the map
for index, (label, pos) in enumerate(label_positions.items()): 
    row = df.loc[df['College'] == label].iloc[0]
    x, y = m(row['Longitude'], row['Latitude']) 
    m.plot(x, y, 'bo', markersize=10) 
    
    # Get adjusted label position
    label_x, label_y = adjusted_positions[index]
    label_x, label_y = m(label_x, label_y)  # Convert to map projection coordinates

    # Annotate with arrow
    ax.annotate(
        f"{row['College']}\n{row['Students']}", 
        xy=(x, y), 
        xytext=(label_x, label_y),
        fontsize=10, 
        ha='left', 
        va='center', 
        color='black',
        arrowprops=dict(facecolor='black', arrowstyle="->")
    )

# Set new plot limits to include labels
plt.xlim(m.llcrnrx, m.urcrnrx)
plt.ylim(m.llcrnry, m.urcrnry)

plt.title('College Destinations for HTHS Class of 2023') 
plt.show()
