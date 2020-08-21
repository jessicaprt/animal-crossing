import React from 'react';

import { IVillager } from '../IVillager';
import { Grid, Chip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import './VillagerDetails.css';

const VillagerSubDetail = ({label, text}) => {
  return (
    <tr>
      <td className="villager-details-sub-detail"><h3>{label}:</h3></td>
      <td className="villager-details-sub-detail"><h3>{text}</h3></td>
    </tr>
  );
};

export class VillagerDetails extends React.Component<{villager: IVillager, closeAction: any}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const _villager: IVillager = this.props.villager;

    return (
      <div className="villager-details-container padded-4y padded-2x font-color-dark">
        <div className="villager-detailsclose-button" onClick={this.props.closeAction}>
          <CloseIcon/>
        </div>
        <div className="padded-2y">
          <Grid container spacing={2} >
            <Grid item xs={12} md={6}>
              <div className="villager-details-image">
                <img src={_villager.imageUri} />
                <h3 className="villager-details-saying">"{_villager.saying}"</h3>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="villager-details-main padded-2x">
                <h1>{ _villager.name }</h1>
                <Chip label={_villager.personality} className="font--main villager-details-chip" 
                  style={{backgroundColor: (_villager.bubbleColor == '#ffffff' ? '#eeeeee' : _villager.bubbleColor) , color: _villager.textColor}} />
              </div>
              <div className="villager-details-sub padded-2x">
                <h3>Birthday: {_villager.birthday}</h3>
                <h3>Species: {_villager.species} </h3>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="padded-1y">
          <div className="villager-details-line background-dark"></div>
        </div>

        <div className="padded-1y padded-2x">
          <table>
            <tbody>
              <VillagerSubDetail label="Gender" text={_villager.gender} />
              <VillagerSubDetail label="Catchphrase" text={`"${_villager.catchphrase}"`}/>
              <VillagerSubDetail label="Hobby" text={_villager.hobby} />
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}