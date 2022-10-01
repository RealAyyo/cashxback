import Game from '../core/Game';

class Crash extends Game {
  /**
   * Returning the stoppage for a given hash and a client seed.
   */
  result(): number {
    const max_multiplier = 1500,
      house_edge = 0.99;
    const float_point =
      (max_multiplier / (this.provider.getFloat() * max_multiplier)) *
      house_edge;
    return Number((Math.floor(float_point * 100) / 100).toFixed(2));
  }
}
export default Crash;
