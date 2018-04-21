import DisplayObjects from './index';
import Enums from '../Enums';

export default class TitleCard extends Phaser.Group {
  constructor (game, x, y) {
    super(game);

    let title = DisplayObjects.displayFont(
      game, 0, 0, 'center', Enums.GAME_TITLE
    );

    let story = DisplayObjects.bodyFont(
      game, 0, 30, 'center', Enums.STORY
    );

    this.x = x;
    this.y = y;
    this.addChild(title);
    this.addChild(story);

    this.addChild(DisplayObjects.brick(game, -60, 80, 0));
    this.addChild(DisplayObjects.brick(game, -40, 80, 1));
    this.addChild(DisplayObjects.brick(game, -20, 80, 2));
    this.addChild(DisplayObjects.brick(game, 0, 80, 3));
    this.addChild(DisplayObjects.brick(game, 20, 80, 4));
    this.addChild(DisplayObjects.brick(game, 40, 80, 5));
    this.addChild(DisplayObjects.brick(game, 60, 80, 6));
    this.player = DisplayObjects.player(game, 0, 0);
    this.addChild(this.player);
  }

  update () {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.player.moveLeft();
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.player.moveRight();
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && (this.player.body.velocity.y == 0)) {
      this.player.jump();
    }

  }
}
