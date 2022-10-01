import ProvablyFair from './ProvablyFair';

export interface GameConstructor {
  new (provider: ProvablyFair): GameInterface;
}

export interface GameInterface {
  result(): any;
}

abstract class Game implements GameInterface {
  constructor(protected provider: ProvablyFair) {}

  abstract result(): any;
}

export default Game;
