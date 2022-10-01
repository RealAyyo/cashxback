import ArrayUtils from './ArrayUtils';
import Game from './Game';

abstract class CardsGame extends Game {
  /**
   * Given a data object, will get the given number of cards from the HMAC_SHA256 sequence it generates - supports fisher yates.
   */
  protected getCards(count: number, fisher_yates = false): number[] {
    const cards = ArrayUtils.generateArrayWithRange(0, 207);
    return this.provider.getFloats(count).map((cardIndex, index) => {
      if (fisher_yates) {
        return cards.splice(Math.floor(cardIndex * (52 - index)), 1)[0];
      }
      return cards[Math.floor(cardIndex * 52)];
    });
  }
}

export default CardsGame;
