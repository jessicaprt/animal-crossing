import React from 'react';

import { IItem } from '../../../models/IItem';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface IViewModalProps {
  item: IItem;
  closeAction: any;
}

const ItemDetail = ({label, value}) => {
  return <tr>
    <td className="item-view-modal-col font-color-dark">{label}:</td>
    <td className="item-view-modal-col font-color-dark">{value}</td>
  </tr>
}

export class DiyViewModal extends React.Component<IViewModalProps, {}> {
  render() {
    const _item: IItem = this.props.item;
    const _hha1: string = _item.hhaConcept1;
    const _hha2: string = _item.hhaConcept2 ? `, ${_item.hhaConcept2}` : '';

    return(
      <div className="item-view-modal-container main-modal-container padded-4y padded-2x font-color-dark">
        <div className="main-details-close-button" onClick={this.props.closeAction}>
          <CloseIcon/>
        </div>
        <h2 className="font-color-dark item-view-modal-title">{_item.name}</h2>
        <div className="item-view-modal-image-container padded-2y">
          <img src={_item.imageUri} />
        </div>

        <div className="item-view-modal-details padded-4y padded-2x">
          <table>
            <tbody>
              <ItemDetail label="Sell Price" value={`${_item.sellPrice} Bells`} />
              <ItemDetail label="HHA Concept" value={`${_hha1}${_hha2}`} />
              {_item.tag && <ItemDetail label="tags" value={_item.tag} />}
            </tbody>
          </table>
        </div>

        <Button className="main-button" variant="contained" disableElevation onClick={this.props.closeAction}>
          <CloseIcon style={{marginRight: '5px'}}/> Close
        </Button>
      </div>
    )
  }
}