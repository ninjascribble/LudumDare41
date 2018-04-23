const PLACE_BLOCK = 'place block';
const JUMP = 'jump';
const NEXT_LEVEL = 'next level';
const SPLAT = 'splat';
const GAMEPLAY = 'gameplay';
const GAMEOVER = 'gameover';
const BUMP = 'bump';

export default {
  load: function load (loader) {
    loader.load.audio(PLACE_BLOCK, 'blockStop.wav');
    loader.load.audio(JUMP, 'jump.wav');
    loader.load.audio(NEXT_LEVEL, 'nextLevel.wav');
    loader.load.audio(SPLAT, 'splat.wav');
    loader.load.audio(GAMEPLAY, 'gameplay.wav');
    loader.load.audio(GAMEOVER, 'gameover.wav');
    loader.load.audio(BUMP, 'bump.wav');
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
  },

  gameplay: function gameplay (game) {
    game.sound.play(GAMEPLAY);
  },

  gameover: function gameover (game) {
    game.sound.play(GAMEOVER);
  },

  bump: function bump (game) {
    game.sound.play(BUMP);
  }
}
