import React from 'react';

import { VillagersManager } from '../../services/VillagersManager'
import { Container, Modal, AccordionSummary, Accordion, AccordionDetails, TextField, Chip } from '@material-ui/core';
import { PageTitle } from '../shared/page-title/PageTitle';
import { IVillager } from '../../models/IVillager';
import { VillagerItem } from './VillagerItem';
import { VillagerFilters } from './VillagerFilters';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

import { VillagerDetails } from './VillagerDetails';
import { IVillageFilters, IVillageFiltersSelection } from '../../models/IVillageFilters';
import { LoadingState } from '../shared/loading-state/LoadingState';

const FilterChip = ({filter, filterLabel}) => {
  if (filter === 'all') {
    return <span></span>;
  } else {
    return <Chip className="villager-chip font--main background-blue" label={`${filterLabel}: ${filter}`} />
  }
}

export class Villagers extends VillagersManager {

  /** if component is mounted */
  private _isMounted: boolean;
  
  constructor(props) {
    super(props);
    this._isMounted = false;

    const _emptyRadioFilters: IVillageFiltersSelection = {
      hobby: 'all',
      gender: 'all',
      personality: 'all',
      species: 'all'
    }

    this.state = {
      data: {
        modalOpen: false,
        currentVillager: null,
        allVillagers: [],
        filteredVillagers: [],
        allPersonalities: [],
        allHobbies: [],
        allGender: [],
        allSpecies: [],
        textFilter: '',
        radioFilters: _emptyRadioFilters,
        pageLoaded: false
      }
    }

    this.openVillagerModal = this.openVillagerModal.bind(this);
    this.closeVillagerModal = this.closeVillagerModal.bind(this);
    this.textSearch = this.textSearch.bind(this);
    this.filterSelectionChange = this.filterSelectionChange.bind(this);
    this.showFilterLabel = this.showFilterLabel.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const _allVillagers: IVillager[] = [];
    const _allPersonalities: string[] = [];
    const _allHobbies: string[] = [];
    const _allGender: string[] = [];
    const _allSpecies: string[] = [];

    this._getAllVillagers().then((villagers: any) => {
      this._isMounted = true;
      villagers.forEach((villager: any) => {
        const _newVillager: IVillager = this._renderVillager(villager)

        _allVillagers.push(_newVillager);

        // set options for filters
        if (!_allPersonalities.includes(_newVillager.personality)) {
          _allPersonalities.push(_newVillager.personality);
        }

        if (!_allHobbies.includes(_newVillager.hobby)) {
          _allHobbies.push(_newVillager.hobby);
        }

        if (!_allGender.includes(_newVillager.gender)) {
          _allGender.push(_newVillager.gender);
        }

        if (!_allSpecies.includes(_newVillager.species)) {
          _allSpecies.push(_newVillager.species);
        }
      });

      if (this._isMounted) {
        this._changeState('allVillagers', _allVillagers);
        this._changeState('filteredVillagers', _allVillagers);
        this._changeState('allPersonalities', _allPersonalities);
        this._changeState('allHobbies', _allHobbies);
        this._changeState('allGender', _allGender);
        this._changeState('allSpecies', _allSpecies);
        this._changeState('pageLoaded', true);
      }
    });
  }

    /**
   * open the modal for villager details
   */
  openVillagerModal(currentVillager: IVillager) {
    const currentState = this.state.data;
    this._changeState('modalOpen', true);
    this._changeState('currentVillager', currentVillager);
  }

  /**
   * close the modal for villager details
   */
  closeVillagerModal() {
    const currentState = this.state.data;
    this._changeState('modalOpen', false);
  }

  /**
   * handles the live search based on the filter input
   * @param searchString
   */
  textSearch(searchString: string) {
    const _search: string = searchString.toLowerCase();

    // return all villagers if search string is empty
    if (_search === '') {
      return [... this.state.data.allVillagers];
    }

    // filter by search string
    const _filtered = this.state.data.allVillagers.filter((villager: IVillager) => 
      villager.name.toLowerCase().indexOf(_search) > -1
    );
    
    return _filtered;
  }

  /**
   * search all radio filters
   * @param _filteredArr
   */
  radioSearch(_filteredArr: IVillager[]) {
    const _filterSelections:IVillageFiltersSelection = this.state.data.radioFilters;

    const _filterByPersonality = this.personalitySearch(_filteredArr, _filterSelections.personality);
    const _filterByHobby = this.hobbySearch(_filterByPersonality, _filterSelections.hobby);
    const _filterByGender = this.genderSearch(_filterByHobby, _filterSelections.gender);
    const _filterBySpecies = this.speciesSearch(_filterByGender, _filterSelections.species);

    return _filterBySpecies;
  }

  /**
   * filter by personality
   * @param _filteredArr 
   * @param selectedPersonality 
   */
  personalitySearch(_filteredArr: IVillager[], selectedPersonality: string) {
    if (selectedPersonality === 'all') {
      return [..._filteredArr];
    }
    return _filteredArr.filter((villager: IVillager) => villager.personality === selectedPersonality);
  }

