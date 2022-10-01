import Game from '../core/Game';

class Wheel extends Game {
  private segments: number = 1;

  setSegments(value: number) {
    this.segments = value;
  }

  /**
   * Verifies a wheel game by returning the chosen result for given data object and segments.
   */
  result(): number {
    return Math.floor(this.provider.getFloat() * this.segments);
  }
}

export default Wheel;
