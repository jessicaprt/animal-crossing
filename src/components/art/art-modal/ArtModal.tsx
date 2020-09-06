import React from 'react';
import './ArtModal.css';

import { IArt } from '../IArt';
import { Chip, Button } from '@material-ui/core';
import { Art } from '../Art';
import CloseIcon from '@material-ui/icons/Close';

interface IArtModalProps {
  art: IArt;
  closeAction: any;
}

interface IArtModalState {
  isImageLoaded: boolean;
}

const IArtDetail = ({label, value}) => {
  return (
    <tr>
      <td className="art-detail-col">{label}: </td>
      <td className="art-detail-col">{value}</td>
    </tr>
  )
}

export class ArtModal extends React.Component<IArtModalProps, IArtModalState> {
  constructor(props) {
    super(props);
    this.state = {
      isImageLoaded: false
    };

    this.onImageLoaded = this.onImageLoaded.bind(this);
  }

  onImageLoaded() {
    this.setState({
      isImageLoaded: true
    });
  }

  render() {
    const _art: IArt = this.props.art;
    return (
      <div className="main-modal-container padded-4y padded-2x font-color-dark">
        <div className="main-details-close-button" onClick={this.props.closeAction}>
          <CloseIcon/>
        </div>
        <div className="art-modal-image-container">
          <img src={_art.imageUri} alt={_art.id} onLoad={this.onImageLoaded} />
        </div>
        <div className="art-modal-title-container font-color-dark">
          <div className="art-modal-title">{_art.name}</div>
        </div>
        <div className="art-modal-details-container padded-2y padded-2x">
          {_art.hasFake
            ? <Chip className="app-chip-item" size="small" label="has fake" /> 
            : <Chip className="app-chip-item" size="small" label="always real" />}

          <table>
            <tbody>
              <IArtDetail label="Buy Price" value={`${_art.buyPrice} Bells`} />
              <IArtDetail label="Sell Price" value={`${_art.sellPrice} Bells`} />
              <IArtDetail label="Art Type" value={`${_art.type}`} />
            </tbody>
          </table>
        </div>
        <div className="art-modal-museum-details-container padded-2y padded-2x">
          <h3>Blather's Note:</h3>
          <p>"{_art.museumDescription}"</p>
        </div>

        <div className="padded-2y">
          <Button className="main-button" variant="contained" disableElevation onClick={this.props.closeAction}>
            <CloseIcon style={{marginRight: '5px'}}/> Close
          </Button>
        </div>
      </div>
    );
  }
}