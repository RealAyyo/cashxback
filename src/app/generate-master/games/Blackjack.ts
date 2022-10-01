import CardsGame from '../core/CardsGame';

class Blackjack extends CardsGame {
  /**
   * Returning the first 52 cards for a given data object.
   */
  result(): number[] {
    return this.getCards(52);
  }
}

export default Blackjack;
