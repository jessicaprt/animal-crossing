import React from 'react';
import { ICreature } from '../../../models/ICreature';
import { NORTHERN, SOUTHERN } from './CreaturesAvailabilityCalendar';
import { TableRow, TableCell, Modal } from '@material-ui/core';
import { CreatureDetails } from '../CreatureDetails';

interface ICreatureRowPops {
  creature: ICreature;
  area: string;
}

interface ICreatureRowState {
  hours: number[];
  isOpenModal: boolean;
}

const MonthlyCreatureCol = ({isAvailable, iconUri, name}) => {
  return (
    <TableCell className={isAvailable ? 'background-green monthly-view-col' : 'ac-empty-background monthly-view-col'}>
      {isAvailable && <img src={iconUri} alt={name}/> }
    </TableCell>
  )
}

export class MonthlyCreatureRow extends React.Component<ICreatureRowPops, ICreatureRowState>{
  _NORTHERN = NORTHERN;
  _SOUTHERN = SOUTHERN;

  constructor(props) {
    super(props);

    this.state = {
      hours: [],
      isOpenModal: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.initializeHours();
  }

  openModal() {
    console.log('open');
    this.changeState('isOpenModal', true);
  }

  closeModal() {
    this.changeState('isOpenModal', false);
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

  render() {
    const _creature: ICreature = this.props.creature;
    const _creatureAvailability = _creature.timeAvailable;
    const _hours: number[] = this.state.hours;

    return (
      <TableRow hover tabIndex={-1}>
        <TableCell className="ac-creature-name">
          <div className="ac-creature-name" onClick={this.openModal}>{_creature.name}</div>
          <Modal open={this.state.isOpenModal} onClose={this.closeModal}>
            <div className="main-modal-wrapper">
              {this.state.isOpenModal}
              <CreatureDetails creature={_creature} closeAction={this.closeModal}/>
            </div>
          </Modal>
        </TableCell>
        {_hours && 
          _hours.map((h:number) => <MonthlyCreatureCol key={h} isAvailable={_creatureAvailability.includes(h)} iconUri={_creature.iconUri} name={_creature.id} />)
        }
      </TableRow>
    );
  }
}