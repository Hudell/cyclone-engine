export function logImage(canvas, text) {
  const url = canvas.toDataURL();

  const scale = 1;
  const img = new Image();

  function getBox(width, height) {
    return {
      string: '+',
      style: `font-size: 1px; padding: ${ Math.floor(height / 2) }px ${ Math.floor(width / 2) }px; line-height: ${ height }px;`,
    };
  }

  img.onload = function() {
    const dim = getBox(this.width * scale, this.height * scale);
    if (text) {
      console.log(text);
    }
    console.log(`%c${ dim.string }`, `${ dim.style }background: url('${ url }'); background-size: ${ this.width * scale }px ${ this.height * scale }px; color: transparent;`);
  };

  img.src = url;
}