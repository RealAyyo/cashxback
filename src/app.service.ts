import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TvModel } from './app/tv/tv.model';

interface IArr {
  link: string;
  kinopoisk_id: string;
  serial: string;
  camrip: string;
  info: {
    rus: string;
    orig: string;
    year: number;
    country: string;
    director: string;
    genre: string;
    actors: string;
    description: string;
    slogan: string;
    premiere: string;
    time: string;
    poster: string;
    screenshot: string;
    rating: {
      rating_kp: number;
      rating_imdb: number;
    };
  };
}

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async getHello(): Promise<any> {
    let arr: IArr[] = [];
    let res: any = [];
    let i: number = 1;
    while (true) {
      res = await firstValueFrom(
        this.httpService.get(
          `https://bazon.cc/api/json?token=1343fbe1fee5f71be546f12cd11856fb&type=serial&page=${i}`,
        ),
      );

      arr = [...arr, ...res.data.results];

      if (i === 123) {
        break;
      }
      i++;
      console.log(arr.length);
      console.log(i);
    }

    for await (let i of arr) {
      let rating_kp = i.info?.rating?.rating_kp
        ? +i.info?.rating?.rating_kp
        : 5;
      let rating_imdb = i.info?.rating?.rating_imdb
        ? +i.info?.rating?.rating_imdb
        : 5;

      await TvModel.create({
        link: i.link,
        kinopoisk_id: i.kinopoisk_id,
        serial: i.serial,
        camrip: i.camrip,
        rus: i.info.rus,
        orig: i.info.orig,
        year: +i.info.year,
        country: i.info.country,
        director: i.info.director,
        genre: i.info.genre,
        actors: i.info.actors,
        description: i.info.description,
        slogan: i.info.slogan,
        premiere: i.info.premiere,
        time: i.info.time,
        poster: i.info.poster,
        screenshot: i.info.screenshot,
        rating_kp: +rating_kp,
        rating_imdb: +rating_imdb,
      });
    }

    return arr;
  }
}
