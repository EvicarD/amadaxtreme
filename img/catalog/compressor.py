from PIL import Image
import os

path = os.path.join(os.getcwd(), 'hitodrol')
images = os.listdir(os.path.join(os.getcwd(), 'hitodrol'))


def img_compressor(name, image):
    new_image = image.resize((500, 250), Image.ANTIALIAS)
    new_image.save(name, "PNG", optimize=True, quality=95)


for i in images:
    image = os.path.join(path, i)
    image_file = Image.open(image)
    img_compressor(i, image_file)
