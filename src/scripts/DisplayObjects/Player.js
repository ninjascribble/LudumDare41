const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';


export default class Player extends Phaser.Sprite {
  constructor (game, x, y, key){
    super(game, x, y, key);

    game.physics.enable(this);
    this.body.drag.x = 1000;
    this.body.collideWorldBounds = true;
    this.anchor.setTo(.5,.5);
  }

  moveLeft () {
    this.move(LEFT, 'Run');
  }

  moveRight () {
    this.move(RIGHT, 'Run');
  }

  jump () {
    this.move(UP, 'Jump');
  }

  move (facing, animation) {
    if (animation) {
      this.animations.play(animation);
    }

    switch (facing) {
      case LEFT:
        this.scale.x = -1;
        this.body.velocity.x = -160;
        break;
      case RIGHT:
        this.scale.x = 1;
        this.body.velocity.x = 160;
        break;
      case UP:
        this.body.velocity.y = -140;
        break;
    }
  }
}
