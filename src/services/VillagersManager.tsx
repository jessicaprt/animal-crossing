import { Base } from '../utils/base/Base';
import { IVillager } from '../models/IVillager';

export class VillagersManager extends Base {
  /**
   * get a list of all villagers
   */
  _getAllVillagers = async() => {
    return this._get('/villagers');
  }

  /**
   * 
   * @param villager 
   */
  _renderVillager(villager: any): IVillager {
    return {
      id: villager['id'],
      name: villager['name']['name-USen'],
      personality: villager['personality'],
      birthday: villager['birthday-string'],
      species: villager['species'],
      gender: villager['gender'],
      hobby: villager['hobby'],
      catchphrase: villager['catch-phrase'],
      imageUri: villager['image_uri'],
      iconUri: villager['icon_uri'],
      saying: villager['saying'],
      bubbleColor: villager['bubble-color'],
      textColor: villager['text-color']
    }
  }
}