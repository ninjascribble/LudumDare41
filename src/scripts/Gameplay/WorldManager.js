import DisplayObjects from '../DisplayObjects';

export default class WorldManager {
  constructor(game) {
    this.tetronimos = [];
    this.grounded = [];
    this.falling = this.createTetronimo(64, 0);
  }

  start () {
    this.next();
    this.unlockHorizontalMovement();
    this.unlockVerticalMovement();
    this.unlockRotation();
  }

  createTetronimo (x = 0, y = 0) {
    const type = Math.floor(Math.random() * 7);
    const tetronimo = DisplayObjects.tetronimo(game, x, y, type);
    this.tetronimos.push(tetronimo);
    return tetronimo;
  }

  lockHorizontalMovement () {
    this.horizontalMovementLocked = true;
    game.time.events.add(100, () => this.unlockHorizontalMovement());
  }

  unlockHorizontalMovement () {
    this.horizontalMovementLocked = false;
  }

  moveTetronimosRight () {
    if (this.canMoveRight()) {
      this.lockHorizontalMovement();
      this.falling.x += 16;
    }
  }

  moveTetronimosLeft () {
    if (this.canMoveLeft()) {
      this.lockHorizontalMovement();
      this.falling.x -= 16;
    }
  }

  lockVerticalMovement () {
    this.verticalMovementLocked = true;
    game.time.events.add(35, () => this.unlockVerticalMovement());
  }

  unlockVerticalMovement () {
    this.verticalMovementLocked = false;
  }

  moveTetronimosDown () {
    if (this.verticalMovementLocked == false && this.canMoveDown()) {
      this.lockVerticalMovement();
      this.falling.y += 16;
    }
  }

  lockRotation () {
    this.rotationLocked = true;
    game.time.events.add(250, () => this.unlockRotation());
  }

  unlockRotation () {
    this.rotationLocked = false;
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
      this.falling = this.createTetronimo();
    }

    game.time.events.add(400, () => this.next());
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
    if (this.horizontalMovementLocked) {
      return false;
    }

    const wall = new Phaser.Line(
      game.world.bounds.left,
      game.world.bounds.top,
      game.world.bounds.left,
      game.world.bounds.bottom
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
    if (this.horizontalMovementLocked) {
      return false;
    }

    const wall = new Phaser.Line(
      game.world.bounds.right,
      game.world.bounds.top,
      game.world.bounds.right,
      game.world.bounds.bottom
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
