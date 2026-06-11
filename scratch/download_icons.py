import urllib.request
import re
import os

# Create temporary scratch directory if it doesn't exist
os.makedirs("scratch", exist_ok=True)

# URL mappings
urls = {
    "item-4": "https://cdn.jsdelivr.net/npm/boxicons@2.1.4/svg/logos/bxl-figma.svg",
    "item-5": "https://cdn.jsdelivr.net/npm/boxicons@2.1.4/svg/logos/bxl-shopify.svg",
    "item-6": "https://cdn.jsdelivr.net/npm/boxicons@2.1.4/svg/logos/bxl-wordpress.svg",
    "item-7": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/webflow.svg",
    "item-8": "https://cdn.jsdelivr.net/npm/boxicons@2.1.4/svg/logos/bxl-adobe.svg",
    "item-9": "https://cdn.jsdelivr.net/npm/boxicons@2.1.4/svg/logos/bxl-react.svg"
}

# Color overrides for the logos (standard brand colors)
colors = {
    "item-4": "#F24E1E", # Figma
    "item-5": "#95BF47", # Shopify
    "item-6": "#21759B", # WordPress (using standard WP blue)
    "item-7": "#4353FF", # Webflow
    "item-8": "#FF0000", # Adobe red
    "item-9": "#61DAFB", # React cyan
}

for name, url in urls.items():
    try:
        print(f"Downloading {name} from {url}...")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            svg_content = response.read().decode('utf-8')
            
        # Extract the path tags
        paths = re.findall(r'<path[^>]*d="([^"]+)"[^>]*>', svg_content)
        if not paths:
            # Try to match other forms of path or content
            paths = re.findall(r'd="([^"]+)"', svg_content)
            
        if not paths:
            print(f"Error: Could not find path for {name}")
            continue
            
        # Determine viewbox to calculate scaling (most are 24x24)
        viewbox_match = re.search(r'viewBox="([^"]+)"', svg_content)
        viewbox = viewbox_match.group(1) if viewbox_match else "0 0 24 24"
        _, _, vw, vh = map(float, viewbox.split())
        
        # We want to center a 60x60 logo inside a 104x104 card
        target_size = 56.0
        scale = target_size / max(vw, vh)
        tx = (104.0 - vw * scale) / 2.0
        ty = (104.0 - vh * scale) / 2.0
        
        # Build new SVG content
        new_paths_str = ""
        color = colors.get(name, "#000000")
        
        for path_d in paths:
            new_paths_str += f'    <path fill="{color}" d="{path_d}"/>\n'
            
        new_svg = f"""<svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Rounded white card background -->
  <rect width="104" height="104" rx="22" fill="#FFFFFF"/>
  
  <!-- Centered Brand Logo -->
  <g transform="translate({tx:.2f}, {ty:.2f}) scale({scale:.4f})">
{new_paths_str}  </g>
</svg>
"""
        # Save to assets/images/item/
        dest_path = f"public/assets/images/item/{name}.svg"
        with open(dest_path, "w", encoding="utf-8") as f:
            f.write(new_svg)
        print(f"Successfully saved {dest_path}")
        
    except Exception as e:
        print(f"Failed to process {name}: {e}")
