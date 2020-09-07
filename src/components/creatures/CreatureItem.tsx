import React from 'react';
import { ICreature } from '../../models/ICreature';

interface ICreatureProps {
  creature: ICreature
}

export class CreatureItem extends React.Component<ICreatureProps, {}> {
  constructor(props) {
    super(props);
  }

  _changeState(key: string, value: any) {
    let currentState = this.state;
    currentState[key] = value;

    this.setState(currentState);
  }

  render() {
    return (
      <div className="fish-item">
        <div className="fish-item-image">
          <img src={this.props.creature.iconUri} alt={this.props.creature.name}/>
        </div>
        <h3 className="fish-item-name font-color-dark">
          {this.props.creature.name}
        </h3>
      </div>
    );
  }
}