import React from 'react';

import { ICreature } from '../../models/ICreature';
import { Grid, Chip, Button } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

interface ICreatureDetailsProps {
  fish: ICreature | null;
  closeAction: any
}

const FishDetail = ({label, value}) => {
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
    const _time = this.props.fish?.isAllDay ? 'All Day' : this.props.fish?.timeString;
    const _cjPrice = this.props.fish?.price_cj ? `(CJ - ${this.props.fish?.price_cj} Bells)` : null;
    const _flickPrice = this.props.fish?.price_flick ? `(Flick - ${this.props.fish?.price_flick} Bells)` : null;

    const _extraPrice = (_cjPrice || _flickPrice) ? 
      (this.props.fish?.price_cj ? _cjPrice : _flickPrice) 
      : '';
      
    const _price = `${this.props.fish?.price} Bells ${_extraPrice}`;

    return (
      <div className="main-modal-container padded-4y padded-2x font-color-dark">
        <div className="main-details-close-button" onClick={this.props.closeAction}>
          <CloseIcon/>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} style={{position: "relative"}}>
            <div className="creature-details-image">
              <img src={this.props.fish?.imageUri} alt={this.props.fish?.name} className="creature-details-image-main" />
              <img src={this.props.fish?.imageUri} alt={this.props.fish?.name} className="creature-hidden" />
            </div>
          </Grid>

          <Grid item xs={12} md={8}>
            <table>
              <tbody>
                {this.props.fish?.location ? <FishDetail label="Location" value={this.props.fish?.location} /> : null}
                {this.props.fish?.shadow ? <FishDetail label="Shadow Size" value={this.props.fish?.shadow} /> : null}
                <FishDetail label="Price" value={_price} />
                <FishDetail label="Time" value={_time} />
              </tbody>
            </table>
          </Grid>

          <Grid item xs={12}>
            <div className="creature-details-main padded-2x padded-2y">
              <table>
                <tbody>
                  <FishDetail label="Months (N)" value={<Months month={this.props.fish?.monthsAvailable_northern} chipClass="background-blue font-color-white" />} />
                  <FishDetail label="Months (S)" value={<Months month={this.props.fish?.monthsAvailable_southern} chipClass="background-green font-color-white" />} />
                </tbody>
              </table>
            </div>
            <div className="creature-details-main padded-2x padded-2y">
              <h3>Blather's Note:</h3>
                <p></p>
                <p>"{this.props.fish?.museumInfo}"</p>
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