import os
import numpy as np
from PIL import Image

def process():
    src_path = r'd:\safari-desert-site\public\temp_check.jpg'
    output_dir = r'd:\safari-desert-site\public\images'
    os.makedirs(output_dir, exist_ok=True)
    
    src = Image.open(src_path).convert('RGB')
    arr = np.array(src, dtype=float)
    
    # Background color sampled from corners
    bg = np.array([251.0, 245.0, 231.0])
    
    # Distance from background color
    diff = np.sqrt(np.sum((arr - bg) ** 2, axis=2))
    
    # Smooth alpha feathering
    d0 = 8.0   # <= d0 is completely transparent
    d1 = 36.0  # >= d1 is completely opaque
    
    alpha = np.clip((diff - d0) / (d1 - d0), 0.0, 1.0)
    
    # Color decontamination for anti-aliased edge pixels (unblending background color)
    result_rgb = np.zeros_like(arr)
    for c in range(3):
        fg = (arr[:, :, c] - (1.0 - alpha) * bg[c]) / np.maximum(alpha, 0.001)
        result_rgb[:, :, c] = np.clip(fg, 0, 255)
        
    result_rgba = np.dstack([result_rgb.astype(np.uint8), (alpha * 255).astype(np.uint8)])
    trans_img = Image.fromarray(result_rgba, 'RGBA')
    
    # 1. Full logo cropped to content boundaries
    # Content bounds
    mask = alpha > 0.05
    y_idx, x_idx = np.where(mask)
    y_min, y_max = y_idx.min(), y_idx.max()
    x_min, x_max = x_idx.min(), x_idx.max()
    pad = 20
    
    cropped_full = trans_img.crop((
        max(0, x_min - pad),
        max(0, y_min - pad),
        min(1024, x_max + pad),
        min(1024, y_max + pad)
    ))
    cropped_full.save(os.path.join(output_dir, 'logo-transparent.png'))
    cropped_full.save(r'd:\safari-desert-site\public\logo.png')
    
    # 2. Emblem only (the upper circular sun, car, dunes, palms, golden arc)
    # The text "SAFARI" starts at y ~ 530
    emblem_mask = np.zeros_like(mask)
    emblem_mask[:522, :] = mask[:522, :]
    ey_idx, ex_idx = np.where(emblem_mask)
    ey_min, ey_max = ey_idx.min(), ey_idx.max()
    ex_min, ex_max = ex_idx.min(), ex_idx.max()
    
    # Calculate square crop for emblem with nice balanced margin
    emblem_width = ex_max - ex_min
    emblem_height = ey_max - ey_min
    center_x = (ex_min + ex_max) // 2
    center_y = (ey_min + ey_max) // 2
    side = max(emblem_width, emblem_height) + 30
    
    crop_x1 = max(0, center_x - side // 2)
    crop_y1 = max(0, center_y - side // 2)
    crop_x2 = min(1024, crop_x1 + side)
    crop_y2 = min(1024, crop_y1 + side)
    
    cropped_emblem = trans_img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
    cropped_emblem.save(os.path.join(output_dir, 'logo-emblem.png'))
    
    # 3. Create crisp icons for favicon / metadata
    icon_192 = cropped_emblem.resize((192, 192), Image.Resampling.LANCZOS)
    icon_192.save(r'd:\safari-desert-site\public\icon.png')
    icon_192.save(r'd:\safari-desert-site\public\apple-icon.png')
    
    icon_32 = cropped_emblem.resize((32, 32), Image.Resampling.LANCZOS)
    icon_32.save(r'd:\safari-desert-site\public\favicon.ico')
    
    # 4. Create dark-background version of full logo:
    # "SAFARI" letters are dark brown (R<80, G<60, B<50). On dark bg they need to be bright champagne gold.
    dark_bg_arr = np.array(cropped_full, dtype=float)
    # Detect dark text pixels (low luminance and high alpha)
    lum = 0.299 * dark_bg_arr[:, :, 0] + 0.587 * dark_bg_arr[:, :, 1] + 0.114 * dark_bg_arr[:, :, 2]
    text_mask = (lum < 90) & (dark_bg_arr[:, :, 3] > 100)
    
    # Transform dark text to champagne gold #F3E5C8 (243, 229, 200)
    gold_target = np.array([245.0, 235.0, 215.0])
    for c in range(3):
        dark_bg_arr[:, :, c] = np.where(text_mask, gold_target[c], dark_bg_arr[:, :, c])
    
    dark_bg_logo = Image.fromarray(dark_bg_arr.astype(np.uint8), 'RGBA')
    dark_bg_logo.save(os.path.join(output_dir, 'logo-light-text.png'))
    
    # Also save original as logo-original.jpg in public/images
    src.save(os.path.join(output_dir, 'logo-original.jpg'), quality=95)
    
    print("SUCCESS: All logo variants generated successfully!")

if __name__ == '__main__':
    process()
