import React from 'react';

import { Container } from '@material-ui/core';
import { PageTitle } from '../../../shared/page-title/PageTitle';
import { FreebiesItemGroup } from '../freebiesItemGroup/FreebiesItemGroup';
import { FreebiesManager, FreebiesSkeleton } from '../FreebiesManager';
import Skeleton from '@material-ui/lab/Skeleton';

export class FreebiesPage extends FreebiesManager {
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
    const _selectedItemData = this.state.data.selectedFreebieItems && this.state.data.selectedFreebieItems;
    const _idLong: string = this.state.data && this.state.data.selectedFreebieItems ? this.state.data.selectedFreebieItems.id_long : '';
    const _freebieId: string = this.state.data.freebieId;
    const _isAll: boolean = _freebieId === 'all';
    const _title: string = _isAll ? 'Freebies and Redemptions' : `Freebies - ${_idLong}`;


    const _backLink: any = {
      link: _isAll ? '/' : '/freebies-redeemable/all',
      display: _isAll ? 'Home' : 'Freebies and Redemptions'
    }

    return (
      <div className="background-main padded-6y item-wrapper">
        <Container>
          {this.state.data.loaded 
            ? <div className="app-title-container">
              <PageTitle pageTitle={_title} backLink={_backLink.link} backLinkDisplay={_backLink.display} />
            </div>
            : <div className="app-title-container">
              <div className="padded-2y">
                <div className="padded-2y">
                  <Skeleton variant="rect" width={200} height={14} />
                </div>
                <Skeleton variant="rect" width={200} height={30} />
              </div>
            </div>
          } 
          <div className="padded-2y padded-4x item-container main-section">
            {this.state.data.loaded 
              ? <FreebiesItemGroup items={_selectedItemData} />
              : <FreebiesSkeleton />
            }
          </div>
        </Container>
      </div>
    )
  }
}