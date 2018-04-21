import DisplayObjects from '../DisplayObjects';

export default class WorldManager {
  constructor(game) {
    this.grounded = this.grounded = game.add.group(undefined, 'grounded'),
    this.falling = DisplayObjects.tetronimo(game, 0, 0, 0);
  }

  start () {
    this.next();
  }

  next () {
    if (this.canMoveFalling()) {
      this.falling.addAll('y', 16);
    } else {
      this.grounded.addChild(this.falling);
      this.falling = null;
    }

    if (this.grounded.length < 4) {
      if (!this.falling) {
        this.falling = DisplayObjects.tetronimo(game, 0, 0, 0);
      }
      game.time.events.add(100, () => this.next());
    }
  }

  canMoveFalling () {
    const floor = new Phaser.Line(
      game.world.left,
      game.world.bounds.bottom,
      game.world.right,
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

      return this.grounded.children.every((tetronimo) => {
        return tetronimo.children.every((other) => {
          const otherTop = new Phaser.Line(
            other.body.left,
            other.body.top,
            other.body.right,
            other.body.top
          );
          return !Phaser.Line.intersects(ray, otherTop);
        });
      });
    });
  }
}
