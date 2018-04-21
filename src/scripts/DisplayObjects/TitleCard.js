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
  }
}