  /**
   * filter by hobby
   * @param _filteredArr 
   * @param selectedHobby 
   */
  hobbySearch(_filteredArr: IVillager[], selectedHobby: string) {
    if (selectedHobby === 'all') {
      return [..._filteredArr];
    }
    return _filteredArr.filter((villager: IVillager) => villager.hobby === selectedHobby);
  }

  /**
   * filter by gender
   * @param _filteredArr 
   * @param selectedGender 
   */
  genderSearch(_filteredArr: IVillager[], selectedGender: string) {
    if (selectedGender === 'all') {
      return [..._filteredArr];
    }
    return _filteredArr.filter((villager: IVillager) => villager.gender === selectedGender);
  }

  /**
   * filter by species
   * @param _filteredArr 
   * @param selectedSpecies 
   */
  speciesSearch(_filteredArr: IVillager[], selectedSpecies: string) {
    if (selectedSpecies === 'all') {
      return [..._filteredArr];
    }
    return _filteredArr.filter((villager: IVillager) => villager.species === selectedSpecies);
  }


  /**
   * handles change in the text search input
   * @param searchString 
   */
  textSearchChange(searchString: string) {
    this._changeState('textFilter', searchString);
    this.allSearch();
  }

  /**
   * listens to any change in the radio filters
   * @param filtersSelection
   */
  filterSelectionChange(filtersSelection: IVillageFiltersSelection) {
    this._changeState('radioFilters', filtersSelection);
    this.allSearch();
  }

  /**
   * do search (for text search and radio search);
   */
  allSearch() {
    let _filtered;

    // search string
    const _filteredString = this.textSearch(this.state.data.textFilter || '');

    // radio search
    _filtered = this.radioSearch(_filteredString);

    this._changeState('filteredVillagers', _filtered);
  }

  showFilterLabel() {
    const _filters:IVillageFiltersSelection = this.state.data.radioFilters;
    if (!_filters) {
      return false;
    }

    return _filters.gender != 'all' || _filters.hobby != 'all' || _filters.personality != 'all' || _filters.species != 'all';
  }

  render() {
    const _modalOpen = this.state.data.modalOpen != null ? this.state.data.modalOpen : false;
    const _selectedFilter: IVillageFiltersSelection = this.state.data.radioFilters;

    const _availableFilters: IVillageFilters = {
      personalities: this.state.data.allPersonalities,
      hobbies: this.state.data.allHobbies,
      gender: this.state.data.allGender,
      species: this.state.data.allSpecies
    };

    return (
      <div className="background-main padded-6y villagers-wrapper">
        <Container>
          <div className="main-title-container">
            <PageTitle pageTitle="Villagers" backLink="/" backLinkDisplay="Home" />
            <div className="main-search-wrapper">
              <div className="main-search-icon"><SearchIcon fontSize="large" /></div>
              <TextField id="outlined-basic" label="Search Villager" variant="outlined" onChange={event => this.textSearchChange(event.target.value)} /> 
            </div>
          </div>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}>
              <div className="villager-filter-title font-color-dark">
                <h3>Filters</h3>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <VillagerFilters onFilterSelecionChange={this.filterSelectionChange} availableFilters={_availableFilters}/>
            </AccordionDetails>
          </Accordion>
          {
          this.state.data.pageLoaded ?
            <div>
              {
                this.state.data.filteredVillagers &&
                <div>
                  <div className="padded-2y">
                    {this.showFilterLabel() ? <p className="font-color-dark">Filtered by:</p> : null}
                    {_selectedFilter ? <div className="villager-chip-list">
                      <FilterChip filter={_selectedFilter.gender} filterLabel="Gender" />
                      <FilterChip filter={_selectedFilter.hobby} filterLabel="Hobby" />
                      <FilterChip filter={_selectedFilter.personality} filterLabel="Personality" />
                      <FilterChip filter={_selectedFilter.species} filterLabel="Species" />
                    </div> : null}
                  </div>
                  <p className="font-color-dark">Showing {this.state.data.filteredVillagers.length} out of {this.state.data.allVillagers.length}</p>
                  <div className="villagers-container main-section">
                    {this.state.data.filteredVillagers.map(
                      (villager: IVillager) => 
                        <div key={villager.id} onClick={() => {this.openVillagerModal(villager)}}>
                          <VillagerItem villager={villager} />
                        </div>
                      ) 
                    }
                  </div> 
                </div>
              }
            </div>
            : 
            <div className="villagers-container main-section">
              <LoadingState />
            </div> 
            }
        </Container>
        <Modal open={_modalOpen} onClose={this.closeVillagerModal}>
          <div className="main-modal-wrapper">
            <VillagerDetails villager={this.state.data.currentVillager} closeAction={this.closeVillagerModal}/>
          </div>
        </Modal>
      </div>
    );
  }
}