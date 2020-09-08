import React from 'react';

import { ICreature } from '../../models/ICreature';
import { Grid, Chip, Button } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

interface ICreatureDetailsProps {
  creature: ICreature | null;
  closeAction: any
}

const CreatureDetail = ({label, value}) => {
  return (
    <tr>
      <td className="creature-detail-col">{label}: </td>
      <td className="creature-detail-col">{value}</td>
    </tr>
  );
};

const Months = ({month, chipClass}) => {
  const monthsArr: string[] = month;
  return (
    <div>
      {monthsArr.map((mo: string) => <Chip className={`creature-detail-chip ${chipClass}`} key={mo} label={mo} /> )} 
    </div>
  )
}

export class CreatureDetails extends React.Component<ICreatureDetailsProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const _time = this.props.creature?.isAllDay ? 'All Day' : this.props.creature?.timeString;
    const _cjPrice = this.props.creature?.price_cj ? `(CJ - ${this.props.creature?.price_cj} Bells)` : null;
    const _flickPrice = this.props.creature?.price_flick ? `(Flick - ${this.props.creature?.price_flick} Bells)` : null;

    const _extraPrice = (_cjPrice || _flickPrice) ? 
      (this.props.creature?.price_cj ? _cjPrice : _flickPrice) 
      : '';
      
    const _price = `${this.props.creature?.price} Bells ${_extraPrice}`;

    return (
      <div className="main-modal-container padded-4y padded-2x font-color-dark">
        <div className="main-details-close-button" onClick={this.props.closeAction}>
          <CloseIcon/>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} style={{position: "relative"}}>
            <div className="creature-details-image">
              <img src={this.props.creature?.imageUri} alt={this.props.creature?.name} className="creature-details-image-main" />
              <img src={this.props.creature?.imageUri} alt={this.props.creature?.name} className="creature-hidden" />
            </div>
          </Grid>

          <Grid item xs={12} md={8}>
            <h3>{this.props.creature?.name}</h3>
            <table>
              <tbody>
                {this.props.creature?.location ? <CreatureDetail label="Location" value={this.props.creature?.location} /> : null}
                {this.props.creature?.shadow ? <CreatureDetail label="Shadow Size" value={this.props.creature?.shadow} /> : null}
                <CreatureDetail label="Price" value={_price} />
                <CreatureDetail label="Time" value={_time} />
              </tbody>
            </table>
          </Grid>

          <Grid item xs={12}>
            <div className="creature-details-main padded-2x padded-2y">
              <table>
                <tbody>
                  <CreatureDetail label="Months (N)" value={<Months month={this.props.creature?.monthsAvailable_northern} chipClass="background-blue font-color-white" />} />
                  <CreatureDetail label="Months (S)" value={<Months month={this.props.creature?.monthsAvailable_southern} chipClass="background-green font-color-white" />} />
                </tbody>
              </table>
            </div>
            <div className="creature-details-main padded-2x padded-2y">
              <h3>Blather's Note:</h3>
                <p></p>
                <p>"{this.props.creature?.museumInfo}"</p>
            </div>
          </Grid>
        </Grid>

        <div className="creature-details-main padded-2y">
          <Button className="main-button" variant="contained" disableElevation onClick={this.props.closeAction}>
            <CloseIcon style={{marginRight: '5px'}}/> Close
          </Button>
        </div>
      </div>
    )
  }
}