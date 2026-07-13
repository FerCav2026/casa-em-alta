"""Gera a capa do artigo "10 Utilidades da Shopee por Menos de R$30".

Isolado de proposito: escreve so em public/images/utilidades-shopee-30/ e faz a
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
DESTINO = RAIZ / "public" / "images" / "utilidades-shopee-30"
DESTINO.mkdir(parents=True, exist_ok=True)

PROMPT = (
    "Photorealistic overhead flat-lay of small inexpensive household items arranged on a warm "
    "light wood table in a real Brazilian home. Items visible: a folded fluffy chenille bath mat, "
    "a stack of colorful microfiber cleaning cloths, a small stainless steel clothes hanger with "
    "many clothespins, folded cotton towels, a small handheld milk frother whisk, "
    "and a couple of grey fabric shoe storage bags. "
    "Everything is small, simple and affordable, nothing luxurious, nothing electronic or expensive. "
    "Soft natural window light from the left, gentle shadows, cozy and inviting, "
    "editorial lifestyle photography, shallow depth of field, muted warm color palette. "
    "ABSOLUTELY NO text, NO letters, NO numbers, NO price tags, NO labels, NO packaging with writing, "
    "NO logos, NO brand names, NO watermarks, NO phone or app screens."
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

print("Gerando capa com gpt-image-1...")
with urllib.request.urlopen(req, timeout=300) as resp:
    dados = json.loads(resp.read())

b64 = dados["data"][0]["b64_json"]
img = Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGB")
print(f"Recebida: {img.size[0]}x{img.size[1]}")

if img.width > 1280:
    nova_altura = round(img.height * 1280 / img.width)
    img = img.resize((1280, nova_altura), Image.LANCZOS)

webp = DESTINO / "capa-utilidades-shopee-30.webp"
jpg = DESTINO / "capa-utilidades-shopee-30.jpg"

img.save(webp, "WEBP", quality=82, method=6)
img.save(jpg, "JPEG", quality=82, optimize=True, progressive=True)

print(f"WebP: {webp}  ({webp.stat().st_size // 1024} KB)")
print(f"JPG : {jpg}  ({jpg.stat().st_size // 1024} KB)")
print(f"Dimensoes finais: {img.size[0]}x{img.size[1]}")
