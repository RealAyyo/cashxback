import ArrayUtils from '../core/ArrayUtils';
import Game from '../core/Game';

class Keno extends Game {
  /**
   * Returning the 10 chosen tiles for a given data object.
   * @return {number} The tiles
   */
  result(): number[] {
    const max_squares = 39;
    const squares = ArrayUtils.generateArrayWithRange(0, max_squares);
    return this.provider
      .getFloats(10)
      .map(
        (float, index) =>
          squares.splice(Math.floor(float * (max_squares - index + 1)), 1)[0],
      );
  }
}

export default Keno;
