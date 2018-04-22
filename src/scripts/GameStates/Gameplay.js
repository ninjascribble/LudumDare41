import GameStateFactory from './index';
import DisplayObjects from '../DisplayObjects';
import KeyboardManager from '../Gameplay/KeyboardManager';
import WorldManager from '../Gameplay/WorldManager';
import StatsManager from '../Gameplay/StatsManager';

export default class Gameplay extends Phaser.State {
  create () {
    this.stage.backgroundColor = '#5FCDE4';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 350;

    this.keyboardManager = new KeyboardManager(game);
    this.worldManager = new WorldManager(game);
    this.statsManager = new StatsManager(game);
    this.player = DisplayObjects.player(game, game.width / 2, game.height);

    game.add.existing(this.player);

    // We don't want the player to jump more than once per keypress,
    // so here's a listener for the "onDown" signal instead
    this.keyboardManager.up.onDown.add(() => {
      if (this.keyboardManager.shift.isUp && this.player.alive && this.player.body.velocity.y == 0) {
        this.player.jump();
      }
    });

    this.nextLevel();
  }

  nextLevel () {
    const level = this.worldManager.currentLevel + 1;
    this.worldManager.stop();
    this.worldManager.start(level);
    this.statsManager.level = this.getReadableLevel();

    if (this.instructions && this.instructions.alive) {
      this.instructions.destroy();
      this.instructions = null;
    }

    switch(level) {
      case 0:
        this.instructions = DisplayObjects.instructions1(game, game.width / 2, 96);
        this.instructions.sendToBack();
        break;
      case 1:
        this.instructions = DisplayObjects.instructions2(game, game.width / 2, 96);
        this.instructions.sendToBack();
        break;
      case 2:
        this.instructions = DisplayObjects.instructions3(game, game.width / 2, 96);
        this.instructions.sendToBack();
        break;
      default:
        break;
    }
  }

  getReadableLevel () {
    const level = this.worldManager.currentLevel + 1;
    return (level < 10) ? '0' + level : level;
  }

  destroy () {
    this.worldManager.destroy();
    this.keyboardManager.destroy();
    this.statsManager.destroy();
    this.instructions && this.instructions.destroy();
  }

  update () {
    this.worldManager.update();

    if (this.worldManager.running) {
      game.physics.arcade.collide(this.player, this.worldManager.walls);
      game.physics.arcade.collide(this.player, this.worldManager.grounded);
      game.physics.arcade.collide(this.player, this.worldManager.exit, (player, exit) => {
        console.log('Player wins! Next level!');
        this.nextLevel();
      })

      if (this.worldManager.grounded.length  > 180) {
        console.log('Player dies! Resetting game');
        this.player.destroy();
        GameStateFactory.gameOver(this.state);
      } else {
        game.physics.arcade.collide(this.player, this.worldManager.falling.children, (player, block) => {
          if(player.body.velocity.y == 0 && player.body.touching.up && block.body.touching.down) {
            console.log('Player dies! Resetting game');
            player.destroy();
            GameStateFactory.gameOver(this.state);
          }
        });
      }
    }


    // Player controls
    if (this.keyboardManager.shift.isUp) {
      if (this.player.alive && this.keyboardManager.left.isDown) {
        this.player.moveLeft();
      }

      if (this.player.alive && this.keyboardManager.right.isDown) {
        this.player.moveRight();
      }
    }

    // Tetronimo controls
    if (this.worldManager.running && this.keyboardManager.shift.isDown) {
      if (this.keyboardManager.up.isDown) {
        this.worldManager.rotateTetronimo();
      }

      if (this.keyboardManager.left.isDown) {
        this.worldManager.moveTetronimosLeft();
      }

      if (this.keyboardManager.right.isDown) {
        this.worldManager.moveTetronimosRight();
      }

      if (this.keyboardManager.down.isDown) {
        this.worldManager.moveTetronimosDown();
      }
    }
  }
}
