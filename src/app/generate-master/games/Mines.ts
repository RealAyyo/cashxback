import ArrayUtils from '../core/ArrayUtils.js';
import Game from '../core/Game';

class Mines extends Game {
  /**
   * Returning the 24 chosen mines for a given data object.
   */
  result(): number[] {
    const maxMines = 24;
    const mines = ArrayUtils.generateArrayWithRange(0, maxMines);
    return this.provider
      .getFloats(maxMines)
      .map(
        (float, index) =>
          mines.splice(Math.floor(float * (maxMines - index + 1)), 1)[0],
      );
  }
}

export default Mines;
