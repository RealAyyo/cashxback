import { Injectable } from '@nestjs/common';
import { CrashGateway } from './crash.gateway';
import { randomBytes } from 'crypto';
import Crash from '../generate-master/games/Crash';
import ProvablyFair from '../generate-master/core/ProvablyFair';
import { v4 as uuidv4 } from 'uuid';
import { RoundService } from '../round/round.service';

@Injectable()
export class CrashService {
  gameid: string;

  coefficient = 1.0;
  winNum = 1.0;
  isGameEnd = false;
  time = 0;
  offset = 0;
  curve = 96;
  curveTwo = 190;
  color = { r: 17, g: 65, b: 255 };
  cfLine = {
    one: 1.0,
    two: 1.2,
    three: 1.4,
    four: 1.6,
    five: 1.8,
    six: 2.0,
  };
  crashData = [];

  constructor(
    private readonly crashGateway: CrashGateway,
    private readonly roundService: RoundService,
  ) {
  }

  async sleep(time) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('');
      }, time),
    );
  };

  sendChartData() {
    if (this.coefficient > 1.8) {
      this.cfLine = {
        one: 1,
        two: this.coefficient - 0.6,
        three: this.coefficient - 0.4,
        four: this.coefficient - 0.2,
        five: this.coefficient,
        six: this.coefficient + 0.7,
      };
    } else if (this.coefficient > 7) {
      this.cfLine = {
        one: 1,
        two: this.coefficient - 0.8,
        three: this.coefficient - 0.6,
        four: this.coefficient - 0.4,
        five: this.coefficient - 0.2,
        six: this.coefficient,
      };
    }
    if (this.offset < 350) {
      this.offset += 0.4;
    } else {
      this.curve = this.curve < 250 ? this.curve + 0.015 : 250;
      this.curveTwo = this.curveTwo < 250 ? this.curveTwo + 0.015 : 250;

      if (this.color.g > 17) {
        this.color.g -= 0.1;
      }

      if (this.color.r < 255 && this.color.g <= 17) {
        this.color.r += 0.1;
      }

      if (this.color.b >= 17 && this.color.r >= 255) {
        this.color.b -= 0.1;
      }

      this.offset += 0.02;
    }

    if (this.offset >= 485) {
      this.offset = 485;
    }
    this.crashGateway.sendData({
      coefficient: this.coefficient,
      offset: this.offset,
      time: this.time,
      curve: this.curve,
      curveTwo: this.curveTwo,
      color: this.color,
      cfLine: this.cfLine,
      gameEnd: this.isGameEnd,
      gameId: this.gameid,
    });
  }

  async gameStart() {
    await this.startTimer();
  }

  async gameEnd() {
    this.isGameEnd = true;
    this.color = { r: 138, g: 41, b: 41 };
    this.crashData.push(this.coefficient);
    this.crashData = this.crashData.slice(-5);

    await this.roundService.endRound(this.gameid, +(this.coefficient).toFixed(2));

    this.crashGateway.sendInitialData(this.crashData);

    while (this.offset > 0) {
      this.offset -= 2;
      await this.sleep(10);
      this.crashGateway.sendData({
        coefficient: this.coefficient,
        offset: this.offset,
        time: this.time,
        curve: this.curve,
        curveTwo: this.curveTwo,
        color: this.color,
        cfLine: this.cfLine,
        gameEnd: this.isGameEnd,
        crashData: this.crashData,
        gameId: this.gameid,
      });
    }

    this.gameid = uuidv4();
    await this.roundService.startRound(this.gameid, 'fd866662-d49c-4c45-b0b1-d7dc98ac33c2');


    await this.sleep(5000);
    await this.startTimer();
  }

  async startTimer() {
    this.setInitialData();
    this.generateCoefficient();
    this.isGameEnd = false;
    while (this.coefficient <= this.winNum) {
      this.coefficient =
        this.coefficient > 5
          ? this.coefficient + 0.005
          : this.coefficient + 0.001;
      if (this.coefficient > 1 && this.coefficient < 4) {
        this.coefficient = this.coefficient + 0.001;
      } else if (this.coefficient > 4 && this.coefficient < 10) {
        this.coefficient = this.coefficient + 0.002;
      } else if (this.coefficient > 10 && this.coefficient < 30) {
        this.coefficient = this.coefficient + 0.004;
      } else if (this.coefficient > 30 && this.coefficient < 60) {
        this.coefficient = this.coefficient + 0.008;
      } else if (this.coefficient > 60 && this.coefficient < 100) {
        this.coefficient = this.coefficient + 0.0092;
      } else if (this.coefficient > 100 && this.coefficient < 500) {
        this.coefficient = this.coefficient + 0.0102;
      } else if (this.coefficient > 500 && this.coefficient < 1000) {
        this.coefficient = this.coefficient + 0.0153;
      } else if (this.coefficient > 1000 && this.coefficient < 10000) {
        this.coefficient = this.coefficient + 0.0233;
      } else if (this.coefficient > 10000) {
        this.coefficient = this.coefficient + 0.51122;
      }

      this.sendChartData();
      this.time += 0.01;
      await this.sleep(10);
    }
    await this.gameEnd();
  }

  setInitialData() {
    this.time = 0;
    this.coefficient = 1.0;
    this.offset = 0;
    this.curve = 96;
    this.curveTwo = 190;
    this.color = { r: 17, g: 65, b: 255 };
    this.cfLine = {
      one: 1.0,
      two: 1.2,
      three: 1.4,
      four: 1.6,
      five: 1.8,
      six: 2.0,
    };
    this.crashGateway.sendData({
      coefficient: this.coefficient,
      offset: this.offset,
      time: this.time,
      curve: this.curve,
      curveTwo: this.curveTwo,
      color: this.color,
      cfLine: this.cfLine,
      gameEnd: this.isGameEnd,
      gameId: this.gameid,
    });
  }

  generateCoefficient() {
    const serverBytes = randomBytes(100);
    const clientBytes = randomBytes(100);
    const serverSeed = serverBytes.toString('hex');
    const clientSeed = clientBytes.toString('hex');

    const provider = new ProvablyFair(serverSeed, clientSeed, '1');
    const crash = new Crash(provider);
    this.winNum = crash.result();
  }
}
