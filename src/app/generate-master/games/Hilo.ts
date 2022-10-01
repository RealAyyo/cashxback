import CardsGame from '../core/CardsGame';

class Hilo extends CardsGame {
  /**
   * Returning the first 52 cards for a given data object.
   */
  result(): number[] {
    return this.getCards(52);
  }
}

export default Hilo;
