import ArrayUtils from '../core/ArrayUtils';
import Game from '../core/Game';

class Tower extends Game {
  private mines: number = 1;

  setMines(value: number) {
    if (value <= 0) {
      throw Error('Min mines 1');
    }
    if (value > 4) {
      throw Error('Max mines 4');
    }
    this.mines = value;
  }

  /**
   * Returning the X chosen mines for each row for a given data object.
   */
  result(): number[][] {
    const columns = 4,
      rows = 10;

    let data = [];
    for (let i = 1; i <= rows; i++) {
      let array = ArrayUtils.generateArrayWithRange(0, columns);
      const floats = this.provider.getFloats(columns * i);
      const value = floats
        .splice(i - 1, i * this.mines)
        .map((float, index) => {
          return array.splice(Math.floor(float * (columns - index + 1)), 1)[0];
        })
        .splice(0, this.mines);
      data.push(value);
    }

    return data;
  }
}

export default Tower;
