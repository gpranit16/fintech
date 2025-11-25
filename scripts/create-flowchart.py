from PIL import Image, ImageDraw, ImageFont
import os

# Create a simple flowchart placeholder
width, height = 1200, 600
image = Image.new('RGB', (width, height), color='#000000')
draw = ImageDraw.Draw(image)

# Add text
try:
    # Try to use a system font
    font_large = ImageFont.truetype("arial.ttf", 48)
    font_medium = ImageFont.truetype("arial.ttf", 24)
    font_small = ImageFont.truetype("arial.ttf", 18)
except:
    # Fallback to default font
    font_large = ImageFont.load_default()
    font_medium = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Title
draw.text((600, 50), "FINTECH FLOW CHART", fill='#EF4444', font=font_large, anchor="mm")

# Add boxes
boxes = [
    (150, 150, 350, 270, "1. Smart Application\nIntake"),
    (150, 330, 350, 480, "2. KYC + Fraud Check\nAgent"),
    (650, 150, 850, 270, "3. Document\nExtraction"),
    (650, 330, 850, 480, "4. Risk Scoring\nEngine"),
    (400, 520, 600, 580, "5. Automated Decision"),
]

for x1, y1, x2, y2, text in boxes:
    draw.rectangle([x1, y1, x2, y2], outline='#8B5CF6', width=3)
    # Calculate text position
    text_x = (x1 + x2) // 2
    text_y = (y1 + y2) // 2
    draw.text((text_x, text_y), text, fill='#FFFFFF', font=font_medium, anchor="mm")

# Save
output_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'flowchart.png')
image.save(output_path)
print(f"Flowchart created at: {output_path}")
