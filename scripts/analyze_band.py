from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/screenshots/webdev-preview-root-1786712692401079876-2676.png')
image = Image.open(source).convert('RGB')
rows = []
for y in range(image.height):
    pixels = [image.getpixel((x, y)) for x in range(image.width)]
    avg = tuple(sum(pixel[channel] for pixel in pixels) // len(pixels) for channel in range(3))
    red = sum(1 for r, g, b in pixels if r > 150 and r > g * 1.35 and r > b * 1.25) / len(pixels)
    dark = sum(1 for r, g, b in pixels if r < 55 and g < 55 and b < 55) / len(pixels)
    if red > 0.55 or dark > 0.55:
        rows.append((y, avg, round(red, 3), round(dark, 3)))

runs = []
for row in rows:
    if not runs or row[0] != runs[-1][-1][0] + 1:
        runs.append([row])
    else:
        runs[-1].append(row)

print('dimensions', image.size)
for run in runs:
    if len(run) >= 4:
        print('run', run[0][0], run[-1][0], 'height', len(run), 'start', run[0][1:], 'end', run[-1][1:])

# Export a readable crop around the final Sobre mim / hero transition.
for index, (top, bottom) in enumerate(((5200, 6400), (5600, 6200))):
    crop = image.crop((0, max(0, top), image.width, min(image.height, bottom))).resize((748, (min(image.height, bottom) - max(0, top)) * 4), Image.Resampling.NEAREST)
    crop.save(f'/home/ubuntu/gabriel-portfolio/black-band-crop-{index}.png')
