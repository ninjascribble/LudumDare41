import DisplayObjects from '../DisplayObjects';

export default class StatsManager {
  constructor (game) {
    this.game = game;
    this.panel = DisplayObjects.panel(game, 16, 16);
    this.label = DisplayObjects.bodyFont(game, 24, 12, 'center', 'Level');
    this.content = DisplayObjects.displayFont(game, 24, 34, 'center', '00');
    this.panel.addChild(this.label);
    this.panel.addChild(this.content);
  }

  set text (value) {
    this.content.text = value;
  }

  destroy () {
    this.panel.destroy();
    this.label.destroy();
    this.content.destroy();
  }
}
