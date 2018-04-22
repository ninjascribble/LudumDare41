export default class KeyboardManager {
  constructor (game) {
    this.keymap = game.input.keyboard.addKeys({
      up: Phaser.KeyCode.UP,
      down: Phaser.KeyCode.DOWN,
      left: Phaser.KeyCode.LEFT,
      right: Phaser.KeyCode.RIGHT,
      shift: Phaser.KeyCode.SHIFT
    });

    game.input.keyboard.addKeyCapture(Phaser.KeyCode.UP);
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.DOWN);
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.LEFT);
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.RIGHT);
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.SHIFT);
  }

  get up () {
    return this.keymap.up;
  }

  get down () {
    return this.keymap.down;
  }

  get left () {
    return this.keymap.left;
  }

  get right () {
    return this.keymap.right;
  }

  get shift () {
    return this.keymap.shift;
  }
}
