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
    this.animations.add('Idle', [2, 3], 2);
    this.animations.add('Run', [0, 3], 4);
    this.animations.add('JumpUp', [4, 5], 4, false);
    this.animations.add('FallDown', [6], 4, false);
    this.animations.add('Splat', [8, 11], 4, false);
  }

  moveLeft () {
    this.body.velocity.x = -160;
  }

  moveRight () {
    this.body.velocity.x = 160;
  }

  jump () {
    this.body.velocity.y = -140;
  }

  update () {
    // facing
    if (this.body.velocity.x < 0) {
      this.scale.x = -1;
    } else if (this.body.velocity.x > 0) {
      this.scale.x = 1;
    }

    // play animations
    if (this.body.velocity.y < 0) {
      this.animations.play('JumpUp');
    } else if (this.body.velocity.y > 0) {
      this.animations.play('FallDown');
    } else if (this.body.velocity.x < 0) {
      this.animations.play('Run');
    } else if (this.body.velocity.x > 0) {
      this.animations.play('Run');
    } else {
      this.animations.play('Idle');
    }
  }
}
