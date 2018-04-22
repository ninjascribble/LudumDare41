import DisplayObjects from '../DisplayObjects';
import GameStateFactory from './index';
import Enums from '../Enums';


export default class Menu extends Phaser.State {
  create () {
    this.stage.backgroundColor = '#5FCDE4';

    DisplayObjects.titleCard(game, game.width / 2, 45);

    game.add.existing(this.actionText());

  }

  actionText () {
    let text = DisplayObjects.bodyFont(game, game.width / 2, game.height / 2, 'center', Enums.START);
    return text;
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      GameStateFactory.story(this.state);
    }
  }
}
