import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import './VillagerFilters.css';
import { Grid, FormLabel, FormGroup, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { IVillageFilters, IVillageFiltersSelection } from './IVillageFilters';

interface IVillagerFiltersProps {
  onFilterSelecionChange(filters: IVillageFiltersSelection): void, 
  availableFilters: IVillageFilters 
}

const DefaultSelectionElement = ({key}) => {
  return <FormControlLabel
    key='gender-all'
    value={DEFAULT_SELECTION}
    control={<Radio />}
    label={DEFAULT_SELECTION}
  />
};

const FilterGroup = ({groupName, optionsArr, state, changeFn}) => {
  return (
    <FormControl>
      <FormLabel component="legend">{groupName}</FormLabel>
      <RadioGroup aria-label="gender" name="gender" value={state} onChange={changeFn}>
        <FormGroup className="filter-form-group padded-2x font--main">
          <DefaultSelectionElement key='gender-all' />
          {optionsArr.map((optionsArr:string) => 
            <FormControlLabel
              key={optionsArr}
              value={optionsArr}
              control={<Radio />}
              label={optionsArr}
          />)}
        </FormGroup>
      </RadioGroup>
    </FormControl>
  )
};

const DEFAULT_SELECTION = 'all';

export class VillagerFilters extends React.Component<IVillagerFiltersProps, IVillageFiltersSelection> {
  constructor(props) {
    super(props);
    this.state = {
      gender: DEFAULT_SELECTION,
      hobby: DEFAULT_SELECTION,
      species: DEFAULT_SELECTION,
      personality: DEFAULT_SELECTION
    }

    this.genderSelectionChange = this.genderSelectionChange.bind(this);
    this.hobbiesSelectionChange = this.hobbiesSelectionChange.bind(this);
    this.personalitiesSelectionChange = this.personalitiesSelectionChange.bind(this);
    this.speciesSelectionChange = this.speciesSelectionChange.bind(this);
  }

  /**
   * when a gender filter is selected
   * @param event
   */
  genderSelectionChange(event) {
    this.changeState('gender', event.target.value);
  }

  /**
   * when a hobbies filter is selected
   * @param event
   */
  hobbiesSelectionChange(event) {
    this.changeState('hobby', event.target.value);
  }

  /**
   * when a personalities filter is selected
   * @param event
   */
  personalitiesSelectionChange(event) {
    this.changeState('personality', event.target.value);
  }

  /**
   * when a species filter is selected
   * @param event
   */
  speciesSelectionChange(event) {
    this.changeState('species', event.target.value);
  }


  /**
   * change a state value
   * @param key
   * @param value 
   */
  changeState(key: string, value: string) {
    let _currentState = this.state;
    _currentState[key] = value;

    this.setState(_currentState);
    this.props.onFilterSelecionChange(this.state);
  }

  render() {
    const _personalities: string[] = this.props.availableFilters.personalities;
    const _hobbies: string[] = this.props.availableFilters.hobbies;
    const _gender: string[] = this.props.availableFilters.gender;
    const _species: string[] = this.props.availableFilters.species;

    return (
      <div className="padded-4x">
        <Grid container spacing={4}>
          
          <Grid item xs={12} md={4}>
            <FilterGroup groupName='Gender' optionsArr={_gender} state={this.state.gender} changeFn={this.genderSelectionChange} />
          </Grid>

          <Grid item xs={12} md={4}>
            <FilterGroup groupName='Hobby' optionsArr={_hobbies} state={this.state.hobby} changeFn={this.hobbiesSelectionChange} />
          </Grid>

          <Grid item xs={12} md={4}>
            <FilterGroup groupName='Personality' optionsArr={_personalities} state={this.state.personality} changeFn={this.personalitiesSelectionChange} />
          </Grid>

          <Grid item xs={12} md={12}>
            <FilterGroup groupName='Species' optionsArr={_species} state={this.state.species} changeFn={this.speciesSelectionChange} />
          </Grid>
        </Grid>
      </div>
    );
  }
}