import DisplayObjects from '../DisplayObjects';
import WorldManager from '../Gameplay/WorldManager';

export default class Gameplay extends Phaser.State {
  create () {
    this.stage.backgroundColor = '#5FCDE4';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 350;

    DisplayObjects.titleCard(game, game.width / 2, 45);

    this.player = DisplayObjects.player(game, game.width / 2, game.height);

    game.add.existing(this.player);

    this.worldManager = new WorldManager(game);
    this.worldManager.start();
  }

  update () {
    if (this.worldManager.falling){
      game.physics.arcade.collide(this.player, this.worldManager.falling.children, this.collisionHandler, null, this);
    }
    this.worldManager.grounded.children.forEach((tetronimo) => {
      game.physics.arcade.collide(this.player, tetronimo.children);
    });

    if (this.player.alive){
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

  collisionHandler(player, block) {
    if(this.player.touching.up && block.touching.down)
      this.player.destroy
  }
}
