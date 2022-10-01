import Game from '../core/Game.js';

class Coinflip extends Game {
  /**
   * Returning the 52 chosen coin sides for a given data object.
   * @return {number} The sides.
   */
  result(): string[] {
    const directions = ['blue', 'yellow'];
    return this.provider
      .getFloats(52)
      .map((rowIndex) => directions[Math.floor(rowIndex * 2)]);
  }
}

export default Coinflip;
