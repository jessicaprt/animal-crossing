import React from 'react';

import { IItem, IItemGroup } from '../../../../IItem';
import { Button } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

interface IShoppingColorsModalProps {
  itemGroup: IItemGroup,
  closeAction: any
}

const CustomItem = ({imageUri, label}) => {
  return (
    <div className="item-customize-modal-item padded-1x">
      <div className="item-customize-modal-image">
        <img src={imageUri} alt={label} />
      </div>
      <p>{label}</p>
    </div>
  );
}

export class ShoppingColorsModal extends React.Component<IShoppingColorsModalProps, {}> {
  render() {
    const _itemGroup: IItemGroup = this.props.itemGroup;

    return(
      <div className="item-customize-modal-container app-modal-container padded-4y padded-2x font-color-dark">
        <div className="app-details-close-button" onClick={this.props.closeAction}>
          <CloseIcon/>
        </div>

        <div className="item-customize-modal-main padded-2y">
          {_itemGroup.variations.map((_item: IItem) => <CustomItem imageUri={_item.imageUri} label={_item.variant} />)}
        </div>

        <Button className="app-button" variant="contained" disableElevation onClick={this.props.closeAction}>
          <CloseIcon style={{marginRight: '5px'}}/> Close
        </Button>
      </div>
    )
  }
}