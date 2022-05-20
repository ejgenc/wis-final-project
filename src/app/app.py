import sys
import json
from urllib.request import urlopen

import numpy as np
from skimage import color, util, io, transform
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
        [138, 43, 226],
        [165, 42, 42],
        [222, 184, 135],
        [95, 158, 160],
        [127, 255, 0],
        [210, 105, 30],
        [255, 127, 80],
        [100, 149, 237],
        [255, 248, 220],
        [220, 20, 60],
        [0, 255, 255],
        [0, 0, 139],
        [0, 139, 139],
        [184, 134, 11],
        [169, 169, 169],
        [0, 100, 0],
        [169, 169, 169],
        [189, 183, 107],
        [139, 0, 139],
        [85, 107, 47],
        [255, 140, 0],
        [153, 50, 204],
        [139, 0, 0],
        [233, 150, 122],
        [143, 188, 143],
        [72, 61, 139],
        [47, 79, 79],
        [47, 79, 79],
        [0, 206, 209],
        [148, 0, 211],
        [255, 20, 147],
        [0, 191, 255],
        [105, 105, 105],
        [105, 105, 105],
        [30, 144, 255],
        [178, 34, 34],
        [255, 250, 240],
        [34, 139, 34],
        [255, 0, 255],
        [220, 220, 220],
        [248, 248, 255],
        [255, 215, 0],
        [218, 165, 32],
        [128, 128, 128],
        [0, 128, 0],
        [173, 255, 47],
        [128, 128, 128],
        [240, 255, 240],
        [255, 105, 180],
        [205, 92, 92],
        [75, 0, 130],
        [255, 255, 240],
        [240, 230, 140],
        [230, 230, 250],
        [255, 240, 245],
        [124, 252, 0],
        [255, 250, 205],
        [173, 216, 230],
        [240, 128, 128],
        [224, 255, 255],
        [250, 250, 210],
        [211, 211, 211],
        [144, 238, 144],
        [211, 211, 211],
        [255, 182, 193],
        [255, 160, 122],
        [32, 178, 170],
        [135, 206, 250],
        [119, 136, 153],
        [119, 136, 153],
        [176, 196, 222],
        [255, 255, 224],
        [0, 255, 0],
        [50, 205, 50],
        [250, 240, 230],
        [255, 0, 255],
        [128, 0, 0],
        [102, 205, 170],
        [0, 0, 205],
        [186, 85, 211],
        [147, 112, 219],
        [60, 179, 113],
        [123, 104, 238],
        [0, 250, 154],
        [72, 209, 204],
        [199, 21, 133],
        [25, 25, 112],
        [245, 255, 250],
        [255, 228, 225],
        [255, 228, 181],
        [255, 222, 173],
        [0, 0, 128],
        [253, 245, 230],
        [128, 128, 0],
        [107, 142, 35],
        [255, 165, 0],
        [255, 69, 0],
        [218, 112, 214],
        [238, 232, 170],
        [152, 251, 152],
        [175, 238, 238],
        [219, 112, 147],
        [255, 239, 213],
        [255, 218, 185],
        [205, 133, 63],
        [255, 192, 203],
        [221, 160, 221],
        [176, 224, 230],
        [128, 0, 128],
        [255, 0, 0],
        [188, 143, 143],
        [65, 105, 225],
        [139, 69, 19],
        [250, 128, 114],
        [244, 164, 96],
        [46, 139, 87],
        [255, 245, 238],
        [160, 82, 45],
        [192, 192, 192],
        [135, 206, 235],
        [106, 90, 205],
        [112, 128, 144],
        [112, 128, 144],
        [255, 250, 250],
        [0, 255, 127],
        [70, 130, 180],
        [210, 180, 140],
        [0, 128, 128],
        [216, 191, 216],
        [255, 99, 71],
        [64, 224, 208],
        [238, 130, 238],
        [245, 222, 179],
        [255, 255, 255],
        [245, 245, 245],
        [255, 255, 0],
        [154, 205, 50]
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
    print(str(palette_data))
    sys.exit(0)
except Exception:
    sys.exit(1)
