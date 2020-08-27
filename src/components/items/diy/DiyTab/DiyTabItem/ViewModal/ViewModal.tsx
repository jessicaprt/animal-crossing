import React from 'react';

import { IItem } from '../../../../IItem';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import './ViewModal.css';

interface IViewModalProps {
  item: IItem;
  closeAction: any;
}

const ItemDetail = ({label, value}) => {
  return <tr>
    <td className="view-modal-col font-color-dark">{label}:</td>
    <td className="view-modal-col font-color-dark">{value}</td>
  </tr>
}

export class ViewModal extends React.Component<IViewModalProps, {}> {
  render() {
    const _item: IItem = this.props.item;

    return(
      <div className="view-modal-container app-modal-container padded-4y padded-2x font-color-dark">
        <div className="app-details-close-button" onClick={this.props.closeAction}>
          <CloseIcon/>
        </div>
        <h2 className="font-color-dark view-modal-title">{_item.name}</h2>
        <div className="view-modal-image-container padded-2y">
          <img src={_item.imageUri} />
        </div>

        <div className="view-modal-details padded-4y padded-2x">
          <table>
            <tbody>
              <ItemDetail label="Sell Price" value={`${_item.sellPrice} Bells`} />
              <ItemDetail label="HHA Concept" value={`${_item.hhaConcept1} ${_item.hhaConcept2}`} />
              {_item.tag && <ItemDetail label="tags" value={_item.tag} />}
            </tbody>
          </table>
        </div>

        <Button className="app-button" variant="contained" disableElevation onClick={this.props.closeAction}>
          <CloseIcon style={{marginRight: '5px'}}/> Close
        </Button>
      </div>
    )
  }
}