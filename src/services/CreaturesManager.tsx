import { Base } from "../utils/base/Base";

export class CreaturesManager extends Base {
  /**
   * get list of all bugs
   */
  _getAllBugs(): Promise<any> {
    return this._get('/bugs');
  }

  /**
   * get list of all fishes
   */
  _getAllFishes(): Promise<any> {
    return this._get('/fish');
  }

  /**
   * get list of all sea creatures
   */
  _getAllSeaCreatures(): Promise<any> {
    return this._get('/sea');
  }

}