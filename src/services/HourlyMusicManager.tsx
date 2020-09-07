import React from 'react';
import { Base } from '../utils/base/Base';
import { IHourlyMusic, IWeatherMusic } from '../models/IHourlyMusic';

export class HourlyMusicManager extends Base {
  _getAllMusic() {
    return this._get('/backgroundmusic');
  }

  _renderItems(musicData: any): IHourlyMusic[] {
    // hold all hourly music data
    const _allHourlyMusic: IHourlyMusic[] = [];

    musicData.forEach((music: any) => {
      const _id = `hour-${music['hour']}`;
      const _existingHour = (_allHourlyMusic.find((m: IHourlyMusic) => m.id === _id));
      
      const _newVariation: IWeatherMusic = {
        musicUri: music['music_uri'],
        weather: music['weather']
      };
      
      if (!_existingHour) {
        // create new hour
        const _newHourlyMusic: IHourlyMusic = {
          id: _id,
          hour: music['hour'],
          variations: [_newVariation]
        }

        _allHourlyMusic.push(_newHourlyMusic);
      } else {
        // add variation to hour
        _existingHour.variations.push(_newVariation);
      }
    });

    return _allHourlyMusic;
  }
}