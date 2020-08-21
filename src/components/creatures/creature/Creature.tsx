import React from 'react';

import './Creature.css';

import { ICreature } from '../ICreature';
import { CreatureItem } from './creature-item/CreatureItem';
import { Modal } from '@material-ui/core';
import { CreatureDetails } from '../creature-details/CreatureDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface IFishState {
  currentFish: ICreature | null,
  filteredFishes: ICreature[],
  isOpenModal: boolean
}

interface IFishProps {
  fishes: ICreature[]
}

export class Creature extends React.Component<IFishProps, IFishState> {
  constructor(props) {
    super(props);
    this.state = {
      currentFish: null,
      filteredFishes: [],
      isOpenModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this._changeState('filteredFishes', this.props.fishes);
  }

  _changeState(key: string, value: any) {
    let currentState = this.state;
    currentState[key] = value;

    this.setState(currentState);
  }

  openModal(fish: ICreature) {
    this._changeState('isOpenModal', true);
    this._changeState('currentFish', fish);
  }

  closeModal() {
    this._changeState('isOpenModal', false);
    this._changeState('currentFish', null);
  }


  render() {
    const _fishList: ICreature[] = this.state.filteredFishes.length ? this.state.filteredFishes : this.props.fishes;
    return (
      <div className="padded-4x padded-2y">
        {_fishList ? 
          <div className="fishes-container">
            {_fishList.map((fish: ICreature) => 
              <div onClick={() => this.openModal(fish)}>
                <CreatureItem fish={fish} key={fish.id}/> 
              </div>
            )}
          </div> 
          : null
        }

        <Modal open={this.state.isOpenModal} onClose={this.closeModal}>
          <div className="app-modal-wrapper">
            <CreatureDetails fish={this.state.currentFish} closeAction={this.closeModal}/>
          </div>
        </Modal>
      </div>
    )
  }
}