import React from 'react';

import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

import { IFreebieGroup } from '../../IItem';
import { Link } from "react-router-dom"; 
import { PageTitle } from '../../../shared/page-title/PageTitle';
import { Container } from '@material-ui/core';
import { FreebiesManager, FreebiesSkeleton } from '../FreebiesManager';
import { LoadingState } from '../../../shared/loading-state/LoadingState';

export class FreebiesAll extends FreebiesManager {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        freebieId: this.props.match.params.freebie_id,
        selectedFreebieItems: [],
        allItems: [],
        allFreebies: {},
        loaded: false
      }
    }
  }

  render() {
    const _allItems = this.state.data.allItems;
    return (
      <div className="background-main padded-6y item-wrapper">
        <Container>
          <div className="main-title-container">
            <PageTitle pageTitle="Freebies and Redemptions" backLink="/" backLinkDisplay="Home" />
          </div>
          
          <div className="padded-2y padded-4x item-container main-section">
            {this.state.data.loaded ?
              <div className="freebies-all-wrapper padded-4y padded-2x">
                { _allItems && 
                  _allItems.map((freebieGroup: IFreebieGroup) => {
                    return (
                      <Link to={`../freebies/${freebieGroup.id_short}`} key={freebieGroup.id_short}>
                        <div className="freebies-all-item padded-2x padded-2y font-color-dark">
                          <p><CardGiftcardIcon/></p>
                          <p>{freebieGroup.id_long}</p>
                        </div>
                      </Link>
                    )
                  })
                }
              </div>
              : <LoadingState />
            }
          </div>
        </Container>
      </div>
    );
  }
}