import DisplayObjects from '../DisplayObjects';
import WorldManager from '../Gameplay/WorldManager';

export default class Gameplay extends Phaser.State {
  create () {
    this.stage.backgroundColor = '#5FCDE4';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 350;

    DisplayObjects.titleCard(game, game.width / 2, 45);

    this.player = DisplayObjects.player(game, game.width / 2, 45);

    game.add.existing(this.player);

    this.worldManager = new WorldManager(game);
    this.worldManager.start();
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
