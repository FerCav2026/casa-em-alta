from PIL import Image
import os

SRC_DIR = r"C:\Users\ferna\Downloads"
DST_DIR = r"C:\Users\ferna\utilidades-blog\public\images\melhores-frigideiras-2026"
MAX_WIDTH = 1280

files = [
    ("Frigideira Rochedo Stone Pro 24cm Preto com Efeito Pedra e Antiaderente Minerium,.jpg", "rochedo-stone-pro-24cm-frigideira-antiaderente.webp"),
    ("frigideira tramontina.jpg", "tramontina-profissional-24cm-frigideira-antiaderente.webp"),
    ("frigideira antiaderente brinox.jpg", "brinox-ceramic-life-suprema-vanilla-frigideira.webp"),
]

os.makedirs(DST_DIR, exist_ok=True)

for src_name, dst_name in files:
    src_path = os.path.join(SRC_DIR, src_name)
    dst_path = os.path.join(DST_DIR, dst_name)
    img = Image.open(src_path)
    img = img.convert("RGB")
    w, h = img.size
    if w > MAX_WIDTH:
        new_h = int(h * (MAX_WIDTH / w))
        img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
    img.save(dst_path, "WEBP", quality=85)
    print(f"OK: {dst_name} -> {img.size}")
