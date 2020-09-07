import React from 'react';

import { IItem, IItemGroup } from '../../../models/IItem';
import { Button } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

interface IFreebiesCustomizeModalProps {
  itemGroup: IItemGroup,
  closeAction: any
}

const CustomItem = ({imageUri, label, pattern}) => {
  return (
    <div className="item-customize-modal-item padded-1x">
      <div className="item-customize-modal-image">
        <img src={imageUri} alt={label} />
      </div>
      <p className="item-customize-modal-text">
        <span>{label}</span>
        {pattern && <span>: {pattern}</span>}
      </p>
    </div>
  );
}

export class FreebiesCustomizeModal extends React.Component<IFreebiesCustomizeModalProps, {}> {
  render() {
    const _itemGroup: IItemGroup = this.props.itemGroup;

    return(
      <div className="item-customize-modal-container main-modal-container padded-4y padded-2x font-color-dark">
        <div className="main-details-close-button" onClick={this.props.closeAction}>
          <CloseIcon/>
        </div>

        <div className="item-customize-modal-main padded-2y">
          {_itemGroup.variations.map((_item: IItem) => 
            <CustomItem key={_item.variant} imageUri={_item.imageUri} label={_item.variant} pattern={_item.pattern} />
          )}
        </div>

        <Button className="main-button" variant="contained" disableElevation onClick={this.props.closeAction}>
          <CloseIcon style={{marginRight: '5px'}}/> Close
        </Button>
      </div>
    )
  }
}