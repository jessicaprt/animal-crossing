import React from 'react';
import { IItem, IItemGroup } from '../../IItem';
import Pagination from '@material-ui/lab/Pagination';
import { DiyTabItem } from './DiyTabItem/DiyTabItem';

import './DiyTab.css';

interface IDiyTabProps {
  allDiyItems: any[]
}

interface IDiyTabState{
  currentData: any[]
}

export class DiyTab extends React.Component<IDiyTabProps, IDiyTabState> {
  constructor(props) {
    super(props);

    this.state = {
      currentData: []
    }

    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    if (this.props.allDiyItems.length) {
      this.changeCurrentData(this.props.allDiyItems[0]);
    }
  }

  changeCurrentData(data: IItem[]) {
    this.setState({
      currentData: data
    });
  }

  setPage(val) {
    console.log(val);
    this.changeCurrentData(this.props.allDiyItems[val-1]);
  }

  render() {
    return (
      <div className="diy-tab-wrapper padded-4y">
        <Pagination count={this.props.allDiyItems.length} onChange={(event,val)=> this.setPage(val)}/>
        
        <div className="diy-tab-container">
          {this.state.currentData && this.state.currentData.length ?
            this.state.currentData.map((itemGroup: IItemGroup) => {
              return <DiyTabItem key={itemGroup.variations[0].name} diyItemGroup={itemGroup}/>
            })

            : 
            (this.props.allDiyItems && this.props.allDiyItems[0] ?
              this.props.allDiyItems[0].map((itemGroup: IItemGroup) => {
                return <DiyTabItem key={itemGroup.variations[0].name} diyItemGroup={itemGroup}/>
              })
              : null
            )
          }
        </div>
      </div>
    )
  }
}