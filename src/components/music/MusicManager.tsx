import { Base } from '../../utils/base/Base';

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
}