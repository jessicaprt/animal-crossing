import React from 'react';
import { IItem, IItemGroup } from '../../IItem';
import Pagination from '@material-ui/lab/Pagination';
import { DiyTabItem } from './DiyTabItem/DiyTabItem';

import './DiyTab.css';

interface IDiyTabProps {
  pagedDiyItems: any[];
  allDiyItemsLength: number;
}

interface IDiyTabState{
  currentData: any[];
  currentPage: number;
}

export class DiyTab extends React.Component<IDiyTabProps, IDiyTabState> {
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
      <div className="diy-tab-wrapper padded-4y">
        <p className="font-color-light">showing {_startRange} - {_endRange} of {this.props.allDiyItemsLength}</p>
        
        <div className="diy-tab-container">
          {_data && _data.length ?
            _data.map((itemGroup: IItemGroup) => {
              return <DiyTabItem key={itemGroup.variations[0].name} diyItemGroup={itemGroup}/>
            })

            : 
            ((_pagedData && _pagedData[0]) &&
              _pagedData[0].map((itemGroup: IItemGroup) => {
                return <DiyTabItem key={itemGroup.variations[0].name} diyItemGroup={itemGroup}/>
              }))
          }
        </div>

        <Pagination count={_pagedData.length} onChange={(event,val)=> this.setPage(val)}/>
      </div>
    )
  }
}