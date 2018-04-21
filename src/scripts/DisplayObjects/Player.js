const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';


export default class Player extends Phaser.Sprite {
  constructor (game, x, y, key){
    super(game, x, y, key);

    game.physics.enable(this);
    this.body.drag.x = 1000;

    this.body.collideWorldBounds = true;

  }

  moveLeft () {
    this.move(-16, 0, LEFT, 'walkLeft');
  }

  moveRight () {
    this.move(16, 0, RIGHT, 'walkRight');
  }

  jump () {
    this.move(0, 16, UP, 'jump');
  }

  move (x, y, facing, animation) {
  if (animation) {
    this.animations.play(animation);
  }

  this.facing = facing;

  switch (this.facing) {
    case LEFT:
      this.body.velocity.x = -160;
      break;
    case RIGHT:
      this.body.velocity.x = 160;
      break;
    case UP:
      this.body.velocity.y = -200;
      break;
  }
}

}
