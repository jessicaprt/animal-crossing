import React from 'react';

import { VillagersManager } from './VillagersManager'
import { Container, Modal, AccordionSummary, Accordion, AccordionDetails } from '@material-ui/core';
import { PageTitle } from '../shared/page-title/PageTitle';
import { IVillager } from './IVillager';
import { VillagerItem } from './villager-item/VillagerItem';
import { VillagerFilters } from './villager-filters/VillagerFilters';

import './Villagers.css';
import { VillagerDetails } from './villager-details/VillagerDetails';

export class Villagers extends VillagersManager {

  /** if component is mounted */
  private _isMounted: boolean;
  
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      data: {}
    }

    this.openVillagerModal = this.openVillagerModal.bind(this);
    this.closeVillagerModal = this.closeVillagerModal.bind(this);
  }

  openVillagerModal(currentVillager: IVillager) {
    this.setState({
      data: {
        modalOpen: true,
        currentVillager: currentVillager,
        allVillagers: this.state.data.allVillagers
      }
    });
  }

  closeVillagerModal() {
    this.setState({
      data: {
        modalOpen: false,
        currentVillager: null,
        allVillagers: this.state.data.allVillagers
      }
    });
  }

  componentDidMount() {
    const _allVillagers: IVillager[] = [];
    this._getAllVillagers().then((villagers: any) => {
      this._isMounted = true;
      for (const v in villagers) {
        if (villagers.hasOwnProperty(v)) {
          const _currentVillager = villagers[v];
          const newVillager: IVillager = {
            id: _currentVillager['id'],
            name: _currentVillager['name']['name-USen'],
            personality: _currentVillager['personality'],
            birthday: _currentVillager['birthday-string'],
            species: _currentVillager['species'],
            gender: _currentVillager['gender'],
            hobby: _currentVillager['hobby'],
            catchphrase: _currentVillager['catch-phrase'],
            imageUri: _currentVillager['image_uri'],
            iconUri: _currentVillager['icon_uri'],
            saying: _currentVillager['saying'],
            bubbleColor: _currentVillager['bubble-color'],
            textColor: _currentVillager['text-color']
          }
          _allVillagers.push(newVillager)
        }
      }

      this.setState({
        data: {
          allVillagers: _allVillagers
        }
      });
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const _modalOpen = this.state.data.modalOpen != null ? this.state.data.modalOpen : false;

    return (
      <div className="background-main padded-6y villagers-wrapper">
        <Container>
          <PageTitle pageTitle="Villagers" backLink="/" backLinkDisplay="Home" />
          <Accordion>
            <AccordionSummary>
              <div className="villager-filter-title font-color-dark">
                <h3>Filters</h3>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <VillagerFilters />
            </AccordionDetails>
          </Accordion>
          {
            this.state.data.allVillagers ? 
            <div className="villagers-container">
              {this.state.data.allVillagers.map(
                (villager: IVillager) => 
                  <div key={villager.id} onClick={() => {this.openVillagerModal(villager)}}>
                    <VillagerItem villager={villager} />
                  </div>
                ) 
              }
            </div> 
            : null
          }
        </Container>
        <Modal open={_modalOpen} onClose={this.closeVillagerModal}>
          <div className="villager-modal-wrapper">
            <VillagerDetails villager={this.state.data.currentVillager} closeAction={this.closeVillagerModal}/>
          </div>
        </Modal>
      </div>
    );
  }
}