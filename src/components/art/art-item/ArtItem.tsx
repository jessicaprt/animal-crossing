import React from 'react';
import './ArtItem.css';

import { IArt } from '../IArt';
import { Modal } from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';
import { ArtModal } from '../art-modal/ArtModal';

interface IArtItemProps {
  art: IArt;
}

interface IArtItemState {
  imageLoaded: boolean;
}

export class ArtItem extends React.Component<IArtItemProps, IArtItemState> {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false
    }

    this.onImageLoad = this.onImageLoad.bind(this);
  }

  _changeState(key: string, value: any) {
    let currentState:IArtItemState = this.state;
    currentState[key] = value;
    this.setState(currentState);
  }

  /**
   * handles when images are loaded
   */
  onImageLoad() {
    this._changeState('imageLoaded', true);
  }

  render() {
    const _art = this.props.art;
    const _imageLoaded = this.state.imageLoaded;
    return (
      <div className="art-item-container">
        {!_imageLoaded && 
          <div className="art-item-skeleton">
            <Skeleton variant="rect" width={128} height={128} />
          </div>
        }
        <div className="art-image-container">
          <img src={_art.imageUri}  alt={_art.id} onLoad={this.onImageLoad} />
        </div>
        <p className="font-color-dark">{_art.name}</p>
      </div>
    )
  }
}