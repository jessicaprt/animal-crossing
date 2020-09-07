import React from 'react';
import Grid from '@material-ui/core/Grid';

import { IHomepageItem } from '../../models/IHomepageItem';
import { Link } from 'react-router-dom'; 

export class HomepageIcon extends React.Component<{homepageItem: IHomepageItem}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid item xs={4}>  
        <Link to={this.props.homepageItem.link}>
          <div className="homepage-item-container padded-1y">
            <div className="homepage-item">
              <div className="homepage-item-image">
                <img src={`assets/homepage_icons/${this.props.homepageItem.imageUrl}`} alt={this.props.homepageItem.id}/>
              </div>
              <h2 className="font-color-dark homage-item-name">{this.props.homepageItem.name}</h2>
            </div>
          </div>
        </Link>
      </Grid>
    );
  }
}
