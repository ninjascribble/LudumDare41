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
    this.width = 0;
    this.height = 0;
    this.buildBricks(type);
    this.x = x;
    this.y = y;
    // this.pivot.x = this.width / 2;
    // this.pivot.y = this.height / 2;
  }

  buildBricks (type) {
    const template = TYPES[type];
    const color = type;

    template.forEach((coords) => {
      const brick = DisplayObjects.brick(game, coords.x, coords.y, color);
      this.addChild(brick);
      this.width = Math.max(this.width, coords.x);
      this.height = Math.max(this.height, coords.y);
    });
  }
}
