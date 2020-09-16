export const Layers = {
  shadows: 4,
  regions: 5,
  events: 6,
  auto: 7,
  collisions: 8,
  tags: 9,
};

export const Tools = {
  eraser: 'eraser',
  pencil: 'pencil',
  rectangle: 'rectangle',
  fill: 'fill',
  passage: 'passage',
  passage4: 'passage4',
  ladder: 'ladder',
  bush: 'bush',
  counter: 'counter',
  damage: 'damage',
  terrain: 'terrain',
};

export const tilePropTools = [
  Tools.passage,
  Tools.passage4,
  Tools.ladder,
  Tools.bush,
  Tools.counter,
  Tools.damage,
  Tools.terrain,
];

export const TilePassageType = {
  free: 0,
  blocked: 1,
  star: 2,
};