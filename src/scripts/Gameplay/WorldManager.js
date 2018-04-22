import DisplayObjects from '../DisplayObjects';

export default class WorldManager {
  constructor(game) {
    this.game = game;
    this.rng = game.rnd;
    this.tetronimos = [];
    this.grounded = [];
    this.walls = [
      DisplayObjects.wall(this.game, 0, 0, 80, this.game.height),
      DisplayObjects.wall(this.game, this.game.width - 80, 0, 80, this.game.height)
    ];
    this.exit = null;
    this.falling = null;
    this.timer = game.time.create();
    this.currentLevel = 0;

    window.foo = this.grounded;
  }

  get running () {
    return this.timer.running;
  }

  get speed () {
    return Math.max(175, 414 - (23 * this.currentLevel));
  }

  stopTimer () {
    this.timer.stop(true);
  }

  restartTimer () {
    this.timer.loop(this.speed, this.next, this);
    this.unlockHorizontalMovement();
    this.unlockRotation();
    this.timer.start();
  }

  start (level = 0) {
    const exitX = this.rng.between(5, (this.game.width / 16) - 6) * 16;
    const exitY = this.game.height - 32 - (16 * level);
    const exit = DisplayObjects.exit(this.game, exitX, exitY);
    const exitBrick = DisplayObjects.brick(this.game, exitX, exitY + 16);
    const tetronimo = this.createTetronimo(game.width / 2);

    if (this.running == true) {
      this.stop();
    }

    this.exit = exit;
    this.grounded.push(exitBrick);
    this.falling = tetronimo;
    this.currentLevel = level;

    this.restartTimer();
  }

  stop () {
    // Stop the timer and clear all pending events
    this.stopTimer();

    // Destroy everything on screen
    this.exit.destroy();
    this.tetronimos.forEach((tetronimo) => tetronimo.destroy());
    this.tetronimos.length = 0;
    this.grounded.forEach((block) => block.destroy());
    this.grounded.length = 0;
    this.falling = null;
  }

  destroy () {
    this.stop();
    this.rng = null;
    this.tetronimos = null;
    this.grounded = null;
    this.exit = null;
    this.falling = null;
    this.walls.forEach((wall) => wall.destroy());
    this.walls.length = 0;
    this.timer.destroy();
  }

  createTetronimo (x = 0, y = -16) {
    const type = this.rng.between(0, 6);
    const tetronimo = DisplayObjects.tetronimo(game, x, y, type);
    this.tetronimos.push(tetronimo);
    return tetronimo;
  }

  lockHorizontalMovement () {
    this.horizontalMovementLocked = true;
    this.timer.add(100, () => this.unlockHorizontalMovement());
  }

  lockRotation () {
    this.rotationLocked = true;
    this.timer.add(250, () => this.unlockRotation());
  }

  unlockHorizontalMovement () {
    this.horizontalMovementLocked = false;
  }

  unlockRotation () {
    this.rotationLocked = false;
  }

  moveTetronimosRight () {
    if (this.horizontalMovementLocked == false && this.canMoveRight()) {
      this.lockHorizontalMovement();
      this.falling.x += 16;
    } else {
      // debugger
    }
  }

  moveTetronimosLeft () {
    if (this.horizontalMovementLocked == false && this.canMoveLeft()) {
      this.lockHorizontalMovement();
      this.falling.x -= 16;
    }
  }

  moveTetronimosDown () {
    if (this.canMoveDown()) {
      this.stopTimer();
      this.falling.y += 16;
      this.restartTimer();
    }
  }

  rotateTetronimo () {
    if (this.rotationLocked == false) {
      this.lockRotation();
      this.falling.rotateBricks();
    }
  }

  next () {
    if (this.canMoveDown()) {
      this.falling.y += 16;
    } else {
      this.falling.children.forEach((brick) => {
        brick.moves = false;
        this.grounded.push(brick)
      });
      this.falling = this.createTetronimo(game.width / 2);
    }
  }

  canMoveDown () {
    return this.falling.children.every((brick) => {
      const bottom = brick.body.bottom + 16;
      const left = brick.body.left;

      return (bottom <= this.game.world.bottom) && this.grounded.every((other) => {
        // Since all bricks are the same width, we only need to compare the
        // positions of one horizontal side, and the vertical sides.
        return !((bottom == other.body.bottom) && (left == other.body.left));
      });
    });
  }

  canMoveLeft () {
    return this.falling.children.every((brick) => {
      const top = brick.body.top;
      const left = brick.body.left - 16;

      return (left >= this.walls[0].body.right) && this.grounded.every((other) => {
        return !((top == other.body.top) && (left == other.body.left));
      });
    });
  }

  canMoveRight () {
    return this.falling.children.every((brick) => {
      const top = brick.body.top;
      const right = brick.body.right + 16;

      return (right <= this.walls[1].body.left) && this.grounded.every((other) => {
        return !((top == other.body.top) && (right == other.body.right));
      });
    });
  }
}
