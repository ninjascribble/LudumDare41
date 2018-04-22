import DisplayObjects from '../DisplayObjects';

export default class StatsManager {
  constructor (game) {
    this.game = game;
    this.panel = DisplayObjects.statPanel(game, 16, 16);
    this.panel.setLabel('Level');
  }

  set level (value) {
    this.panel.setContent(value);
  }

  destroy () {
    this.panel.destroy();
  }
}
