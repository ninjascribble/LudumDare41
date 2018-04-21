import BitmapFont from './BitmapFont';
import TitleCard from './TitleCard';

const DISPLAY_FONT = 'Blocktopia_32pt';
const BODY_FONT = 'Blocktopia_12pt';

export default {
  load: function load (loader) {
    loader.load.bitmapFont(DISPLAY_FONT, 'Blocktopia_32pt.png', 'Blocktopia_32pt.fnt');
    loader.load.bitmapFont(BODY_FONT, 'Blocktopia_12pt.png', 'Blocktopia_12pt.fnt');
  },

  displayFont: function displayFont (game, x = 0, y = 0, align = 'left', text = '') {
    return new BitmapFont(game, x, y, DISPLAY_FONT, text, 30, align);
  },

  bodyFont: function bodyFont (game, x = 0, y = 0, align = 'left', text = '') {
    return new BitmapFont(game, x, y, BODY_FONT, text, 12, align);
  },

  titleCard: function titleCard (game, x = 0, y = 0) {
    return new TitleCard(game, x, y);
  }
};
