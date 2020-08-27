import React from 'react';

import './CustomizeModal.css';

import { IItem, IItemGroup } from '../../../../IItem';
import { Button } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

interface ICustomizeModalProps {
  itemGroup: IItemGroup,
  closeAction: any
}

const CustomItem = ({imageUri, label}) => {
  return (
    <div className="customize-modal-item padded-1x">
      <div className="customize-modal-image">
        <img src={imageUri} alt={label} />
      </div>
      <p>{label}</p>
    </div>
  );
}

export class CustomizeModal extends React.Component<ICustomizeModalProps, {}> {
  render() {
    const _itemGroup: IItemGroup = this.props.itemGroup;

    return(
      <div className="customize-modal-container app-modal-container padded-4y padded-2x font-color-dark">
        <div className="app-details-close-button" onClick={this.props.closeAction}>
          <CloseIcon/>
        </div>

        <div className="customize-modal-main padded-2y">
          {_itemGroup.variations.map((_item: IItem) => <CustomItem imageUri={_item.imageUri} label={_item.variant} />)}
        </div>

        <Button className="app-button" variant="contained" disableElevation onClick={this.props.closeAction}>
          <CloseIcon style={{marginRight: '5px'}}/> Close
        </Button>
      </div>
    )
  }
}