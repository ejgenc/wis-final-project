import sys
import json
from urllib.request import urlopen

import numpy as np
from skimage import color, util, io
from sklearn import cluster

# utility functions
def rgb_to_hex(red, green, blue):
    """Return color as #rrggbb for the given color values."""
    return '#%02x%02x%02x' % (red, green, blue)
# base data
europeana_colors = np.asarray(
    [
        [240, 248, 255],
        [250, 235, 215],
        [0, 255, 255],
        [127, 255, 212],
        [240, 255, 255],
        [245, 245, 220],
        [255, 228, 196],
        [0, 0, 0],
        [255, 235, 205],
        [0, 0, 255],
        [138, 43, 246],
        [165, 42, 42],
        [222, 184, 135],
        [95, 158, 160],
        [127, 255, 0],
        [210, 105, 30],
        [255, 127, 80],
        [100, 149, 237],
        [255, 248, 220],
        [220, 20, 60]
        # cyan
    ],
    dtype="uint8")
europeana_colors =  color.rgb2lab(europeana_colors)
palette_data = {}

# get url from parent process
nasa_url = str(sys.argv[1])
try:
    # load the image into memory
    nasa_img = io.imread(nasa_url)

    # manipulate the nasa_img object into a numpy array
    nasa_img = np.asarray(nasa_img, dtype="uint8").reshape(-1, 3)
    nasa_img = color.rgb2lab(nasa_img)
    
    # initialize a mini batch k-means object with 6 clusters
    kmeans_instance = cluster.MiniBatchKMeans(
        n_clusters=6,
        init="k-means++",
        batch_size=1024
    )
    # run mini batch k-means & extract results (this becomes raw palette)
    raw_palette = kmeans_instance.fit(nasa_img).cluster_centers_

    # calculate europeana palette
    europeana_palette = raw_palette.copy()
    for i in range(0, len(europeana_palette)):
        min_dist = 100
        closest_color = europeana_palette[i]
        for y in europeana_colors:
            dist = color.deltaE_ciede2000(europeana_palette[i], y)
            if dist < min_dist:
                min_dist = dist
                closest_color = y
        europeana_palette[i] = closest_color

    # transform results into desired format
    for palette, name in zip([raw_palette, europeana_palette], ["raw_palette", "europeana_palette"]):
        palette = color.lab2rgb(palette)
        palette = util.img_as_ubyte(palette)
        palette = [rgb_to_hex(*list(swatch)) for swatch in palette]
        palette_data[name] = palette

    # communicate data to parent process & exit
    print(palette_data)
    sys.exit(0)
except Exception:
    sys.exit(1)
