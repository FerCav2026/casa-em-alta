"""
Converte todas as imagens de public/images para WebP (display) + JPG nas capas (og/social).
- Redimensiona para no maximo MAX_DIM px no maior lado (sem aumentar).
- WebP qualidade 82 para todas.
- Capas (nome comeca com 'capa-' ou 'og-default'): tambem gera .jpg para compartilhamento.
Nao apaga nada (a remocao dos originais e feita em outra etapa, apos verificar o build).
"""
import os
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
ROOT = os.path.abspath(ROOT)
MAX_DIM = 1280
WEBP_Q = 82
JPG_Q = 82

def is_cover(name):
    base = os.path.splitext(name)[0]
    return base.startswith("capa-") or base == "og-default"

def resize(img):
    w, h = img.size
    if max(w, h) <= MAX_DIM:
        return img
    if w >= h:
        nw = MAX_DIM
        nh = round(h * MAX_DIM / w)
    else:
        nh = MAX_DIM
        nw = round(w * MAX_DIM / h)
    return img.resize((nw, nh), Image.LANCZOS)

old_total = 0
new_total = 0
count = 0
covers = 0

for dirpath, _, files in os.walk(ROOT):
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext not in (".png", ".jpg", ".jpeg"):
            continue
        src = os.path.join(dirpath, f)
        old_total += os.path.getsize(src)
        count += 1
        base = os.path.splitext(f)[0]
        try:
            img = Image.open(src)
            img = resize(img)
            # WebP (mantem alpha se houver)
            webp_path = os.path.join(dirpath, base + ".webp")
            img.save(webp_path, "WEBP", quality=WEBP_Q, method=6)
            new_total += os.path.getsize(webp_path)
            # JPG para capas (og/social)
            if is_cover(f):
                covers += 1
                rgb = img.convert("RGB")
                jpg_path = os.path.join(dirpath, base + ".jpg")
                rgb.save(jpg_path, "JPEG", quality=JPG_Q, optimize=True, progressive=True)
        except Exception as e:
            print("ERRO em", src, "->", e)

print("Imagens processadas:", count, "| capas com JPG extra:", covers)
print("Antes (originais): %.1f MB" % (old_total / 1048576))
print("Depois (apenas webp gerados): %.1f MB" % (new_total / 1048576))
