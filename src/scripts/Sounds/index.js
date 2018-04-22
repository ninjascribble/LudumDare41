const PLACE_BLOCK = 'place block';
const JUMP = 'jump';
const NEXT_LEVEL = 'next level';
const SPLAT = 'splat';

export default {
  load: function load (loader) {
    loader.load.audio(PLACE_BLOCK, 'blockStop.wav');
    loader.load.audio(JUMP, 'jump.wav');
    loader.load.audio(NEXT_LEVEL, 'nextLevel.wav');
    loader.load.audio(SPLAT, 'splat.wav');
  },

  placeBlock: function placeBlock (game) {
    game.sound.play(PLACE_BLOCK);
  },

  jump: function jump (game) {
    game.sound.play(JUMP);
  },

  nextLevel: function nextLevel (game) {
    game.sound.play(NEXT_LEVEL);
  },

  splat: function splat (game) {
    game.sound.play(SPLAT);
  }
}
