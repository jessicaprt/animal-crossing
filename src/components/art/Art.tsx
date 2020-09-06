import React from 'react';
import './Art.css';

import { ArtManager } from './ArtManager';
import { Container, Modal } from '@material-ui/core';
import { PageTitle } from '../shared/page-title/PageTitle';
import { IArt } from './IArt';
import { ArtItem } from './art-item/ArtItem';
import { ArtModal } from './art-modal/ArtModal';

export class Art extends ArtManager {
  PAINTING = 'painting';
  STATUE = 'statue';

  constructor(props) {
    super(props);

    this.state = {
      data: {
        allPaintings: [],
        allStatues: [],
        isModalOpen: false,
        currentArt: null
      }
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this._getAllArt().then((artItems: any) => {
      this.renderArtItems(artItems);
    });
  }

    /**
   * opens the modal
   * @param art 
   */
  openModal(art: IArt) {
    console.log('opening');
    this._changeState('isModalOpen', true);
    this._changeState('currentArt', art);
    console.log(this.state.data.isModalOpen);
  }

  /**
   * closes the modal
   */
  closeModal() {
    console.log('closing');
    this._changeState('isModalOpen', false);
    this._changeState('currentArt', null);
    console.log(this.state.data.isModalOpen);
  }

  /**
   * checks if the art item is a painting
   */
  isPainting(name: string) {
    return name.includes('painting');
  }
 
  /**
   * setup the object list needed by the view
   * @param artItems
   */
  renderArtItems(artItems: any) {
    const _allPaintings: IArt[] = [];
    const _allStatues: IArt[] = [];
    artItems.forEach((art: any) => {
      const _newArt: IArt = {
        id: art['file-name'],
        name: art['name']['name-USen'],
        hasFake: art['hasFake'],
        buyPrice: art['buy-price'],
        sellPrice: art['sell-price'],
        imageUri: art['image_uri'],
        museumDescription: art['museum-desc'],
        type: this.isPainting(art['file-name']) ? this.PAINTING : this.STATUE
      }

      if (_newArt.type === this.PAINTING) {
        _allPaintings.push(_newArt);
      } else {
        _allStatues.push(_newArt);
      }

    });

    this._changeState('allPaintings', _allPaintings);
    this._changeState('allStatues', _allStatues);
  }

  render() {
    const _allPaintings: IArt[] = this.state.data.allPaintings;
    const _allStatues: IArt[] = this.state.data.allStatues;

    return(
      <div className="background-main padded-6y item-wrapper">
        <Container>
          <div className="main-title-container">
            <PageTitle pageTitle="Art" backLink="/" backLinkDisplay="Home" />
          </div>
          
          <div className="padded-2y padded-4x item-container main-section ">
            <h1 className="font-color-dark art-section-title">Paintings</h1>
            <div className="main--flex">
              {_allPaintings &&
                _allPaintings.map((art: IArt) => {
                  return (
                    <div key={art.id} onClick={() => this.openModal(art)}>
                      <ArtItem art={art}/>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className="padded-2y padded-4x item-container main-section ">
            <h1 className="font-color-dark art-section-title">Statues</h1>
            <div className="main--flex">
              {_allStatues &&
                _allStatues.map((art: IArt) => {
                  return (
                    <div key={art.id} onClick={() => this.openModal(art)}>
                      <ArtItem art={art}/>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </Container>


        <Modal open={this.state.data.isModalOpen} onClose={this.closeModal}>
          <div className="main-modal-wrapper">
            <ArtModal art={this.state.data.currentArt} closeAction={this.closeModal} />
          </div>
        </Modal>
      </div>
    )
  }
}