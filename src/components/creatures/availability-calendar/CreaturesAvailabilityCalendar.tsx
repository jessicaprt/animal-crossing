import React from 'react';

import { CreaturesManager } from '../../../services/CreaturesManager';
import { Container, Select, MenuItem, Grid, InputLabel, Button } from '@material-ui/core';
import { PageTitle } from '../../shared/page-title/PageTitle';
import { ICreature } from '../../../models/ICreature';
import { YearlyView } from './YearlyView';
import { MonthlyView } from './MonthlyView';


export const BUGS = 'Bugs';
export const FISHES = 'Fishes';
export const NORTHERN = 'Northern Hemisphere';
export const SOUTHERN = 'Southern Hemisphere';
export const YEARLY = 'Yearly View';
export const MONTHLY = 'Monthly View';

export class CreaturesAvailabilityCalendar extends CreaturesManager {
  /** if component is mounted */
  _isMounted: boolean;

  _BUGS = BUGS;
  _FISHES = FISHES;
  _NORTHERN = NORTHERN;
  _SOUTHERN = SOUTHERN;
  _YEARLY = YEARLY;
  _MONTHLY = MONTHLY;

  _AREA_OPTIONS = [NORTHERN, SOUTHERN];
  _CREATURE_TYPE_OPTIONS = [BUGS, FISHES];
  _CALENDAR_TYPE_OPTIONS = [YEARLY, MONTHLY];

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      data: {
        activeTab: 0,
        allFishes: [],
        allBugs: [],
        selectedCreature: this._BUGS,
        selectedArea: this._NORTHERN,
        selectedCalendarType: this._YEARLY,
        selectedCreaturesList: []
      }
    };

    this.onCreatureTypeSelected = this.onCreatureTypeSelected.bind(this);
    this.onAreaSelected = this.onAreaSelected.bind(this);
    this.onCalendarTypeSelected = this.onCalendarTypeSelected.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this._getAllFishes().then((fishes: any) => {
      const _allFishes: ICreature[] = this._renderCreature(fishes, 'fish');
      if (this._isMounted) {
        this._changeState('allFishes', _allFishes);
        if (this.state.data.selectedCreature === this._FISHES) {
          this._changeState('selectedCreaturesList', _allFishes);
        }
      }
    });

    this._getAllBugs().then((bugs: any) => {
      const _allBugs: ICreature[] = this._renderCreature(bugs, 'bug');
      if (this._isMounted) {
        this._changeState('allBugs', _allBugs);
        if (this.state.data.selectedCreature === this._BUGS) {
          this._changeState('selectedCreaturesList', _allBugs);
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * handles creature selection
   * @param creatureType
   */
  onCreatureTypeSelected(creatureType: string) {
    console.log('change', creatureType);
    this._changeState('selectedCreature', creatureType);

    switch (creatureType) {
      case this._BUGS:
        this._changeState('selectedCreaturesList', [...this.state.data.allBugs]);
        break;;
      case this._FISHES:
        this._changeState('selectedCreaturesList', [...this.state.data.allFishes]);
        break;
    }
  }

  /**
   * handles area selection
   * @param area
   */
  onAreaSelected(area: string) {
    this._changeState('selectedArea', area);
  }

  /**
   * handles calendar type selection
   * @param calendarType 
   */
  onCalendarTypeSelected(calendarType: string) {
    this._changeState('selectedCalendarType', calendarType);
  }


  render() {
    const _selectedCreature: string = this.state.data.selectedCreature;
    const _selectedArea: string = this.state.data.selectedArea;
    const _selectedCalendarType: string = this.state.data.selectedCalendarType;

    const _selectedCreaturesList: ICreature[] = this.state.data.selectedCreaturesList;

    return (
      <div className="background-main padded-6y">
        <Container>
          <div className="main-title-container">
            <PageTitle pageTitle="Creatures - Availability Calendar" backLink="/creatures" backLinkDisplay="Creatures" />
          </div>

          <div className="padded-2y creatures-container main-section">
            <div className="ac-selections padded-2x">
              <Grid container spacing={2}>

                <Grid item xs={12} md={4}>
                  <div className="padded-2y ac-selections-button-wrapper">

                    {this._CREATURE_TYPE_OPTIONS &&
                      this._CREATURE_TYPE_OPTIONS.map((creatureType: string) => 
                        <div className="ac-selections-button" key={creatureType}>
                          <Button variant="contained" disableElevation 
                            onClick={() => this.onCreatureTypeSelected(creatureType)}
                            className={_selectedCreature === creatureType ? 'background-blue' : ''}>
                            <span>{creatureType}</span>
                          </Button>
                        </div>
                      )
                    }

                  </div>
                </Grid>

                <Grid item xs={12} md={4}>
                  <div className="padded-2y ac-selections-button-wrapper">
                    { this._AREA_OPTIONS &&
                      this._AREA_OPTIONS.map((area: string) => 
                        <div className="ac-selections-button" key={area}>
                          <Button variant="contained" disableElevation 
                            onClick={() => this.onAreaSelected(area)}
                            className={_selectedArea === area ? 'background-blue' : ''}>
                            <span>{area}</span>
                          </Button>
                        </div>
                      )
                    }
                  </div>
                </Grid>

                <Grid item xs={12} md={4}>
                  <div className="padded-2y ac-selections-button-wrapper">
                    { this._CALENDAR_TYPE_OPTIONS &&
                      this._CALENDAR_TYPE_OPTIONS.map((calendarType: string) => 
                        <div className="ac-selections-button" key={calendarType}>
                          <Button variant="contained" disableElevation 
                            onClick={() => this.onCalendarTypeSelected(calendarType)}
                            className={_selectedCalendarType === calendarType ? 'background-blue' : ''}>
                            <span>{calendarType}</span>
                          </Button>
                        </div>
                      )
                    }
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className="padded-4y padded-2x ac-calendar-view">
              { _selectedCalendarType === this._YEARLY 
                ? <YearlyView 
                    selectedArea={_selectedArea} 
                    selectedCreatureType={_selectedCreature} 
                    creaturesList={_selectedCreaturesList} 
                  />
                : <MonthlyView 
                    selectedArea={_selectedArea} 
                    selectedCreatureType={_selectedCreature} 
                    creaturesList={_selectedCreaturesList}
                  />
              }
              
            </div>
          </div>
        </Container>
      </div>
    )
  }
}