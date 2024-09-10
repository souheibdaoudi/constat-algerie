import base64

def convert_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        base64_string = base64.b64encode(image_file.read()).decode('utf-8')
    return base64_string

image_path = "C:/Users/souhe/Downloads/E-constat/assets/images/pdf2.jpg"
base64_string = convert_image_to_base64(image_path)
print(f"data:image/png;base64,{base64_string}")
