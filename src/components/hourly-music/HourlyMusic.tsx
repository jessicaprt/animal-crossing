import React from 'react';
import './HourlyMusic.css'

import { HourlyMusicManager } from '../../services/HourlyMusicManager';
import { IHourlyMusic, IWeatherMusic } from '../../models/IHourlyMusic';
import { Container, Grid, Button } from '@material-ui/core';
import { PageTitle } from '../shared/page-title/PageTitle';

import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import CloudIcon from '@material-ui/icons/Cloud';
import AcUnitIcon from '@material-ui/icons/AcUnit';

export class HourlyMusic extends HourlyMusicManager {
  /** is mounted */
  _isMounted: boolean;

  /** audio ref */
  audioRef: React.RefObject<any>;

  /** constants */
  HOURS = [1,2,3,4,5,6,7,8,9,10,11,12];
  AM = 'AM';
  PM = 'PM';
  SUNNY = 'Sunny';
  RAINY = 'Rainy';
  SNOWY = 'Snowy';


  constructor(props) {
    super(props);

    this.state = {
      data: {
        allHourlyMusic: [],
        allWeatherOptions: [],
        circleOpen: false,
        styles: [],
        hourSelected: null,
        meridiemSelected: this.AM,
        weatherSelected: null,
        selectedMusicUri: null
      }
    }

    this.audioRef = React.createRef();
    this._isMounted = false;

    this.onHourSelected = this.onHourSelected.bind(this);
    this.onMeridiemSelected = this.onMeridiemSelected.bind(this);
    this.getButtonIcon = this.getButtonIcon.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this._getAllMusic().then((music: any) => {
      const _allHourlyMusic: IHourlyMusic[] = this._renderItems(music);

      if (this._isMounted) {
        this._changeState('allHourlyMusic', _allHourlyMusic);
        this.onTimeChanged();
        this.onSelectionChange();
      }

    });

    this.setHoursStyle();
    this.setCurrentDefaultHour();
  }

