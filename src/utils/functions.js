function rgbToHex(r, g, b) {
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomSaturatedColor() {
  let rgb = [getRandomInt(255), getRandomInt(255), getRandomInt(255)];

  var max = 0;
  var min = 0;

  if (rgb[0] > rgb[1]) {
    max = rgb[0] > rgb[2] ? 0 : 2;
    min = rgb[1] < rgb[2] ? 1 : 2;
  } else {
    max = rgb[1] > rgb[2] ? 1 : 2;
    var notmax = 1 + (max % 2);
    min = rgb[0] < rgb[notmax] ? 0 : notmax;
  }
  rgb[max] = 255;
  rgb[min] = 0;

  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

export function couleurDominanteImage(id, blockSize) {
  var i = -4,
    r = 0,
    g = 0,
    b = 0,
    fr = 0.0,
    fg = 0.0,
    fb = 0.0,
    count = 0;

  var image = document.getElementById(id);
  var canvas = document.createElement("canvas");

  // on calcule la géometrie pour pouvoir recuperer 1/5 de l'image au centre
  var w = Math.round(image.width / 10);
  var h = Math.round(image.height / 10);
  canvas.width = 2 * w;
  canvas.height = 2 * h;
  var ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    4 * w,
    4 * h,
    2 * w,
    2 * h,
    0,
    0,
    canvas.width,
    canvas.height
  );
  var pix = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  var length = pix.length;

  // boucle pour les sommes. En ajustant blockSize, on peut considerer 1 pixel parmi N
  // si blocksize = 1, tous les pixels sont considéré.
  // un pixel possède un canal alpha qui n'est pas pris en considération.
  while ((i += blockSize * 4) < length) {
    ++count;
    fr += pix[i];
    fg += pix[i + 1];
    fb += pix[i + 2];
  }

  // calcul des moyennes par canal couleur
  fr = fr / count;
  fg = fg / count;
  fb = fb / count;

  // augmente la  saturation
  // si la valeur minimale de r,g,b n'est pas 0, il y présence de "blanc" que l'on retire
  var min = Math.min(fr, fg, fb);
  var max = Math.max(fr, fg, fb);
  var gain = max / (max - min);

  // arrondi inférieur pour ne pas depasser 255
  r = Math.floor((fr - min) * gain);
  g = Math.floor((fg - min) * gain);
  b = Math.floor((fb - min) * gain);

  const color = rgbToHex(r, g, b);

  return color;
}

export function couleurDominanteImage2(canvasid, blockSize) {
  var i = -4,
    r = 0,
    g = 0,
    b = 0,
    fr = 0.0,
    fg = 0.0,
    fb = 0.0,
    count = 0;

  const canvas = document.getElementById(canvasid);
  var ctx = canvas.getContext("2d");

  // on calcule la géometrie pour pouvoir recuperer 1/5 de l'image au centre
  var w = Math.round(canvas.width / 10);
  var h = Math.round(canvas.height / 10);

  var pix = ctx.getImageData(4 * w, 4 * h, 2 * w, 2 * h).data;

  var length = pix.length;

  // boucle pour les sommes. En ajustant blockSize, on peut considerer 1 pixel parmi N
  // si blocksize = 1, tous les pixels sont considéré.
  // un pixel possède un canal alpha qui n'est pas pris en considération.
  while ((i += blockSize * 4) < length) {
    ++count;
    fr += pix[i];
    fg += pix[i + 1];
    fb += pix[i + 2];
  }

  // calcul des moyennes par canal couleur
  fr = fr / count;
  fg = fg / count;
  fb = fb / count;

  // augmente la  saturation
  // si la valeur minimale de r,g,b n'est pas 0, il y présence de "blanc" que l'on retire
  var min = Math.min(fr, fg, fb);
  var max = Math.max(fr, fg, fb);
  var gain = max / (max - min);

  // arrondi inférieur pour ne pas depasser 255
  r = Math.floor((fr - min) * gain);
  g = Math.floor((fg - min) * gain);
  b = Math.floor((fb - min) * gain);

  const color = rgbToHex(r, g, b);

  return color;
}
