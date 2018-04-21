import DisplayObjects from './index';

export default class Tetronimo extends Phaser.Group {
  constructor (game, x = 0, y = 0, type = 0) {
    super(game);
    this.addChild(DisplayObjects.brick(game, 0, 16, 0));
    this.addChild(DisplayObjects.brick(game, 16, 16, 0));
    this.addChild(DisplayObjects.brick(game, 16, 0, 0));
    this.addChild(DisplayObjects.brick(game, 32, 16, 0));
  }
}
