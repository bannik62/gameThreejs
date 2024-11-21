
from PIL import Image
import os

# Chemin du dossier contenant les images
image_folder = "./atk"

# Liste des fichiers image dans le dossier, triée par nom (ou un autre critère si nécessaire)
images = sorted([f for f in os.listdir(image_folder) if f.endswith('.png')])

# Charger les images
frames = []
for image_file in images:
    image_path = os.path.join(image_folder, image_file)
    img = Image.open(image_path)
    frames.append(img)

# Créer et sauvegarder le GIF
gif_path = "output.gif"
frames[0].save(gif_path, save_all=True, append_images=frames[1:], loop=0, duration=100)  # duration en millisecondes
print(f"GIF créé et sauvegardé sous {gif_path}")