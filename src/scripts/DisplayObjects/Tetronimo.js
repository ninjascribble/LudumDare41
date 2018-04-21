import DisplayObjects from './index';

const _ = null;
const TYPES = [
  [ // T-Shaped
    [[_,2,_],
     [1,0,3],
     [_,_,_]],

    [[_,1,_],
     [_,0,2],
     [_,3,_]],

    [[_,_,_],
     [3,0,1],
     [_,2,_]],

    [[_,3,_],
     [2,0,_],
     [_,1,_]]
  ],

  [ // J-Shaped
    [[_,1,_],
     [_,0,_],
     [3,2,_]],

    [[3,_,_],
     [2,0,1],
     [_,_,_]],

    [[_,2,3],
     [_,0,_],
     [_,1,_]],

    [[_,_,_],
     [1,0,2],
     [_,_,3]]
  ],

  [ // L-Shaped
    [[_,1,_],
     [_,0,_],
     [_,2,3]],

    [[_,_,_],
     [2,0,1],
     [3,_,_]],

    [[3,2,_],
     [_,0,_],
     [_,1,_]],

    [[_,_,3],
     [1,0,2],
     [_,_,_]]
  ],

  [ // O-Shaped
    [[0,1],
     [2,3]],

    [[2,0],
     [3,1]],

    [[3,2],
     [1,0]],

    [[1,3],
     [0,2]]
  ],

  [ // S-Shaped
    [[_,_,_],
     [_,0,1],
     [3,2,_]],

    [[3,_,_],
     [2,0,_],
     [_,1,_]],

    [[_,2,3],
     [1,0,_],
     [_,_,_]],

    [[_,1,_],
     [_,0,2],
     [_,_,3]]
  ],

  [ // Z-Shaped
    [[_,_,_],
     [1,0,_],
     [_,2,3]],

    [[_,1,_],
     [2,0,_],
     [3,_,_]],

    [[3,2,_],
     [_,0,1],
     [_,_,_]],

    [[_,_,3],
     [_,0,2],
     [_,1,_]]
  ],

  [ // I-Shaped
    [[_,0,_,_],
     [_,1,_,_],
     [_,2,_,_],
     [_,3,_,_]],

    [[_,_,_,_],
     [3,2,1,0],
     [_,_,_,_],
     [_,_,_,_]],

    [[_,_,3,_],
     [_,_,2,_],
     [_,_,1,_],
     [_,_,0,_]],

    [[_,_,_,_],
     [_,_,_,_],
     [0,1,2,3],
     [_,_,_,_]],
  ],
];

export default class Tetronimo extends Phaser.Group {
  constructor (game, x = 0, y = 0, type = 0) {
    super(game);
    this.color = type;
    this.template = TYPES[type];
    this.rotationIndex = 0;
    this.buildBricks();
    this.positionBricks();
    this.x = x;
    this.y = y;
  }

  buildBricks (type) {
    this.addChild(DisplayObjects.brick(game, 0, 0, this.color));
    this.addChild(DisplayObjects.brick(game, 0, 0, this.color));
    this.addChild(DisplayObjects.brick(game, 0, 0, this.color));
    this.addChild(DisplayObjects.brick(game, 0, 0, this.color));
  }

  rotateBricks () {
    this.rotationIndex++;
    if (this.rotationIndex >= this.template.length) {
      this.rotationIndex = 0;
    }
    this.positionBricks();
  }

  positionBricks () {
    this.template[this.rotationIndex].forEach((row, i) => {
      row.forEach((col, j) => {
        if (col != _) {
          const child = this.getChildAt(col);
          child.x = j * 16;
          child.y = i * 16;
        }
      });
    });
  }
}
