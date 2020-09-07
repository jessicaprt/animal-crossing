import { Base } from '../utils/base/Base';
import { IMusic } from '../models/IMusic';

export class MusicManager extends Base {
  /**
   * get a list of all songs
   */
  _getAllSongs = async() => {
    return this._get('/songs');
  }

  /**
   * get song
   * @param songId
   */
  _getSong = async(songId: number) => {
    return this._get(`/songs/${songId}`);
  }

  /**
   * map response data to what's needed by the view
   * @param songs 
   */
  _renderAllSongs(songs: any): IMusic[] {
    const _allSongs:IMusic[] = [];
    
    songs.forEach((song: string) => {
      const _newSong: IMusic = {
        name: song['name']['name-USen'],
        id: song['id'],
        imageUri: song['image_uri'],
        musicUri: song['music_uri']
      }

      _allSongs.push(_newSong);
    });

    return _allSongs;
  }
}