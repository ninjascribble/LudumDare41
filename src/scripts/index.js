import GameStates from './GameStates';

// 2x Gameboy resolution
const width = 320;
const height = 288;
const renderer = Phaser.AUTO;
const parent = 'content';
const defaultState = null;
const transparent = false;
const antialias = false;
const physicsConfig = null;
const game = new Phaser.Game(
  width,
  height,
  renderer,
  parent,
  defaultState,
  transparent,
  antialias,
  physicsConfig
);

GameStates.loading(game.state);

global.game = game;
