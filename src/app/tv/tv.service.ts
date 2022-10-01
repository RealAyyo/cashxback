import { Injectable } from '@nestjs/common';
import { TvModel } from './tv.model';
import sequelize, { Op } from 'sequelize';

@Injectable()
export class TvService {
  async getSlide(offset, limit, year) {
    year = year ? year : 1990;
    const data = await TvModel.findAll({
      where: { serial: '0' },
      offset,
      limit,
    });
    return data;
  }
  //
  async getAll(offset, limit, year) {
    const data = await TvModel.findAndCountAll({
      where: { serial: '0' },
      offset,
      limit,
      order: [['year', 'DESC']],
    });
    return data;
  }
  async sorting(offset, limit, year, serial, genre, rating) {
    const data = await TvModel.findAndCountAll({
      where: { serial: '0', year: { [Op.gte]: year } },
      offset,
      limit,
    });
    return data;
  }
  async search(country, years, genres, category, search) {
    let querySearch = {};
    if (years && years !== 5) {
      switch (years) {
        case 1:
          querySearch = { ...querySearch, year: 2022 };
          break;
        case 2:
          querySearch = {
            ...querySearch,
            year: { [Op.between]: [2010, 2021] },
          };
          break;
        case 3:
          querySearch = {
            ...querySearch,
            year: { [Op.between]: [2000, 2010] },
          };
          break;
        case 4:
          querySearch = {
            ...querySearch,
            year: { [Op.between]: [1990, 2000] },
          };
          break;
      }
    }
    if (category) {
      switch (category) {
        case 1:
          querySearch = { ...querySearch, serial: '0' };
          break;
        case 2:
          querySearch = { ...querySearch, serial: '1' };
          break;
      }
    }
    if (genres) {
      switch (genres) {
        case 1:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%детектив%',
            ),
          };
          break;
        case 2:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%комедия%',
            ),
          };
          break;
        case 3:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%ужас%',
            ),
          };
          break;
        case 4:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%триллер%',
            ),
          };
          break;
        case 5:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%мультфильм%',
            ),
          };
          break;
        case 6:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%фантастика%',
            ),
          };
          break;
        case 7:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%боевик%',
            ),
          };
          break;
        case 8:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%мелодрама%',
            ),
          };
          break;
        case 9:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%приключени%',
            ),
          };
          break;
        case 10:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%фентези%',
            ),
          };
          break;
        case 11:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%военн%',
            ),
          };
          break;
        case 12:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%семейн%',
            ),
          };
          break;
        case 13:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%историче%',
            ),
          };
          break;
        case 14:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%драма%',
            ),
          };
          break;
        case 15:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%документал%',
            ),
          };
          break;
        case 16:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%криминал%',
            ),
          };
          break;
        case 17:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%биограф%',
            ),
          };
          break;
        case 18:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%вестерн%',
            ),
          };
          break;
        case 19:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%нуар%',
            ),
          };
          break;
        case 20:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%спортивн%',
            ),
          };
          break;
        case 21:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%короткометраж%',
            ),
          };
          break;
        case 22:
          querySearch = {
            ...querySearch,
            genre: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('genre')),
              'LIKE',
              '%аниме%',
            ),
          };
          break;
      }
    }
    if (country) {
      switch (country) {
        case 1:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%сша%',
            ),
          };
          break;
        case 2:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%россия%',
            ),
          };
          break;
        case 3:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%италия%',
            ),
          };
          break;
        case 4:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%германия%',
            ),
          };
          break;
        case 5:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%швеция%',
            ),
          };
          break;
        case 6:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%гонконг%',
            ),
          };
          break;
        case 7:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%великобритания%',
            ),
          };
          break;
        case 8:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%канада%',
            ),
          };
          break;
        case 9:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%казахстан%',
            ),
          };
          break;
        case 10:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%ссср%',
            ),
          };
          break;
        case 11:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%бельгия%',
            ),
          };
          break;
        case 12:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%люксембург%',
            ),
          };
          break;
        case 13:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%нидерланды%',
            ),
          };
          break;
        case 14:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%израиль%',
            ),
          };
          break;
        case 15:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%кувейт%',
            ),
          };
          break;
        case 16:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%швеция%',
            ),
          };
          break;
        case 17:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%испания%',
            ),
          };
          break;
        case 18:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%аргентина%',
            ),
          };
          break;
        case 19:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%япония%',
            ),
          };
          break;
        case 20:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%корея южная%',
            ),
          };
          break;
        case 21:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%румыния%',
            ),
          };
          break;
        case 22:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%индия%',
            ),
          };
          break;
        case 23:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%перу%',
            ),
          };
          break;
        case 24:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%сербия%',
            ),
          };
          break;
        case 25:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%юар%',
            ),
          };
          break;
        case 26:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%австралия%',
            ),
          };
          break;
        case 27:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%кипр%',
            ),
          };
          break;
        case 28:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%египет%',
            ),
          };
          break;
        case 29:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%греция%',
            ),
          };
          break;
        case 30:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%азербайджан%',
            ),
          };
          break;
        case 31:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%китай%',
            ),
          };
          break;
        case 32:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%дания%',
            ),
          };
          break;
        case 33:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%чехия%',
            ),
          };
          break;
        case 34:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%уругвай%',
            ),
          };
          break;
        case 35:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%украина%',
            ),
          };
          break;
        case 36:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%бразилия%',
            ),
          };
          break;
        case 37:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%словения%',
            ),
          };
          break;
        case 38:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%пуэрто рико%',
            ),
          };
          break;
        case 39:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%польша%',
            ),
          };
          break;
        case 40:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%венесуэла%',
            ),
          };
          break;
        case 41:
          querySearch = {
            ...querySearch,
            country: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('country')),
              'LIKE',
              '%марокко%',
            ),
          };
          break;
      }
    }
    if (search) {
      querySearch = {
        ...querySearch,
        rus: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('rus')),
          'LIKE',
          '%' + search.toLowerCase() + '%',
        ),
      };
    }
    const data = await TvModel.findAndCountAll({
      where: querySearch,
      offset: 0,
      limit: 20,
      order: [['year', 'DESC']],
    });
    console.log(data.count);

    return data;
  }
  async getById(id) {
    const data = await TvModel.findOne({ where: { kinopoisk_id: id } });
    return data;
  }
}
