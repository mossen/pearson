/**
 * Updates image data by changing pixel color.
 *
 * @param   Object  Image data.
 * @param   Number  velocity  A number that makes pixel color goes from red to blue or vise versa.
 * @return  Object  Updated image data.
 */
export const updateImageData = (imageData, velocity) => {
  /* 
    t: red
    t+1: green
    t+2: blue
    t+3: a
    batch it to 4 as RGBa 
  */
  for (var t = 0; t < imageData.data.length; t += 4) {
    const hsl = rgbToHsl(
      imageData.data[t],
      imageData.data[t + 1],
      imageData.data[t + 2]
    );

    if (velocity > 0) {
      const shift = velocity / 100 > 0.6 ? 0.6 : velocity / 100;
      const rgb = hslToRgb(hsl[0] - shift, hsl[1], hsl[2]);
      imageData.data[t] = rgb[0];
      imageData.data[t + 1] =
        imageData.data[t + 1] - (imageData.data[t + 1] * velocity) / 100;
      imageData.data[t + 2] =
        imageData.data[t + 2] - (imageData.data[t + 2] * velocity) / 100;
    } else {
      const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
      imageData.data[t] =
        imageData.data[t] + (imageData.data[t] * velocity) / 100;
      imageData.data[t + 1] =
        imageData.data[t + 1] + (imageData.data[t + 1] * velocity) / 100;
      imageData.data[t + 2] = rgb[2];
    }
  }

  return imageData;
};

/**
 * source: https://gist.github.com/mjackson/5311256
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
export const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    // eslint-disable-next-line default-case
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
};

/**
 * source: https://gist.github.com/mjackson/5311256
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
export const hslToRgb = (h, s, l) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    let hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
};
