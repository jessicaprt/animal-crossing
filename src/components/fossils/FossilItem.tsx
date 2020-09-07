import React from 'react';

import { IFossil } from '../../models/IFossils';


interface IFossilItemProps {
  fossil: IFossil;
}

interface IFossilItemState {
  imageLoaded: boolean;
  showState: string;
}

export class FossilItem extends React.Component<IFossilItemProps, IFossilItemState> {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      showState: 'hide'
    }

    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  _changeState(key: string, value: any) {
    let currentState = this.state;
    currentState[key] = value;
    this.setState(currentState);
  }

  onImageLoaded() {
    this._changeState('imageLoaded', true);
  }

  onHover() {
    this._changeState('showState', 'show');
  }

  onLeave() {
    this._changeState('showState', 'hide');
  }

  render() {
    const _fossil: IFossil = this.props.fossil;
    const _imageLoaded: boolean = this.state.imageLoaded;

    return (
      <div className="fossil-item-container font-color-dark">
        <div className="fossil-item-image">
          <div className="holder-image">
            <img src="/assets/fossil/fossil-holder.png" alt="holder" />
          </div>
          <div className="fossil-item-image-container">
            <img src={_fossil.imageUri} onLoad={this.onImageLoaded} alt={_fossil.name} onError={this.onImageLoaded}/>
          </div>
        </div>
        <p>{_fossil.name}</p>
      </div>
    )
  }
}