import Game from '../core/Game';

class Dice extends Game {
  /**
   * Returning the roll number for a given data object.
   */
  result(): number {
    return Number(
      (Math.floor(this.provider.getFloat() * 10001) / 100).toFixed(2),
    );
  }
}

export default Dice;
