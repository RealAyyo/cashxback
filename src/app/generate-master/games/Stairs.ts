import ArrayUtils from '../core/ArrayUtils';
import Game from '../core/Game';

class Stairs extends Game {
  private mines: number = 1;

  setMines(value: number) {
    if (value <= 0) {
      throw Error('Min mines 1');
    }
    if (value > 7) {
      throw Error('Max mines 7');
    }
    this.mines = value;
  }

  /**
   * Returning the X chosen mines for each row for a given data object.
   */
  result(): number[][] {
    const rows = [20, 19, 19, 18, 19, 15, 17, 13, 12, 19, 10, 9, 8];

    let data = [];
    for (let i = 1; i <= rows.length; i++) {
      let array = ArrayUtils.generateArrayWithRange(0, rows[i - 1]);
      const floats = this.provider.getFloats(rows[i - 1] * i);
      const value = floats
        .splice(i - 1, this.mines * i)
        .map((float, index) => {
          return array.splice(
            Math.floor(float * (rows[i - 1] - index + 1)),
            1,
          )[0];
        })
        .splice(0, this.mines);
      data.push(value);
    }

    return data;
  }
}

export default Stairs;
