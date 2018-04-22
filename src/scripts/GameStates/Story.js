import DisplayObjects from '../DisplayObjects';
import GameStateFactory from './index';
import Enums from '../Enums';


export default class Story extends Phaser.State {
  create () {
    this.stage.backgroundColor = '#5FCDE4';

    DisplayObjects.titleCard(game, game.width / 2, 45);


    game.add.existing(this.instructionText());
    game.add.existing(this.actionText());

  }


  instructionText () {
    let text = DisplayObjects.bodyFont(game, game.width / 2, game.height / 2, 'center', Enums.INSTRUCTIONS);
    return text;
  }

  actionText () {
    let text = DisplayObjects.bodyFont(game, game.width / 2, game.height * 3 / 4, 'center', Enums.START);
    return text;
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      GameStateFactory.gameplay(this.state);
    }
  }
}
