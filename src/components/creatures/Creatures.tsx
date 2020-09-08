import React from 'react';

import { Link } from 'react-router-dom';
import { CreaturesManager } from '../../services/CreaturesManager';
import { Container, Tabs, Tab, Button } from '@material-ui/core';
import { PageTitle } from '../shared/page-title/PageTitle';
import { CreatureTab } from './CreatureTab';
import { ICreature } from '../../models/ICreature';

export class Creatures extends CreaturesManager {
  /** is component mounted */
  _isMounted: boolean;

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

    this._isMounted = false;
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this._getAllFishes().then((fishes: any) => {
      const _allFishes: ICreature[] = this._renderCreature(fishes, 'fish');
      if (this._isMounted) {
        this._changeState('allFishes', _allFishes);
      }
    });

    this._getAllBugs().then((bugs: any) => {
      const _allBugs: ICreature[] = this._renderCreature(bugs, 'bug');
      if (this._isMounted) {
        this._changeState('allBugs', _allBugs);
      }
    });

    this._getAllSeaCreatures().then((creatures: any) => {
      const _allSeaCreatures: ICreature[] = this._renderCreature(creatures, 'sea');
      if (this._isMounted) {
        this._changeState('allSeaCreatures', _allSeaCreatures);
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
    if (this._isMounted) {
      this._changeState('activeTab', newValue);
    }
  }
   
  render() {
    return (
      <div className="background-main padded-6y creatures-wrapper">
        <Container>
          <div className="main-title-container">
            <PageTitle pageTitle="Creatures" backLink="/" backLinkDisplay="Home" />
            <div className="main-title-button-wrapper">
            <Link to="/creature/availability-calendar">
              <Button variant="contained" disableElevation className="background-green">
                Availability Calendar
              </Button>
            </Link>
            </div>
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
                <CreatureTab fishes={this.state.data.allFishes} />
              </div>
              <div hidden={this.state.data.activeTab != 1}>
                <CreatureTab fishes={this.state.data.allBugs} />
              </div>
              <div hidden={this.state.data.activeTab != 2}>
                <CreatureTab fishes={this.state.data.allSeaCreatures} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}