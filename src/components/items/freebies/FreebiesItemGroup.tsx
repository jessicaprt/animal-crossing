import React from 'react';

import { IFreebieGroup, IItemGroup } from '../../../models/IItem';
import { FreebiesItem } from './FreebiesItem';

interface IFreebieItemProps {
  items: IFreebieGroup;
}

interface IFreebieItemState {
  anchor: any;
  modalViewOpen: boolean;
  modalCustomizeOpen: boolean;
}

export class FreebiesItemGroup extends React.Component<IFreebieItemProps, IFreebieItemState> {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="main--flex">
      {this.props.items && this.props.items.data &&
        this.props.items.data.map((item: IItemGroup) => 
          <FreebiesItem key={`${item.variations[0].variant}-${item.variations[0].name}`} diyItemGroup={item} />)
      }
    </div>
  }
}