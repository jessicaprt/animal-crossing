import React from 'react';

import { CreaturesManager } from './CreaturesManager';
import { Container, Tabs, Tab } from '@material-ui/core';
import './Creatures.css';
import { PageTitle } from '../shared/page-title/PageTitle';
import { Creature } from './creature/Creature';
import { ICreature } from './ICreature';

export class Creatures extends CreaturesManager {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        activeTab: 0,
        allFishes: [],
        allBugs: [],
        allSeaCreatures: []
      }
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    this._getAllFishes().then((fishes: any) => {
      const _allFishes: ICreature[] = this.renderCreature(fishes, 'fish');
      this._changeState('allFishes', _allFishes);
    });

    this._getAllBugs().then((bugs: any) => {
      const _allBugs: ICreature[] = this.renderCreature(bugs, 'bug');
      this._changeState('allBugs', _allBugs);
    });

    this._getAllSeaCreatures().then((creatures: any) => {
      const _allSeaCreatures: ICreature[] = this.renderCreature(creatures, 'sea');
      this._changeState('allSeaCreatures', _allSeaCreatures);
    });
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
   * map creature from response to interface
   * @param creatures 
   */
  renderCreature(creatures: any, kind: string): ICreature[] {
    const _allCreatures: ICreature[] = [];

    Object.keys(creatures).forEach((key: string) => {
      const _currentCreature: any = creatures[key];
      const _newCreature: ICreature = {
        kind: kind,
        id: _currentCreature['id'],
        isAllDay: _currentCreature['availability']['isAllDay'],
        isAllYear: _currentCreature['availability']['isAllYear'],
        location: _currentCreature['availability']['location'],
        monthsAvailable_northern: this.getMonthArray(_currentCreature['availability']['month-array-northern']),
        monthsAvailable_southern: this.getMonthArray(_currentCreature['availability']['month-array-southern']),
        timeAvailable: _currentCreature['availability']['time-array'],
        timeString: _currentCreature['availability']['time'],
        iconUri: _currentCreature['icon_uri'],
        imageUri: _currentCreature['image_uri'],
        museumInfo: _currentCreature['museum-phrase'],
        name: _currentCreature['name']['name-USen'],
        price: _currentCreature['price'],
        price_cj: _currentCreature['price-cj'] || null,
        price_flick: _currentCreature['price-flick'] || null,
        shadow: _currentCreature['shadow']
      };

      _allCreatures.push(_newCreature);
    });

    console.log(_allCreatures);

    return _allCreatures;
  } 

  /**
   * return month array converted to string
   * @param monthArr
   */
  getMonthArray(monthArr: number[]): string[] {
    const _monthArrStr: string[] = [];
    
    monthArr.forEach((m: number) => {
      _monthArrStr.push(this.getMonth(m))
    });

    return _monthArrStr;
  }

  /**
   * convert number to string value
   * @param index 
   */
  getMonth(index: number): string {
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
   
  render() {
    return (
      <div className="background-main padded-6y creatures-wrapper">
        <Container>
          <div className="app-title-container">
            <PageTitle pageTitle="Creatures" backLink="/" backLinkDisplay="Home" />
          </div>

          <div className="padded-2y creatures-container main-section">
          <Tabs
            value={this.state.data.activeTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered>
            <Tab label="Fishes" />
            <Tab label="Bugs" />
            <Tab label="Sea Creatures" />
          </Tabs>

          <div className="creatures-section">
            <div hidden={this.state.data.activeTab != 0}>
              <Creature fishes={this.state.data.allFishes} />
            </div>
            <div hidden={this.state.data.activeTab != 1}>
              <Creature fishes={this.state.data.allBugs} />
            </div>
            <div hidden={this.state.data.activeTab != 2}>
              <Creature fishes={this.state.data.allSeaCreatures} />
            </div>
          </div>

          </div>
        </Container>
      </div>
    );
  }
}