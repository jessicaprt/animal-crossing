import { Base } from '../utils/base/Base';

export class VillagersManager extends Base {
  /**
   * get a list of all villagers
   */
  _getAllVillagers = async() => {
    return this._get('/villagers');
  }
}