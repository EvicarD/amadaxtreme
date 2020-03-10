from PIL import Image
import os

name = 'AX005.png'
path = os.path.join(os.getcwd(), 'img')
images = os.listdir(os.path.join(os.getcwd(), 'img'))
image = os.path.join(path, name)

image_file = Image.open(image)


def img_compressor(image):
    image = image.convert('RGB')
    image.save(name,
               "JPEG", optimize=True, quality=70)
    image.show()


img_compressor(image_file)