  /**
   * sets the Hours selection style
   */
  setHoursStyle() {
    const _allStyles: any[] = [];
    const _numHours = this.HOURS.length;

    this.HOURS.forEach(hour => {
      const _newStyle = {
        top: (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/_numHours)*hour*Math.PI)).toFixed(4) + "%",
        left: (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/_numHours)*hour*Math.PI)).toFixed(4) + "%"
      }
      _allStyles.push(_newStyle);
    });

    if (this._isMounted) {
      this._changeState('styles', _allStyles);
    }
  }

  /**
   * sets the default hour from the current time
   */
  setCurrentDefaultHour() {
    const _now = new Date();
    const _hour = _now.getHours() > 12 ? _now.getHours() - 12 : (_now.getHours() > 0 ? _now.getHours() : 12);
    const _meridiem = _now.getHours() >= 12 ? this.PM : this.AM;
    this._changeState('hourSelected', _hour);
    this._changeState('meridiemSelected', _meridiem);
    this.onTimeChanged();
  }


  /**
   * sets the selected hour
   * @param hour
   */
  onHourSelected(hour: number) {
    this._changeState('hourSelected', hour);
    this.onTimeChanged();
    this.onSelectionChange();
  } 

  /**
   * handles meridiem (AM/PM) button selection
   * @param selection 
   */
  onMeridiemSelected(selection: string) {
    this._changeState('meridiemSelected', selection);
    this.onTimeChanged();
    this.onSelectionChange();
  }

  /**
   * handles the weather button selection
   * @param weather 
   */
  onWeatherSelected(weather: string) {
    this._changeState('weatherSelected', weather);
    this.onSelectionChange();
  }

  
  /**
   * if time/hour has been changed
   */
  onTimeChanged(): void {
    const _hourSelected: number = this.state.data.hourSelected;
    const _meridiemSelected: string = this.state.data.meridiemSelected;
    const _allHourlyMusic: IHourlyMusic[] = this.state.data.allHourlyMusic;

    if (!_allHourlyMusic.length) {
      return;
    }

    if (_hourSelected != null && _meridiemSelected != null) {
      const _currentTime: number = this.decodeTime(_hourSelected, _meridiemSelected);
      const _currentHourlyMusic: IHourlyMusic|undefined = _allHourlyMusic.find((h: IHourlyMusic) => h.hour === _currentTime);

      if (_currentHourlyMusic) {
        const _weatherSelections: string[] = _currentHourlyMusic.variations.map((v: IWeatherMusic) => v.weather);
        this._changeState('allWeatherOptions', _weatherSelections);
        this._changeState('weatherSelected', _weatherSelections[0]);
      } else {
        console.error('cannot get weather options');
      }
    }

    this.onSelectionChange();
  }

  /**
   * after time/meridiem/weather selection has been changed, check if there's a music that matches
   */
  onSelectionChange(): void {
    const _hourSelected: number = this.state.data.hourSelected;
    const _meridiemSelected: string = this.state.data.meridiemSelected;
    const _weatherSelected: string = this.state.data.weatherSelected;
    const _allHourlyMusic: IHourlyMusic[] = this.state.data.allHourlyMusic;

    console.log('selection: ', _hourSelected, _meridiemSelected, _weatherSelected);
    
    if (!_allHourlyMusic.length) {
      return;
    }

    if (_hourSelected != null && _meridiemSelected != null && _weatherSelected != null) {

      const _currentTime = this.decodeTime(_hourSelected, _meridiemSelected);
      const _currentHourlyMusic: IHourlyMusic|undefined = _allHourlyMusic.find((h: IHourlyMusic) => h.hour === _currentTime);
      
      if (_currentHourlyMusic) {
        const _currentWeatherMusicSelections: IWeatherMusic[] = _currentHourlyMusic.variations;
        const _currentBackgroundMusic: IWeatherMusic|undefined = _currentWeatherMusicSelections.find((w: IWeatherMusic) => w.weather === _weatherSelected);

        if (_currentBackgroundMusic) {
          this.changeSongSelection(_currentBackgroundMusic.musicUri);
        } else {
          console.error('cannot get background music');
        }
      }
    }
  }

  /**
   * gets the button icon according to the weather
   * @param weather 
   */
  getButtonIcon(weather: string) {
    switch (weather) {
      case this.SUNNY:
        return <WbSunnyIcon />
      case this.SNOWY:
        return <AcUnitIcon />
      case this.RAINY:
        return <CloudIcon />
    }
  }

  /**
   * update the music uri on the audio element
   * @param musicUri
   */
  changeSongSelection(musicUri: string) {
    if (this.audioRef.current) {
      this.audioRef.current.pause();
    }

    this._changeState('selectedMusicUri', musicUri);

    if (this.audioRef.current) {
      this.audioRef.current.load();
      this.audioRef.current.play();
    }
  }

  /**
   * converts time to 24-hour value
   * @param hour
   * @param meridiem 
   */
  decodeTime(hour: number, meridiem: string): number {
    return meridiem === this.PM ? hour + 12 : (hour === 12 ? 0 : hour);
  }

  render() {
    const _selectedMusicUri: string = this.state.data.selectedMusicUri;
    const _allStyles: any[] = this.state.data.styles;
    const _hourSelected: number = this.state.data.hourSelected;
    const _meridiemSelected: string = this.state.data.meridiemSelected;
    const _weatherSelections: string[] = this.state.data.allWeatherOptions;
    const _weatherSelected: string = this.state.data.weatherSelected;

    return (
      <div className="background-main padded-6y item-wrapper">
        <Container>
          <div className="main-title-container">
            <PageTitle pageTitle="Hourly Background Music" backLink="/" backLinkDisplay="Home" />
          </div>

          <div className="padded-2y padded-4x main--section">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <div className="hm-time-selection">
                  <h3 className="font-color-dark">Time:</h3>
                  <div className="hm-clock-selector">
                    <div className="hm-circle hm-open">
                      <div className="hm-ring">
                        { _allStyles && _allStyles.map((hour: any, i: number) => 
                            <a key={i} className="hm-menu-item" onClick={() => this.onHourSelected(i+1)} style={{top: hour.top, left: hour.left}}>
                              <span className={(i+1) == _hourSelected ? 'hm-hour-selected' : ''}>{i+1}</span>
                            </a>
                          )
                        }
                      </div>
                      <a className="hm-center">
                        <QueryBuilderIcon fontSize="large" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="hm-meridiem-selection padded-2y">
                <Button variant="contained" disableElevation 
                  onClick={() => this.onMeridiemSelected(this.AM)}
                  className={_meridiemSelected === this.AM ? 'hm-meridiem-selected hm-meridiem-button' : 'hm-meridiem-button'}>AM</Button>
                <Button variant="contained" disableElevation 
                  onClick={() => this.onMeridiemSelected(this.PM)}
                  className={_meridiemSelected === this.PM ? 'hm-meridiem-selected hm-meridiem-button' : 'hm-meridiem-button'}>PM</Button>
                </div>
              </Grid>


              <Grid item xs={12} md={6}>
                <div className="hm-time-selection">
                  <h3 className="font-color-dark">Weather:</h3>
                  
                  {_weatherSelections.map((weather: string) => 
                    <div className="hm-weather-button-wrapper" key={weather}>
                      <Button variant="contained" disableElevation startIcon={this.getButtonIcon(weather)}
                        onClick={() => this.onWeatherSelected(weather)}
                        className={_weatherSelected === weather ? 'hm-weather-selected' : ''}>
                        {weather}
                      </Button> 
                    </div>
                  )}

                  <div className="padded-2y">
                    {_selectedMusicUri && 
                      <div>
                        <h3 className="font-color-dark">Selected Music:</h3>
                        <audio ref={this.audioRef} controls autoPlay>
                          <source src={_selectedMusicUri} type="audio/mpeg" />
                        </audio>
                      </div>
                    }
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    )
  }
}