/**
 * Provides utility methods for creating and manipulating arrays.
 */
class ArrayUtils {
  /**
   * Generates a new array containing a range of numbers from min to max.
   * @return {number[]} The array covering the given range.
   */
  static generateArrayWithRange(min: number, max: number): number[] {
    return Array.from({ length: max - min + 1 }, (_, index) => index + min);
  }

  /**
   * Chunks array by given size.
   * @return {Object[]} The array split into chunks.
   */
  static chunkArray(array: any[], size: number): number[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size),
    );
  }
}

export default ArrayUtils;
