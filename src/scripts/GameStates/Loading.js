import DisplayObjects from '../DisplayObjects';
import Sounds from '../Sounds';
import GameStateFactory from './index';

export default class Loading extends Phaser.State {
  init () {
    // Pixel-perfect canvas scaling!
    // Thanks to http://www.belenalbeza.com/retro-crisp-pixel-art-in-phaser/
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    // Rounds x/y positions to the nearest whole to avoid sub-pixel rendering
    game.renderer.renderSession.roundPixels = true;

    // Sets browser-prefixed "image-rendering" CSS property on the game canvas
    Phaser.Canvas.setImageRenderingCrisp(game.canvas);

    // Prevent these keys from being handled by the browser
    // when the game is in focus
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
  }

  preload () {
    DisplayObjects.load(this);
    Sounds.load(this);
  }

  // create() is automagically triggerd after preload completes
  create () {
    GameStateFactory.gameplay(this.state);
  }
}
