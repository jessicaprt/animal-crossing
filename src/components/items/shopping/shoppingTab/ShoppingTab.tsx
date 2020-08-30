import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

import { IItemGroup, IItem } from '../../IItem';
import { ShoppingTabItem } from './shoppingTabItem/ShoppingTabItem';

interface IShoppingTabProps {
  title: string;
  pagedDiyItems: any[];
  allDiyItemsLength: number;
}

interface IShoppingTabState{
  currentData: any[];
  currentPage: number;
}

export class ShoppingTab extends React.Component<IShoppingTabProps, IShoppingTabState> {
  constructor(props) {
    super(props);

    this.state = {
      currentData: [],
      currentPage: 1
    }

    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    if (this.props.pagedDiyItems.length) {
      this.changeCurrentData(this.props.pagedDiyItems[0]);
    }
  }

  changeCurrentData(data: IItem[]) {
    this.changeState('currentData', data);
  }

  changeState(key: string, value: any) {
    let currentState = this.state;
    currentState[key] = value;

    this.setState(currentState);
  }

  setPage(val) {
    console.log(val);
    this.changeCurrentData(this.props.pagedDiyItems[val-1]);
    this.changeState('currentPage', val)
  }

  render() {
    const _i = this.state.currentPage;
    const _data = this.state.currentData;
    const _pagedData = this.props.pagedDiyItems;

    const _startRange = _pagedData ? ((_i-1)*100)+1 : 0;
    const _endRange = _pagedData && _pagedData[_i-1] ? ((_i-1)*100) + _pagedData[_i-1].length : 0;

    return (
      <div className="item-tab-wrapper padded-4y">
        <h1 className="font-color-dark">{this.props.title}</h1>
        <p className="font-color-light">showing {_startRange} - {_endRange} of {this.props.allDiyItemsLength} {this.props.title} Items</p>
        
        <div className="item-tab-container">
          {_data && _data.length ?
            _data.map((itemGroup: IItemGroup) => {
              return <ShoppingTabItem key={itemGroup.variations[0].name} shoppingItemGroup={itemGroup}/>
            })

            : 
            ((_pagedData && _pagedData[0]) &&
              _pagedData[0].map((itemGroup: IItemGroup) => {
                return <ShoppingTabItem key={itemGroup.variations[0].name} shoppingItemGroup={itemGroup}/>
              }))
          }
        </div>

        <Pagination count={_pagedData.length} onChange={(event,val)=> this.setPage(val)}/>
      </div>
    )
  }
}