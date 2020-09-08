import React from 'react';

import { ICreature } from '../../../models/ICreature';
import { MonthlyCreatureRow } from './MonthlyCreatureRow';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { NORTHERN, SOUTHERN } from './CreaturesAvailabilityCalendar';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

interface IMonthlyViewProps {
  selectedCreatureType: string;
  selectedArea: string;
  creaturesList: ICreature[];
}

interface IMonthlyViewState {
  hours: number[];
  selectedMonth: number;
}

export class MonthlyView extends React.Component<IMonthlyViewProps, IMonthlyViewState> {
  _NORTHERN = NORTHERN;
  _SOUTHERN = SOUTHERN;

  constructor(props) {
    super(props);

    this.state = {
      hours: [],
      selectedMonth: 1
    }

    this.onNextClick = this.onNextClick.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.getMonthFromId = this.getMonthFromId.bind(this);
  }

  componentDidMount() {
    this.initializeHours();
  }

  changeState(key: string, value: any) {
    let currentState = this.state;
    currentState[key] = value;
    this.setState(currentState);
  }

  initializeHours() {
    const _hours: number[] = [];
    for (var i=0; i<24; i++) {
      _hours.push(i);
    }
    this.changeState('hours', _hours);
  }

  onNextClick() {
    const curr = this.state.selectedMonth;
    this.changeState('selectedMonth', curr + 1);
  }

  onPrevClick() {
    const curr = this.state.selectedMonth;
    this.changeState('selectedMonth', curr - 1);
  }

  getMonthFromId(id: number) {
    switch(id) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
    }
  }

  render() {
    const _selectedCreaturesList: ICreature[] = this.props.creaturesList;
    const _selectedCreatureType: string = this.props.selectedCreatureType;
    const _selectedArea: string = this.props.selectedArea;
    const _selectedMonth: number = this.state.selectedMonth;
    const _hours: number[] = this.state.hours;
    const _areaId: string = this.props.selectedArea === this._NORTHERN ? 'monthsAvailable_northern_int' : 'monthsAvailable_southern_int';
    
    return (
      <div>
        <div className="ac-month-selection-wrapper padded-2y main--flex">
          {_selectedMonth > 1 && 
            <div className="ac-month-left" onClick={this.onPrevClick}>
              <KeyboardArrowLeftIcon />
            </div>
          }
          
          <div className="ac-month-name">{this.getMonthFromId(_selectedMonth)}</div>
          
          {_selectedMonth < 12 && 
            <div className="ac-month-right" onClick={this.onNextClick}>
              <KeyboardArrowRightIcon />
            </div>
          }
        </div>

        <TableContainer className="ac-table-container">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="ac-creature-name">{_selectedCreatureType}</TableCell>
                {_hours.map((h: number) => (
                  <TableCell
                    key={h}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              { _selectedCreaturesList && 
                _selectedCreaturesList.map((c: ICreature) => {
                  return c[_areaId].includes(_selectedMonth) 
                    ? <MonthlyCreatureRow key={c.id} creature={c} area={_selectedArea} />
                    : null
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      
    )
  }
}