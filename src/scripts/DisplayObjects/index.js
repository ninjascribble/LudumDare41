import BitmapFont from './BitmapFont';
import TitleCard from './TitleCard';
import Player from './Player'
import Tetronimo from './Tetronimo';

const DISPLAY_FONT = 'Blocktopia_32pt';
const BODY_FONT = 'Blocktopia_12pt';
const BRICKS = 'bricks';
const PLAYER = 'player';
const EXIT = 'exit';
const PANEL = 'panel';

export default {
  load: function load (loader) {
    loader.load.bitmapFont(DISPLAY_FONT, 'Blocktopia_32pt.png', 'Blocktopia_32pt.fnt');
    loader.load.bitmapFont(BODY_FONT, 'Blocktopia_12pt.png', 'Blocktopia_12pt.fnt');
    loader.load.spritesheet(BRICKS, 'bricks.png', 16, 16, 8);
    loader.load.atlasJSONArray(PLAYER, 'blobby.png', 'blobby.json');
    loader.load.spritesheet(EXIT, 'exit.png', 16, 16, 8);
    loader.load.spritesheet(PANEL, 'panel.png', 48, 48, 1);
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

  brick: function brick (game, x = 0, y = 0, color = 7) {
    const sprite = game.add.sprite(x, y, BRICKS, color);
    game.physics.arcade.enable(sprite);
    sprite.body.enable = true;
    sprite.body.moves = false;
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
    sprite.body.collideWorldBounds = false;
    return sprite;
  },

  wall: function wall (game, x = 0, y = 0, w = 80, h = 288) {
    const sprite = game.add.tileSprite(x, y, w, h, BRICKS, 7);
    game.physics.arcade.enable(sprite);
    sprite.body.enable = true;
    sprite.body.moves = false;
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
    sprite.body.collideWorldBounds = false;
    return sprite;
  },

  tetronimo: function tetronimo (game, x = 0, y = 0, type = 0) {
    return new Tetronimo(game, x, y, type);
  },

  player: function player (game, x = 0, y = 0) {
    const sprite = new Player(game, x, y, PLAYER);
    return sprite;
  },

  exit: function exit (game, x = 0, y = 0) {
    const sprite = game.add.sprite(x, y, EXIT);
    game.physics.arcade.enable(sprite);
    sprite.body.enable = true;
    sprite.body.immobile = true;
    sprite.body.allowGravity = false;
    sprite.body.collideWorldBounds = false;
    sprite.animations.add('shine');
    sprite.animations.play('shine', 30, true);
    return sprite;
  },

  panel: function panel (game, x = 0, y = 0) {
    return game.add.image(x, y, PANEL);
  },

  statPanel: function statPanel (game, x = 0, y = 0) {
    const panel = this.panel(game, 16, 16);
    const label = this.bodyFont(game, 24, 12, 'center');
    const content = this.displayFont(game, 24, 34, 'center');

    panel.addChild(label);
    panel.addChild(content);

    panel.setLabel = (value) => {
      label.text = value;
    };

    panel.setContent = (value) => {
      content.text = value;
    };

    return panel;
  }
};
