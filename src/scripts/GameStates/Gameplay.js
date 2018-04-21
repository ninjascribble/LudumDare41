import DisplayObjects from '../DisplayObjects';

export default class Gameplay extends Phaser.State {
  create () {
    DisplayObjects.titleCard(game, game.width / 2, 45);
  }
}
