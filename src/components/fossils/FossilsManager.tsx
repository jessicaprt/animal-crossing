import { Base } from "../../utils/base/Base";
import { IFossil } from "./IFossils";

export class FossilsManager extends Base {
  _getAllFossils() {
    return this._get('/fossils');
  }

  /**
   * setup the object list needed by the view
   * @param fossils
   */
  _renderFossils(fossils: any): IFossil[] {
    const _allFossils: IFossil[] = [];
    fossils.forEach((fossil: any) => {
      const _newFossil: IFossil = {
        id: fossil['file-name'],
        name: fossil['name']['name-USen'],
        price: fossil['price'],
        museumDescription: fossil['museum-phrase'],
        imageUri: fossil['image_uri']
      };

      _allFossils.push(_newFossil);
    })
    return _allFossils;
  }
}