import CardsGame from '../core/CardsGame';

/**
 * @module Games
 */
class Baccarat extends CardsGame {
  /**
   * Returning the first 6 cards for a given data object.
   */
  result(): number[] {
    return this.getCards(6);
  }
}

export default Baccarat;
