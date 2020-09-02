import React from 'react';

import './Creature.css';

import { ICreature } from '../ICreature';
import { CreatureItem } from './creature-item/CreatureItem';
import { Modal } from '@material-ui/core';
import { CreatureDetails } from '../creature-details/CreatureDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface IFishState {
  currentCreature: ICreature | null,
  filteredCreatures: ICreature[],
  isOpenModal: boolean
}

interface IFishProps {
  fishes: ICreature[]
}

export class Creature extends React.Component<IFishProps, IFishState> {
  constructor(props) {
    super(props);
    this.state = {
      currentCreature: null,
      filteredCreatures: [],
      isOpenModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this._changeState('filteredCreatures', this.props.fishes);
  }

  _changeState(key: string, value: any) {
    let currentState = this.state;
    currentState[key] = value;

    this.setState(currentState);
  }

  openModal(fish: ICreature) {
    this._changeState('isOpenModal', true);
    this._changeState('currentCreature', fish);
  }

  closeModal() {
    this._changeState('isOpenModal', false);
    this._changeState('currentCreature', null);
  }


  render() {
    const _fishList: ICreature[] = this.state.filteredCreatures.length ? this.state.filteredCreatures : this.props.fishes;
    return (
      <div className="padded-4x padded-2y">
        {_fishList ? 
          <div className="main--flex">
            {_fishList.map((creature: ICreature) => 
              <div key={creature.id} onClick={() => this.openModal(creature)}>
                <CreatureItem creature={creature} key={creature.id}/> 
              </div>
            )}
          </div> 
          : null
        }

        <Modal open={this.state.isOpenModal} onClose={this.closeModal}>
          <div className="main-modal-wrapper">
            <CreatureDetails fish={this.state.currentCreature} closeAction={this.closeModal}/>
          </div>
        </Modal>
      </div>
    )
  }
}