import Game from '../core/Game';

class Plinko extends Game {
  private pins: number = 12;

  setPins(value: number) {
    this.pins = value;
  }

  /**
   * Returning the 16 chosen directions for a given data object.
   */
  result(): number {
    return Math.floor(this.provider.getFloat() * (this.pins + 1));
  }
}

export default Plinko;
