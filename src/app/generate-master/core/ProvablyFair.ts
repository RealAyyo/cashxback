import ArrayUtils from './ArrayUtils.js';
import { sha256 } from 'js-sha256';

/**
 * Provides utility method for extracting floats from a game seed.
 */
class ProvablyFair {
  constructor(
    public serverSeed: string,
    public clientSeed: string,
    public nonce: string,
  ) {}

  /**
   * Given a data object, will extract a single float from its HMAC_SHA256 sequence.
   */
  getFloat() {
    return this.getFloats(1)[0];
  }

  /**
   * Given a data object, will extract a given number of floats from its HMAC_SHA256 sequence.
   * @param {number} count The number of floats to extract
   */
  getFloats(count: number): number[] {
    const byteGenerator = this.byteGenerator();
    const bytes = Array.from(
      { length: count * 4 },
      () => byteGenerator.next().value,
    );
    return ArrayUtils.chunkArray(bytes, 4).map(ProvablyFair.byteToFloat);
  }

  /**
   * Given a data object, will extract a given number of floats from its HMAC_SHA256 sequence.
   * @param {number} count The number of floats to extract
   */
  getBytes(count: number): ArrayBuffer[] {
    return Array.from({ length: count }, () => this.byteGeneratorArrayBuffer());
  }

  private static byteToFloat(byte: number[]) {
    return byte.reduce(
      (result: number, value: number, index: number) =>
        result + value / 256 ** (index + 1),
      0,
    );
  }

  /**
   * Given a data object will keep yielding the next byte from its HMAC_SHA256 sequence.
   * Please be aware this method will start with cursor set to zero,
   * and in the case of all 32 bytes getting used it will increment the cursor to generate a new HMAC_SHA256 sequence.
   * @yields {number} the next byte in the HMAC_SHA256 sequence
   */
  private *byteGenerator() {
    let currentRound = 0;
    while (true) {
      const hash = sha256.hmac.create(this.serverSeed);
      hash.update(`${this.clientSeed}:${this.nonce}:${currentRound}`);

      currentRound++;
      const buffer = hash.digest();
      for (let i = 0; i < 32; i++) {
        yield Number(buffer[i]);
      }
    }
  }

  private byteGeneratorArrayBuffer(): ArrayBuffer {
    const hash = sha256.hmac.create(this.serverSeed);
    hash.update(`${this.clientSeed}:${this.nonce}:${0}`);

    return hash.arrayBuffer();
  }
}
export default ProvablyFair;
