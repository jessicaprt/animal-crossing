import React from 'react';

import { Grid, AccordionSummary, Accordion, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { IMusic } from '../IMusic';
import './SongItem.css';

export class SongItem extends React.Component<{song: IMusic}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="song-item-container">
        {this.props.song ? 
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span className="font-color-dark">{this.props.song.name}</span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="song-item-details">
                <div className="song-item-image">
                  <img src={this.props.song.imageUri} />
                </div>
                <div className="song-item-audio padded-1y">
                  <audio controls>
                    <source src={this.props.song.musicUri} type="audio/mpeg" />
                  </audio>
                </div>
              </div>
            </AccordionDetails>
          </Accordion> 
        : null}
      </div>
    );
  }
}