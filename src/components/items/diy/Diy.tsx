import React from 'react';

import { ItemsManager } from '../../../services/ItemsManager';
import { Container, Tabs, Tab, Tooltip } from '@material-ui/core';
import { PageTitle } from '../../shared/page-title/PageTitle';
import { IItem, IItemGroup } from '../../../models/IItem';
import { DiyTab } from './DiyTab';

import KitchenIcon from '@material-ui/icons/Kitchen';
import FilterFramesIcon from '@material-ui/icons/FilterFrames';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';


interface IRenderedItem {
  allItems: any,
  pagedItems: any
}

export class Diy extends ItemsManager {
  /** if component is mounted */
  _isMounted: boolean;

  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      data: {
        activeTab: 0,
        allHousewareItems: [],
        allWallmountedItems: [],
        allMiscItems: [],
        pagedHousewareItems: [],
        pagedWallmountedItems: [],
        pagedMiscItems: []
      }
    }

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this._getAllHousewareItems().then((housewares: any) => {
      const items: IRenderedItem = this.renderItems(housewares);
      if (this._isMounted) {
        this._changeState('allHousewareItems', items.allItems);
        this._changeState('pagedHousewareItems', items.pagedItems);
      }
    });

    this._getAllWallmountedItems().then((wallmounted: any) => {
      const items: IRenderedItem = this.renderItems(wallmounted);
      if (this._isMounted) {
        this._changeState('allWallmountedItems', items.allItems);
        this._changeState('pagedWallmountedItems', items.pagedItems);
      }
    });

    this._getAllMiscItems().then((misc: any) => {
      const items: IRenderedItem = this.renderItems(misc);
      if (this._isMounted) {
        this._changeState('allMiscItems', items.allItems);
        this._changeState('pagedMiscItems', items.pagedItems);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }



  /**
   * handles the tab change and sets the active tab
   * @param event 
   * @param newValue 
   */
  handleTabChange(event:any, newValue:any): void {
    this._changeState('activeTab', newValue);
  }

  /** 
   * map data needed for the view from the response
   */
  renderItems(items: any): IRenderedItem {
    const _allHouseware: IItemGroup[] = [];
    const _pagedHouseware: any[] = [];
    let _newPage: IItemGroup[] = [];

    items.forEach((itemGroup: any[]) => {
      let _variations: IItem[] = [];
      if (itemGroup[0]['isDIY']) {
        itemGroup.forEach((item: any) => {
          const _newDiyItem:IItem = {
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

          _variations.push(_newDiyItem);
        });

        const _newDiyItemGroup: IItemGroup = {
          variations: _variations
        }
        
        _allHouseware.push(_newDiyItemGroup);
        _newPage.push(_newDiyItemGroup);
        if (_newPage.length === 100) {
          _pagedHouseware.push([..._newPage]);
          _newPage = [];
        }
      }
    });

    if (_newPage.length) {
      _pagedHouseware.push([..._newPage]);
    }

    return {
      allItems: _allHouseware,
      pagedItems: _pagedHouseware
    }
  }

  render() {
    const _activeTab = this.state.data.activeTab;
    const _pagedHousewareItems:IItem[] = this.state.data.pagedHousewareItems;
    const _pagedWallmountedItems:IItem[] = this.state.data.pagedWallmountedItems;
    const _pagedMiscItems:IItem[] = this.state.data.pagedMiscItems;


    const _allHousewareItemsLength:number = this.state.data.allHousewareItems.length;
    const _allWallmountedItemsLength:number = this.state.data.allWallmountedItems.length;
    const _allMiscItemsLength:number = this.state.data.allMiscItems.length;

    return (
      <div className="background-main padded-6y item-wrapper">
        <Container>
          <div className="main-title-container">
            <PageTitle pageTitle="DIY Items" backLink="/" backLinkDisplay="Home" />
            <div className="main-search-wrapper">
              {/* <div className="main-search-icon"><SearchIcon fontSize="large" /></div>
              <TextField id="outlined-basic" label="Search Villager" variant="outlined" onChange={event => this.textSearchChange(event.target.value)} />  */}
            </div>
          </div>
          
          <div className="padded-2y padded-4x item-container main-section">
            <Tabs
              value={_activeTab}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered>
              <Tab icon={<Tooltip title="Housewares"><KitchenIcon /></Tooltip>} />
              <Tab icon={<Tooltip title="Wallmounted"><FilterFramesIcon /></Tooltip>} />
              <Tab icon={<Tooltip title="Miscellaneous"><LocalCafeIcon /></Tooltip>} />
            </Tabs>

            <div className="item-section">
              {_activeTab === 0 &&
                <DiyTab title="Houseware" pagedDiyItems={_pagedHousewareItems} allDiyItemsLength={_allHousewareItemsLength} />
              }

              {_activeTab === 1 &&
                <DiyTab title="Wallmounted" pagedDiyItems={_pagedWallmountedItems} allDiyItemsLength={_allWallmountedItemsLength} />
              }

              {_activeTab === 2 &&
                <DiyTab title="Miscellaneous" pagedDiyItems={_pagedMiscItems} allDiyItemsLength={_allMiscItemsLength} />
              }
            </div>
          </div>
        </Container>
      </div>
    )
  }
}