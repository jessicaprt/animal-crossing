import React from 'react';

import { CreaturesManager } from './CreaturesManager';
import { Container, Modal, AccordionSummary, Accordion, AccordionDetails, TextField, Chip } from '@material-ui/core';
import './Creatures.css';
import { PageTitle } from '../shared/page-title/PageTitle';

export class Creatures extends CreaturesManager {
  render() {
    return (
      <div className="background-main padded-6y creatures-wrapper">
        <Container>
          <div className="app-title-container">
            <PageTitle pageTitle="Creatures" backLink="/" backLinkDisplay="Home" />
          </div>
        </Container>
      </div>
    );
  }
}