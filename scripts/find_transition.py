from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/screenshots/webdev-preview-root-1786699766451971367-8543.png')
image = Image.open(source).convert('RGB')
rows = []
for y in range(image.height):
    pixels = [image.getpixel((x, y)) for x in range(image.width)]
    avg = tuple(sum(pixel[c] for pixel in pixels) // len(pixels) for c in range(3))
    beige = sum(1 for r, g, b in pixels if r > 150 and g > 130 and b > 115 and r - b < 80) / len(pixels)
    red = sum(1 for r, g, b in pixels if r > 140 and r > g * 1.35 and r > b * 1.25) / len(pixels)
    dark = sum(1 for r, g, b in pixels if r < 55 and g < 55 and b < 55) / len(pixels)
    rows.append((y, avg, beige, red, dark))

# Print contiguous runs where most of the row is a dominant surface color.
def runs_for(predicate):
    runs = []
    for row in rows:
        if predicate(row):
            if not runs or row[0] != runs[-1][-1][0] + 1:
                runs.append([row])
            else:
                runs[-1].append(row)
    return [run for run in runs if len(run) >= 4]

print('dimensions', image.size)
for name, predicate in (
    ('beige', lambda row: row[2] >= .65),
    ('red', lambda row: row[3] >= .65),
    ('dark', lambda row: row[4] >= .65),
):
    print(name, [(run[0][0], run[-1][0], len(run), run[0][1], run[-1][1]) for run in runs_for(predicate)])

# Save a readable crop around the last beige-to-red transition.
red_runs = runs_for(lambda row: row[3] >= .65)
if red_runs:
    first_red = next((run for run in red_runs if run[0][0] > 3000), red_runs[-1])
    top = max(0, first_red[0][0] - 180)
    bottom = min(image.height, first_red[-1][0] + 260)
    crop = image.crop((0, top, image.width, bottom)).resize((776, (bottom - top) * 4), Image.Resampling.NEAREST)
    crop.save('/home/ubuntu/gabriel-portfolio/structural-transition-crop.png')
    print('crop', top, bottom)

# Fixed crop around the end of the about section and the statement hero.
about_crop = image.crop((0, 5400, image.width, 7000)).resize((776, 6400), Image.Resampling.NEAREST)
about_crop.save('/home/ubuntu/gabriel-portfolio/about-statement-crop.png')
