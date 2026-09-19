import os
import numpy as np
from PIL import Image

def generate_perfect_assets():
    src_path = r'd:\safari-desert-site\public\temp_check.jpg'
    output_dir = r'd:\safari-desert-site\public\images'
    os.makedirs(output_dir, exist_ok=True)
    
    src = Image.open(src_path).convert('RGB')
    arr = np.array(src, dtype=float)
    
    # Background color sampled from corners
    bg = np.array([251.0, 245.0, 231.0])
    diff = np.sqrt(np.sum((arr - bg) ** 2, axis=2))
    
    # Smooth alpha feathering
    d0 = 8.0
    d1 = 36.0
    alpha = np.clip((diff - d0) / (d1 - d0), 0.0, 1.0)
    
    # Decontaminate background color
    result_rgb = np.zeros_like(arr)
    for c in range(3):
        fg = (arr[:, :, c] - (1.0 - alpha) * bg[c]) / np.maximum(alpha, 0.001)
        result_rgb[:, :, c] = np.clip(fg, 0, 255)
        
    result_rgba = np.dstack([result_rgb.astype(np.uint8), (alpha * 255).astype(np.uint8)])
    trans_img = Image.fromarray(result_rgba, 'RGBA')
    
    # 1. Full Logo (Transparent)
    mask = alpha > 0.03
    fy, fx = np.where(mask)
    pad = 18
    crop_full = trans_img.crop((
        max(0, fx.min() - pad),
        max(0, fy.min() - pad),
        min(1024, fx.max() + pad),
        min(1024, fy.max() + pad)
    ))
    crop_full.save(os.path.join(output_dir, 'logo-transparent.png'))
    crop_full.save(r'd:\safari-desert-site\public\logo.png')
    print("Full logo saved.")
    
    # 2. Standalone Emblem:
    # Emblem features:
    # Y is between 190 and 508.
    # Exclude any top-of-'S' serif pixels which occur at Y >= 504 and X <= 260
    emblem_alpha = alpha.copy()
    emblem_alpha[509:, :] = 0.0
    # Clear out any 'S' top serif:
    emblem_alpha[500:, :265] = 0.0
    
    ey_idx, ex_idx = np.where(emblem_alpha > 0.05)
    ey_min, ey_max = int(ey_idx.min()), int(ey_idx.max())
    ex_min, ex_max = int(ex_idx.min()), int(ex_idx.max())
    
    # Create square emblem with clean padding
    pad_e = 16
    c_ymin = max(0, ey_min - pad_e)
    c_ymax = min(1024, ey_max + pad_e)
    c_xmin = max(0, ex_min - pad_e)
    c_xmax = min(1024, ex_max + pad_e)
    
    # Zero out non-emblem in trans_img for emblem crop
    clean_emblem_rgba = result_rgba.copy()
    clean_emblem_rgba[509:, :, 3] = 0
    clean_emblem_rgba[500:, :265, 3] = 0
    clean_emblem_img = Image.fromarray(clean_emblem_rgba, 'RGBA')
    
    cropped_emblem = clean_emblem_img.crop((c_xmin, c_ymin, c_xmax, c_ymax))
    ew, eh = cropped_emblem.size
    sq_size = max(ew, eh) + 12
    sq_emblem = Image.new('RGBA', (sq_size, sq_size), (0, 0, 0, 0))
    sq_emblem.paste(cropped_emblem, ((sq_size - ew) // 2, (sq_size - eh) // 2))
    
    sq_emblem.save(os.path.join(output_dir, 'logo-emblem.png'))
    print("Clean emblem saved.")
    
    # 3. Favicon and app icons
    sq_emblem.resize((192, 192), Image.Resampling.LANCZOS).save(r'd:\safari-desert-site\public\icon.png')
    sq_emblem.resize((192, 192), Image.Resampling.LANCZOS).save(r'd:\safari-desert-site\public\apple-icon.png')
    sq_emblem.resize((32, 32), Image.Resampling.LANCZOS).save(r'd:\safari-desert-site\public\favicon.ico')
    
    # 4. Premium Dark Navbar / Dark Background full horizontal & stacked logos:
    # On dark backgrounds, the dark brown "SAFARI" text (and tagline) can be rendered in luminous gold/champagne:
    dark_mode_rgba = result_rgba.copy()
    # The text starts at Y >= 500
    y_coords, x_coords = np.mgrid[0:1024, 0:1024]
    text_pixels = (y_coords >= 500)
    
    lum = 0.299 * dark_mode_rgba[:, :, 0] + 0.587 * dark_mode_rgba[:, :, 1] + 0.114 * dark_mode_rgba[:, :, 2]
    # Dark text has lum < 95 and alpha > 50
    dark_text_mask = text_pixels & (lum < 95) & (dark_mode_rgba[:, :, 3] > 50)
    
    # Champagne / Warm Platinum Gold (#F5E8CE)
    gold_champagne = [245, 232, 206]
    for c in range(3):
        dark_mode_rgba[dark_text_mask, c] = gold_champagne[c]
        
    full_dark_img = Image.fromarray(dark_mode_rgba, 'RGBA')
    crop_dark = full_dark_img.crop((
        max(0, fx.min() - pad),
        max(0, fy.min() - pad),
        min(1024, fx.max() + pad),
        min(1024, fy.max() + pad)
    ))
    crop_dark.save(os.path.join(output_dir, 'logo-dark-mode.png'))
    print("Dark mode logo saved.")

    # 5. Circular Badge with warm luxury border (for navbar brand icon & footer)
    badge_size = 256
    badge = Image.new('RGBA', (badge_size, badge_size), (0, 0, 0, 0))
    from PIL import ImageDraw
    draw = ImageDraw.Draw(badge)
    # Circle with gold rim
    draw.ellipse([3, 3, badge_size - 4, badge_size - 4], fill=(23, 18, 13, 240), outline=(200, 155, 60, 220), width=3)
    inner_emblem = sq_emblem.resize((badge_size - 32, badge_size - 32), Image.Resampling.LANCZOS)
    badge.paste(inner_emblem, (16, 16), inner_emblem)
    badge.save(os.path.join(output_dir, 'logo-badge.png'))
    print("Badge saved.")

if __name__ == '__main__':
    generate_perfect_assets()
