export const lightenColor = (color: string, amount: number): string => {
  // Simple lightening –  improve this for more robust color manipulation if needed.
  let usePound = false;

  if (color[0] === '#') {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  if (r > 255) r = 255;
  if (r < 0) r = 0;
  let g = ((num >> 8) & 0x00ff) + amount;
  if (g > 255) g = 255;
  if (g < 0) g = 0;
  let b = (num & 0x0000ff) + amount;
  if (b > 255) b = 255;
  if (b < 0) b = 0;
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};
