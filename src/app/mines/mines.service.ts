import { Injectable } from '@nestjs/common';
import ProvablyFair from '../generate-master/core/ProvablyFair';
import {randomBytes} from 'crypto'
import Mines from '../generate-master/games/Mines';

@Injectable()
export class MinesService {


  gameStart() {
    const clientSeed = randomBytes(256);
    const serverSeed = randomBytes(256);

    const provider = new ProvablyFair(serverSeed.toString('hex'), clientSeed.toString('hex'), '1');

    const mines = new Mines(provider);
    console.log(mines);

  }

}

