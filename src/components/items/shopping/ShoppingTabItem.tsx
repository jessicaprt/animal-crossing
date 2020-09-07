import React from 'react';

import { IItem, IItemGroup } from '../../../models/IItem';
import { Menu, MenuItem, Modal } from '@material-ui/core';
import { ShoppingViewModal } from './ShoppingViewModal';
import { ShoppingColorsModal } from './ShoppingColorsModal';

import NotificationsIcon from '@material-ui/icons/Notifications';

interface IShoppingTabItemProps {
  shoppingItemGroup: IItemGroup;
}

interface IShoppingTabItemState {
  anchor: any;
  modalViewOpen: boolean;
  modalCustomizeOpen: boolean;
}

export class ShoppingTabItem extends React.Component<IShoppingTabItemProps, IShoppingTabItemState> {
  constructor(props) {
    super(props);

    this.state = {
      anchor: null,
      modalViewOpen: false,
      modalCustomizeOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.openViewModal = this.openViewModal.bind(this);
    this.closeViewModal = this.closeViewModal.bind(this);
    this.closeColorsModal = this.closeColorsModal.bind(this);
    this.viewMenuClicked = this.viewMenuClicked.bind(this);
    this.customizeMenuClicked = this.customizeMenuClicked.bind(this);
  }

  handleClick(event: any) {
    this.changeState('anchor', event.currentTarget);
  }

  handleClose() {
    this.changeState('anchor', null);
  }

  openViewModal() {
    this.changeState('modalViewOpen', true);
  }

  closeViewModal() {
    this.changeState('modalViewOpen', false);
  }

  openCustomizeModal() {
    this.changeState('modalCustomizeOpen', true);
  }

  closeColorsModal() {
    this.changeState('modalCustomizeOpen', false);
  }

  changeState(key: string, value: any) {
    let currentState: IShoppingTabItemState = this.state;
    currentState[key] = value;
    this.setState(currentState);
  } 

  viewMenuClicked() {
    this.openViewModal();
    this.handleClose();
  }

  customizeMenuClicked() {
    this.openCustomizeModal();
    this.handleClose();
  }

  render() {
    const _item: IItem = this.props.shoppingItemGroup.variations[0];
    const _itemGroup: IItemGroup = this.props.shoppingItemGroup;
    const _viewModal: boolean = this.state.modalViewOpen;
    const _customizeModal: boolean = this.state.modalCustomizeOpen;

    return (
      <div className="item-tab-item font-color-dark padded-1y">
        <div onClick={_itemGroup.variations.length > 1 ? this.handleClick : this.viewMenuClicked}>
          <div className="item-tab-image">
            <img src={_item.imageUri} alt={_item.name} />  
          </div>
          <p>{_item.name}</p>
          {_item.buyPrice
            ? <div className="font-color-light item-price-wrapper">
                <p className="item-bells"><NotificationsIcon fontSize="small"/></p>
                <p>{_item.buyPrice}</p>
              </div>
            : <p className="font-color-light">--</p>}
        </div>

        {(this.state && _itemGroup.variations.length > 1)&& <Menu
          id="simple-menu"
          anchorEl={this.state.anchor}
          keepMounted
          open={Boolean(this.state.anchor)}
          onClose={this.handleClose}>
          <MenuItem onClick={this.viewMenuClicked}>View</MenuItem>
          <MenuItem onClick={this.customizeMenuClicked}>Colors</MenuItem>
        </Menu> }

        <Modal open={_viewModal} onClose={this.closeViewModal}>
          <div className="main-modal-wrapper">
            <ShoppingViewModal item={_item} closeAction={this.closeViewModal} />
          </div>
        </Modal>

        <Modal open={_customizeModal} onClose={this.closeColorsModal}>
          <div className="main-modal-wrapper">
            <ShoppingColorsModal itemGroup={_itemGroup} closeAction={this.closeColorsModal} />
          </div>
        </Modal>
      </div>
    )
  }
}