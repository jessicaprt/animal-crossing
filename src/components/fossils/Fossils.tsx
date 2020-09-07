import React from 'react';

import { FossilsManager } from '../../services/FossilsManager';
import { Container, Modal } from '@material-ui/core';
import { PageTitle } from '../shared/page-title/PageTitle';
import { IFossil } from '../../models/IFossils';
import { LoadingState } from '../shared/loading-state/LoadingState';
import { FossilItem } from './FossilItem';
import { FossilsModal } from './FossilsModal';

export class Fossils extends FossilsManager {
  /** if component is mounted */
  private _isMounted: boolean;

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      data: {
        allFossils: [],
        pageLoaded: false,
        currentFossil: null
      }
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    console.log("getting");

    this._getAllFossils().then((fossils: any) => {
      console.log(fossils);
      const _allFossils: IFossil[] = this._renderFossils(fossils);
      
      if (this._isMounted) {
        this._changeState('allFossils', _allFossils);
        this._changeState('pageLoaded', true);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  

  /**
   * opens the modal
   * @param art 
   */
  openModal(fossil: IFossil) {
    this._changeState('isModalOpen', true);
    this._changeState('currentFossil', fossil);
  }

  /**
   * closes the modal
   */
  closeModal() {
    this._changeState('isModalOpen', false);
    this._changeState('currentFossil', null);
  }

  render() {
    const _allFossils: IFossil[] = this.state.data.allFossils;
    const _pageLoaded: boolean = this.state.data.pageLoaded;

    return(
      <div className="background-main padded-6y item-wrapper">
        <Container>
          <div className="main-title-container">
            <PageTitle pageTitle="Fossils" backLink="/" backLinkDisplay="Home" />
          </div>
          
          <div className="padded-2y padded-4x main--section">
            {_pageLoaded 
              ? <div className="main--flex">
                {_allFossils.map((fossil: IFossil) => 
                  <div key={fossil.id} onClick={() => this.openModal(fossil)}>
                    <FossilItem key={fossil.id} fossil={fossil}/>
                  </div>
                )}
              </div>

              : <LoadingState />
            }
          </div>
        </Container>
        <Modal open={this.state.data.isModalOpen} onClose={this.closeModal}>
          <div className="main-modal-wrapper">
            <FossilsModal fossil={this.state.data.currentFossil} closeAction={this.closeModal} />
          </div>
        </Modal>
      </div>
    )
  }
}