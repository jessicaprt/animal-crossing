import { Base } from "../../utils/base/Base";

import './Item.css';

export class ItemsManager extends Base {
  /**
   * get a list of all houseware items
   */
  _getAllHousewareItems() {
    return this._get('/houseware');
  }

  /**
   * get a list of all wallmounted items
   */
  _getAllWallmountedItems() {
    return this._get('/wallmounted');
  }

  /**
   * get a list of all misc items
   */
  _getAllMiscItems() {
    return this._get('/misc');
  }
}