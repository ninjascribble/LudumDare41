import DisplayObjects from '../DisplayObjects';

export default class Gameplay extends Phaser.State {
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 100;

    DisplayObjects.titleCard(game, game.width / 2, 45);
  }
}
