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
  isOpenModal: boolean;
}

const YearlyCreatureCol = ({isAvailable, iconUri, name}) => {
  return (
    <TableCell className={isAvailable ? 'background-green yearly-view-col' : 'ac-empty-background yearly-view-col'}>
      {isAvailable && <img src={iconUri} alt={name}/> }
    </TableCell>
  )
}

export class YearlyCreatureRow extends React.Component<ICreatureRowPops, ICreatureRowState>{
  _NORTHERN = NORTHERN;
  _SOUTHERN = SOUTHERN;

  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  openModal() {
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

  render() {
    const _area: string = this.props.area === this._NORTHERN ? 'monthsAvailable_northern_int' : 'monthsAvailable_southern_int';
    const _creature: ICreature = this.props.creature;
    const _creatureAvailability = _creature[_area];

    return (
        <TableRow hover tabIndex={-1}>
          <TableCell>
            <div className="ac-creature-name" onClick={this.openModal}>{_creature.name}</div>
            <Modal open={this.state.isOpenModal} onClose={this.closeModal}>
              <div className="main-modal-wrapper">
                {this.state.isOpenModal}
                <CreatureDetails creature={_creature} closeAction={this.closeModal}/>
              </div>
            </Modal>
          </TableCell>
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(1)} iconUri={_creature.iconUri} name={_creature.id}></YearlyCreatureCol> }
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(2)} iconUri={_creature.iconUri} name={_creature.id} />}
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(3)} iconUri={_creature.iconUri} name={_creature.id} />}
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(4)} iconUri={_creature.iconUri} name={_creature.id} />}
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(5)} iconUri={_creature.iconUri} name={_creature.id} />}
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(6)} iconUri={_creature.iconUri} name={_creature.id} />}
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(7)} iconUri={_creature.iconUri} name={_creature.id} />}
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(8)} iconUri={_creature.iconUri} name={_creature.id} />}
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(9)} iconUri={_creature.iconUri} name={_creature.id} />}
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(10)} iconUri={_creature.iconUri} name={_creature.id} />}
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(11)} iconUri={_creature.iconUri} name={_creature.id} />}
          {<YearlyCreatureCol isAvailable={_creatureAvailability.includes(12)} iconUri={_creature.iconUri} name={_creature.id} />}
        </TableRow>
    );
  }
}