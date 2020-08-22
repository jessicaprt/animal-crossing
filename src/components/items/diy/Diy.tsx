import React from 'react';
import { ItemsManager } from '../ItemsManager';

import { Container, Modal, AccordionSummary, Accordion, AccordionDetails, TextField, Chip } from '@material-ui/core';
import { PageTitle } from '../../shared/page-title/PageTitle';

import './Diy.css';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

export class Diy extends ItemsManager {
  render() {
    return (
      <div className="background-main padded-6y diy-wrapper">
        <Container>
          <div className="app-title-container">
            <PageTitle pageTitle="DIY Items" backLink="/" backLinkDisplay="Home" />
            <div className="app-search-wrapper">
              {/* <div className="app-search-icon"><SearchIcon fontSize="large" /></div>
              <TextField id="outlined-basic" label="Search Villager" variant="outlined" onChange={event => this.textSearchChange(event.target.value)} />  */}
            </div>
          </div>
        </Container>
      </div>
    )
  }
}