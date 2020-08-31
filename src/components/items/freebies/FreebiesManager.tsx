import React from 'react';

import './Freebies.css';

import { IFreebieGroup, IItem, IItemGroup } from '../IItem';
import { ItemsManager } from '../ItemsManager';

import Skeleton from '@material-ui/lab/Skeleton';

export const FreebiesSkeleton = () => {
  return (
    <div className="freebies-all-wrapper padded-4y padded-2x">
      <div className="freebies-all-item-skeleton">
        <Skeleton variant="rect" width={140} height={140} />
      </div>
      <div className="freebies-all-item-skeleton">
        <Skeleton variant="rect" width={140} height={140} />
      </div>
      <div className="freebies-all-item-skeleton">
        <Skeleton variant="rect" width={140} height={140} />
      </div>
      <div className="freebies-all-item-skeleton">
        <Skeleton variant="rect" width={140} height={140} />
      </div>
      <div className="freebies-all-item-skeleton">
        <Skeleton variant="rect" width={140} height={140} />
      </div>
      <div className="freebies-all-item-skeleton">
        <Skeleton variant="rect" width={140} height={140} />
      </div>
      <div className="freebies-all-item-skeleton">
        <Skeleton variant="rect" width={140} height={140} />
      </div>
      <div className="freebies-all-item-skeleton">
        <Skeleton variant="rect" width={140} height={140} />
      </div>
      <div className="freebies-all-item-skeleton">
        <Skeleton variant="rect" width={140} height={140} />
      </div>
    </div>
  );
}

export class FreebiesManager extends ItemsManager {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        freebieId: this.props.match.params.freebie_id,
        selectedFreebieItems: [],
        allItems: [],
        allFreebies: {},
        loaded: false
      }
    }
  }

  componentDidMount() {
    this._getAllHousewareItems().then((housewares: any) => {
      this.renderItems(housewares);

      this._getAllWallmountedItems().then((wallmounted: any) => {
        this.renderItems(wallmounted);

        this._getAllMiscItems().then((misc: any) => {
          this.renderItems(misc);
          this._changeState('loaded', true);
        });
      });
    });
  }

  /** 
   * map data needed for the view from the response
   */
  renderItems(items: any): void {
    const _freebieItems: IFreebieGroup[] = [];
    const _freebies: any = {...this.state.data.allFreebies};

    items.forEach((itemGroup: any[]) => {
      let _variations: IItem[] = [];
      if (!itemGroup[0]['isDIY'] && !itemGroup[0]['buy-price']) {
        itemGroup.forEach((item: any) => {
          const _newItem:IItem = {
            buyPrice: item['buy-price'],
            canCustomize: item['canCustomizeBody'] || item['canCustomizePattern'],
            color1: item['color-1'],
            color2: item['color-2'],
            hhaConcept1: item['hha-concept-1'],
            hhaConcept2: item['hha-concept-2'] || '',
            imageUri: item['image_uri'],
            isCatalog: item['isCatalog'],
            isDiy: item['isDIY'],
            isInteractive: item['isInteractive'],
            isOutdoor: item['isOutdoor'],
            name: item['name']['name-USen'],
            pattern: item['pattern'],
            sellPrice: item['sell-price'],
            source: item['source'],
            tag: item['tag'],
            variant: item['variant']
          }

          _variations.push(_newItem);
        });

        const _newDiyItemGroup: IItemGroup = {
          variations: _variations
        }

        // initialize if needed
        if(!_freebies[_variations[0].source]) {
          _freebies[_variations[0].source] = [];
        }

        _freebies[_variations[0].source].push(_newDiyItemGroup);
      }
    });

    this._changeState('allFreebies', _freebies);

    Object.keys(_freebies).forEach((key: string) => {
      let _shortKey = key.split(' ').join('-').split('.').join('').toLowerCase();;

      const _newFreebieGroup: IFreebieGroup = {
        id_long: key,
        id_short: _shortKey,
        data: _freebies[key]
      }

      _freebieItems.push(_newFreebieGroup);
    });

    const _id: string = this.state.data.freebieId;
    if (_id != null) {
      const _filtered: any = _freebieItems.find((f: IFreebieGroup) => f.id_short === this.state.data.freebieId);
      this._changeState('selectedFreebieItems', _filtered);
    } else {
      this._changeState('allItems', _freebieItems);
    }
  }
}