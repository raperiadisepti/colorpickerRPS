const colorInput = document.getElementById('colorInput');
const hexCode = document.getElementById('hexCode');
const rgbCode = document.getElementById('rgbCode');
const hslCode = document.getElementById('hslCode');

colorInput.addEventListener('input', () => {
  const color = colorInput.value;
  const hex = rgb2hex(hex2rgb(color));
  const rgb = hex2rgb(color);
  const hsl = rgb2hsl(rgb);

  hexCode.textContent = hex;
  rgbCode.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  hslCode.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
});

function hex2rgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgb2hex(rgb) {
  const r = rgb.r.toString(16).padStart(2, '0');
  const g = rgb.g.toString(16).padStart(2, '0');
  const b = rgb.b.toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function rgb2hsl(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (diff > 0) {
    s = (l < 0.5) ? diff / (max + min) : diff / (2 - max - min);

    switch (max) {
      case r:
        h = ((g - b) / diff) % 6;
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }

    h *= 60;
  }

  return { h, s, l };
}