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
  }

  get running () {
    return this.timer.running;
  }

  start (level = 0) {
    const exitX = this.rng.between(5, (this.game.width / 16) - 6) * 16;
    const exitY = this.game.height - 32 - (16 * level);
    const tetronimo = this.createTetronimo(game.width / 2);
    const speed = Math.max(200, 400 - (50 * level));

    if (this.running == true) {
      this.stop();
    }

    this.exit = DisplayObjects.exit(this.game, exitX, exitY);
    this.grounded.push(DisplayObjects.brick(this.game, exitX, exitY + 16))
    this.falling = tetronimo;

    this.timer.loop(speed, this.next, this);

    this.unlockHorizontalMovement();
    this.unlockVerticalMovement();
    this.unlockRotation();

    this.currentLevel = level;
    this.timer.start();
  }

  stop () {
    // Stop the timer and clear all pending events
    this.timer.stop(true);

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

  lockVerticalMovement () {
    this.verticalMovementLocked = true;
    this.timer.add(35, () => this.unlockVerticalMovement());
  }

  lockRotation () {
    this.rotationLocked = true;
    this.timer.add(250, () => this.unlockRotation());
  }

  unlockHorizontalMovement () {
    this.horizontalMovementLocked = false;
  }

  unlockVerticalMovement () {
    this.verticalMovementLocked = false;
  }

  unlockRotation () {
    this.rotationLocked = false;
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
    if (this.verticalMovementLocked == false && this.canMoveDown()) {
      this.lockVerticalMovement();
      this.falling.y += 16;
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
    const floor = new Phaser.Line(
      game.world.bounds.left,
      game.world.bounds.bottom,
      game.world.bounds.right,
      game.world.bounds.bottom
    );

    return this.falling.children.every((brick) => {
      const x1 = brick.body.center.x;
      const y1 = brick.body.center.y;
      const x2 = brick.body.center.x;
      const y2 = brick.body.center.y + 16;
      const ray = new Phaser.Line(x1, y1, x2, y2);

      if (Phaser.Line.intersects(ray, floor)) {
        return false;
      }

      return this.grounded.every((other) => {
        const otherTop = new Phaser.Line(
          other.body.left,
          other.body.top,
          other.body.right,
          other.body.top
        );
        return !Phaser.Line.intersects(ray, otherTop);
      });
    });
  }

  canMoveLeft () {
    const wall = new Phaser.Line(
      this.walls[0].body.right,
      this.walls[0].body.top,
      this.walls[0].body.right,
      this.walls[0].body.bottom
    );

    return this.falling.children.every((brick) => {
      const ray1 = new Phaser.Line(
        brick.body.center.x - 16,
        brick.body.top + 1,
        brick.body.center.x,
        brick.body.top + 1,
      );

      const ray2 = new Phaser.Line(
        brick.body.center.x - 16,
        brick.body.bottom - 1,
        brick.body.center.x,
        brick.body.bottom - 1,
      );

      if (Phaser.Line.intersects(ray1, wall) || Phaser.Line.intersects(ray2, wall)) {
        return false;
      }

      return this.grounded.every((other) => {
        const otherSide = new Phaser.Line(
          other.body.right,
          other.body.top,
          other.body.right,
          other.body.bottom
        );

        if (Phaser.Line.intersects(ray1, otherSide) || Phaser.Line.intersects(ray2, otherSide)) {
          return false;
        } else {
          return true;
        }
      });
    });
  }

  canMoveRight () {
    const wall = new Phaser.Line(
      this.walls[1].body.left,
      this.walls[1].body.top,
      this.walls[1].body.left,
      this.walls[1].body.bottom
    );

    return this.falling.children.every((brick) => {
      const ray1 = new Phaser.Line(
        brick.body.center.x,
        brick.body.top + 1,
        brick.body.center.x + 16,
        brick.body.top + 1,
      );

      const ray2 = new Phaser.Line(
        brick.body.center.x,
        brick.body.bottom - 1,
        brick.body.center.x + 16,
        brick.body.bottom - 1,
      );

      if (Phaser.Line.intersects(ray1, wall) || Phaser.Line.intersects(ray2, wall)) {
        return false;
      }

      return this.grounded.every((other) => {
        const otherSide = new Phaser.Line(
          other.body.left,
          other.body.top,
          other.body.left,
          other.body.bottom
        );

        if (Phaser.Line.intersects(ray1, otherSide) || Phaser.Line.intersects(ray2, otherSide)) {
          return false;
        } else {
          return true;
        }
      });
    });
  }
}
