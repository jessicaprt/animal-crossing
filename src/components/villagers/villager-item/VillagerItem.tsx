import React from 'react';
import './VillagerItem.css';
import { IVillager } from '../IVillager';

export class VillagerItem extends React.Component<{villager: IVillager}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const _currentVillager: IVillager = this.props.villager;
    return(
      <div className="villager-item-container padded-1x padded-1y">
        <div className="villager-item-image" style={{borderColor: _currentVillager.bubbleColor}}>
          <img src={_currentVillager.iconUri} />
        </div>
        <h3 className="villager-item-name font-color-dark">{_currentVillager.name}</h3>
      </div>
    )
  }
}