import DisplayObjects from './index';

const TYPES = [
  [{ x: 0, y: 16 }, { x: 16, y: 16 }, { x: 16, y: 0 }, { x: 32, y: 16 }],
  [{ x: 0, y: 0 }, { x: 16, y: 0 }, { x: 0, y: 16 }, { x: 0, y: 32 }],
  [{ x: 0, y: 0 }, { x: 16, y: 0 }, { x: 16, y: 16 }, { x: 16, y: 32 }],
  [{ x: 0, y: 0 }, { x: 0, y: 16 }, { x: 16, y: 0 }, { x: 16, y: 16 }],
  [{ x: 0, y: 0 }, { x: 0, y: 16 }, { x: 16, y: 16 }, { x: 16, y: 32 }],
  [{ x: 0, y: 16 }, { x: 16, y: 16 }, { x: 16, y: 0 }, { x: 32, y: 0 }],
  [{ x: 0, y: 0 }, { x: 0, y: 16 }, { x: 0, y: 32 }, { x: 0, y: 48 }]
];

export default class Tetronimo extends Phaser.Group {
  constructor (game, x = 0, y = 0, type = 0) {
    super(game);
    this.buildBricks(type, x, y);
  }

  buildBricks (type, x = 0, y = 0) {
    const template = TYPES[type];
    const color = type;

    template.forEach((coords) => {
      const brick = DisplayObjects.brick(game, coords.x + x, coords.y + y, color);
      this.addChild(brick);
    });
  }
}
