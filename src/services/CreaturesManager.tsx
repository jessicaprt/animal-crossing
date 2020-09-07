import { Base } from "../utils/base/Base";
import { ICreature } from "../models/ICreature";

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

  /**
   * map creature from response to interface
   * @param creatures 
   */
  _renderCreature(creatures: any, kind: string): ICreature[] {
    const _allCreatures: ICreature[] = [];

    creatures.forEach((creature: string) => {
      const _newCreature: ICreature = {
        kind: kind,
        id: creature['id'],
        isAllDay: creature['availability']['isAllDay'],
        isAllYear: creature['availability']['isAllYear'],
        location: creature['availability']['location'],
        monthsAvailable_northern: this._getMonthArray(creature['availability']['month-array-northern']),
        monthsAvailable_southern: this._getMonthArray(creature['availability']['month-array-southern']),
        timeAvailable: creature['availability']['time-array'],
        timeString: creature['availability']['time'],
        iconUri: creature['icon_uri'],
        imageUri: creature['image_uri'],
        museumInfo: creature['museum-phrase'],
        name: creature['name']['name-USen'],
        price: creature['price'],
        price_cj: creature['price-cj'] || null,
        price_flick: creature['price-flick'] || null,
        shadow: creature['shadow']
      };

      _allCreatures.push(_newCreature);
    });

    return _allCreatures;
  } 


  /**
   * return month array converted to string
   * @param monthArr
   */
  _getMonthArray(monthArr: number[]): string[] {
    const _monthArrStr: string[] = [];
    
    monthArr.forEach((m: number) => {
      _monthArrStr.push(this._getMonth(m))
    });

    return _monthArrStr;
  }

    /**
   * convert number to string value
   * @param index 
   */
  _getMonth(index: number): string {
    switch(index) {
      case 1:
        return 'Jan';

      case 2:
        return 'Feb';

      case 3:
        return 'Mar';

      case 4:
        return 'Apr';

      case 5:
        return 'May';

      case 6:
        return 'Jun';

      case 7:
        return 'Jul';

      case 8:
        return 'Aug';

      case 9:
        return 'Sept';

      case 10:
        return 'Oct';

      case 11:
        return 'Nov';

      case 12:
        return 'Dec';
    }
    return '';
  }
}