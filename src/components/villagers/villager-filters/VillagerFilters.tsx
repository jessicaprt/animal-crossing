import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import './VillagerFilters.css';

export class VillagerFilters extends React.Component {
  render() {
    return (
      <div className="padded-4x">
        <div className="villager-filters-search-wrapper">
          <div className="villager-filters-search-icon"><SearchIcon fontSize="large" /></div>
          <TextField id="outlined-basic" label="Search Villager" variant="outlined" /> 
        </div>
      </div>
    )
  }
}