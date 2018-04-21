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
