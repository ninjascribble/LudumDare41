import BitmapFont from './BitmapFont';
import TitleCard from './TitleCard';
import Player from './Player'
const DISPLAY_FONT = 'Blocktopia_32pt';
const BODY_FONT = 'Blocktopia_12pt';
const BRICKS = 'bricks';
const PLAYER = 'player';

export default {
  load: function load (loader) {
    loader.load.bitmapFont(DISPLAY_FONT, 'Blocktopia_32pt.png', 'Blocktopia_32pt.fnt');
    loader.load.bitmapFont(BODY_FONT, 'Blocktopia_12pt.png', 'Blocktopia_12pt.fnt');
    game.load.spritesheet(BRICKS, 'bricks.png', 16, 16, 7);
    game.load.spritesheet(PLAYER, 'player.png')
  },

  displayFont: function displayFont (game, x = 0, y = 0, align = 'left', text = '') {
    return new BitmapFont(game, x, y, DISPLAY_FONT, text, 30, align);
  },

  bodyFont: function bodyFont (game, x = 0, y = 0, align = 'left', text = '') {
    return new BitmapFont(game, x, y, BODY_FONT, text, 12, align);
  },

  titleCard: function titleCard (game, x = 0, y = 0) {
    return new TitleCard(game, x, y);
  },

  brick: function brick (game, x = 0, y = 0, color = 0) {
    const sprite = new Phaser.Sprite(game, x, y, BRICKS, color);
    game.physics.enable(sprite);
    sprite.body.collideWorldBounds = true;
    return sprite;
  },
  player: function player (game, x = 0, y = 0) {
    const sprite = new Player(game, 0, 0, PLAYER);
    return sprite;
  }
};
