import Game from '../core/Game';

class Roulette extends Game {
  /**
   * Returning the chosen pocket for a given data object.
   */
  result(): number {
    return Math.floor(this.provider.getFloat() * 37);
  }
}
export default Roulette;
