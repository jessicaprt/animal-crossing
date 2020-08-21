import React from 'react';
import '../Creature.css';
import { ICreature } from '../../ICreature';

interface IFishProps {
  fish: ICreature
}

export class CreatureItem extends React.Component<IFishProps, {}> {
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
          <img src={this.props.fish.iconUri} alt={this.props.fish.name}/>
        </div>
        <h3 className="fish-item-name font-color-dark">
          {this.props.fish.name}
        </h3>
      </div>
    );
  }
}