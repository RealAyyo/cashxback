import CardsGame from '../core/CardsGame';

class Diamonds extends CardsGame {
  /**
   * Returning the first 5 cards for a given data object.
   */
  result(): string[] {
    const gems = [
      'green',
      'purple',
      'yellow',
      'red',
      'light_blue',
      'pink',
      'blue',
    ];
    const maxGems = 5;
    return this.provider.getFloats(maxGems).map((cardIndex) => {
      return gems[Math.floor(cardIndex * 7)];
    });
  }
}

export default Diamonds;
