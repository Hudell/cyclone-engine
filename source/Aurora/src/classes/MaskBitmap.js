export class MaskBitmap extends Bitmap {
  radialgradientFillRect(x, y, startRadius, endRadius, color1, color2, flicker) {
    const context = this._context;

    if (flicker) {
      let gradRnd = Math.floor((Math.random() * 7) + 1);
      let colorRnd = Math.floor((Math.random() * 10) - 5);
      let red = CycloneAurora.hexToRgb(color1).red;
      let green = CycloneAurora.hexToRgb(color1).green;
      let blue = CycloneAurora.hexToRgb(color1).blue;

      green = (green + colorRnd).clamp(0, 255);
      color1 = '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
      endRadius -= gradRnd;
    }

    const grad = context.createRadialGradient(x, y, startRadius, x, y, endRadius);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    context.save();
    context.fillStyle = grad;
    context.fillRect(x - endRadius, y - endRadius, endRadius * 2, endRadius * 2);
    context.restore();
  }

  makeFlashlightEffect(x, y, startRadius, endRadius, color1, color2, direction) {
    const context = this._context;

    context.save();

    const grad = context.createRadialGradient(x, y, startRadius, x, y, endRadius);
    grad.addColorStop(0, '#999999');
    grad.addColorStop(1, color2);

    context.fillStyle = grad;
    context.fillRect(x - endRadius, y - endRadius, endRadius * 2, endRadius * 2);

    for (let cone = 0; cone < 8; cone++) {
      startRadius = cone * 2;
      endRadius = cone * 12;

      switch (direction) {
        case 6:
          x += cone * 6;
          break;
        case 4:
          x -= cone * 6;
          break;
        case 2:
          y += cone * 6;
          break;
        case 8:
          y -= cone * 6;
          break;
        default:
          break;
      }

      const grad = context.createRadialGradient(x, y, startRadius, x, y, endRadius);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);

      context.fillStyle = grad;
      context.fillRect(x - endRadius, y - endRadius, endRadius * 2, endRadius * 2);
    }

    context.restore();
  }
}