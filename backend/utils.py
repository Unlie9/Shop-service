import base64
import os
import uuid
from django.utils.text import slugify



def product_image_file(instance, filename):
    ext = filename.split(".")[-1]
    base_filename = slugify(".".join(filename.split(".")[:-1]))
    unique_filename = f"{base_filename}_{uuid.uuid4().hex}.{ext}"
    return os.path.join("products", unique_filename)
