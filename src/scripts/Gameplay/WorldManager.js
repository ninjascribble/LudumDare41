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

    // Store for caching available moves on update
    this.availableMoves = {
      right: false,
      left: false,
      down: false
    }
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
    const tetronimo = this.createTetronimo(this.game.width / 2);

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

  canMoveDown () {
    return this.availableMoves.down;
  }

  canMoveLeft () {
    return this.availableMoves.left;
  }

  canMoveRight () {
    return this.availableMoves.right;
  }

  moveTetronimosRight () {
    if (this.horizontalMovementLocked == false && this.canMoveRight()) {
      this.lockHorizontalMovement();
      this.falling.x += 16;
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

  update () {
    var right = true;
    var left = true;
    var down = true;

    this.falling.children.every((brick) => {
      const r0 = brick.body.right;
      const r1 = r0 + 16;

      const l0 = brick.body.left;
      const l1 = l0 - 16;

      const b0 = brick.body.bottom;
      const b1 = b0 + 16;

      // Test against the walls first...
      if (right == true) {
        right = (r1 <= this.walls[1].body.left);
      }

      if (left == true) {
        left = (l1 >= this.walls[0].body.right);
      }

      if (down == true) {
        down = (b1 <= this.game.world.bottom);
      }

      // ...then every tetronimo
      return this.grounded.every((other) => {

        // Only check movements that are still available
        if (right == true) {
          right = !((r1 == other.body.right) && (b0 == other.body.bottom));
        }

        if (left == true) {
          left = !((l1 == other.body.left) && (b0 == other.body.bottom));
        }

        if (down == true) {
          down = !((b1 == other.body.bottom) && (l0 == other.body.left));
        }

        // Break out of the loop early if there are no moves available
        return (right || left || down);
      });
    });

    this.availableMoves = { right, left, down };
  }
}
