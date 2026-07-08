"""Gera a capa do artigo da calculadora de consumo de energia.

Isolado de proposito: escreve so em public/images/consumo-energia/ e faz a
conversao WebP + JPG ali dentro, sem varrer o resto de public/images/
(ver feedback_casa_em_alta_webp: convert-webp.py recomprime capas antigas).

Chave lida do cofre de variaveis de ambiente. Nunca colar no codigo.
"""
import base64
import io
import os
import pathlib
import urllib.request
import json

from PIL import Image

RAIZ = pathlib.Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "public" / "images" / "consumo-energia"
DESTINO.mkdir(parents=True, exist_ok=True)

PROMPT = (
    "Photorealistic wide shot of a bright modern Brazilian apartment kitchen countertop. "
    "An air fryer, a microwave and a stainless steel electric kettle sit side by side, "
    "plugged into a wall outlet, power cords clearly visible. "
    "Warm natural morning light from a window on the left, soft shadows, shallow depth of field. "
    "Clean white quartz countertop, light wood cabinets, a few real details: a ceramic mug, "
    "a small potted herb. Editorial food-blog photography style, warm and inviting. "
    "ABSOLUTELY NO text, NO letters, NO numbers, NO labels, NO documents, NO papers, "
    "NO screens showing digits, NO logos, NO watermarks."
)

api_key = os.environ["OPENAI_API_KEY"]

payload = json.dumps(
    {
        "model": "gpt-image-1",
        "prompt": PROMPT,
        "size": "1536x1024",
        "quality": "medium",
        "n": 1,
    }
).encode()

req = urllib.request.Request(
    "https://api.openai.com/v1/images/generations",
    data=payload,
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    },
)

print("Gerando imagem com gpt-image-1...")
with urllib.request.urlopen(req, timeout=300) as resp:
    dados = json.loads(resp.read())

b64 = dados["data"][0]["b64_json"]
img = Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGB")
print(f"Recebida: {img.size[0]}x{img.size[1]}")

# Redimensiona para no maximo 1280px no maior lado (regra do blog)
if img.width > 1280:
    nova_altura = round(img.height * 1280 / img.width)
    img = img.resize((1280, nova_altura), Image.LANCZOS)

webp = DESTINO / "capa-consumo-energia.webp"
jpg = DESTINO / "capa-consumo-energia.jpg"

img.save(webp, "WEBP", quality=82, method=6)
img.save(jpg, "JPEG", quality=82, optimize=True, progressive=True)

print(f"WebP: {webp}  ({webp.stat().st_size // 1024} KB)")
print(f"JPG : {jpg}  ({jpg.stat().st_size // 1024} KB)")
print(f"Dimensoes finais: {img.size[0]}x{img.size[1]}")
