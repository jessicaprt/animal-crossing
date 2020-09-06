import React from 'react';
import './FossilsModal.css';

import { IFossil } from '../IFossils';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface IFossilsModalProps {
  fossil: IFossil;
  closeAction: any;
}

interface IFossilsModalState {
  imageLoaded: boolean;
}

export class FossilsModal extends React.Component<IFossilsModalProps, IFossilsModalState> {
  constructor(props) {
    super(props);

    this.state = {
      imageLoaded: false
    }

    this.onImageLoaded = this.onImageLoaded.bind(this);
  }

  onImageLoaded() {
    this.setState({
      imageLoaded: true
    });
  }

  render() {
    const _fossil: IFossil = this.props.fossil;
    return (
      <div className="main-modal-container padded-4y padded-2x font-color-dark">
        <div className="main-details-close-button" onClick={this.props.closeAction}>
          <CloseIcon/>
        </div>
        <div className="fossils-modal-image-container">
          <img src={_fossil.imageUri} alt={_fossil.id} onLoad={this.onImageLoaded} />
        </div>
        <p className="fossils-modal-name">{_fossil.name}</p>
        <div className="fossils-modal-details-container padded-2y padded-2x">
          <table>
            <tbody>
              <tr>
                <td>Sell Price: </td>
                <td>{_fossil.price} Bells</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="fossils-modal-museum-details-container padded-2y padded-2x">
          <h3>Blather's Note:</h3>
          <p>"{_fossil.museumDescription}"</p>
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