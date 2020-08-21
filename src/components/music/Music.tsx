import React from 'react';
import { MusicManager } from './MusicManager';
import { Container, TextField } from '@material-ui/core';

import './Music.css';
import { IMusic } from './IMusic';
import { PageTitle } from '../shared/page-title/PageTitle';
import { SongItem } from './song-item/SongItem';

import SearchIcon from '@material-ui/icons/Search';

export class Music extends MusicManager {
  /** if component is mounted */
  private _isMounted: boolean;

  constructor(props) {
    super(props);
    this.state = {
      data: {
        allSongs: [],
        filteredSongs: []
      }
    }

    this._isMounted = false;
    this.textSearch = this.textSearch.bind(this);
  }

  componentDidMount() {
    this._getAllSongs().then((songs: any) => {
      this._isMounted = true;
      this.renderAllSongs(songs);
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderAllSongs(songs: any) {
    const _allSongs:IMusic[] = [];

    Object.keys(songs).forEach((key: string) => {
      const _currentSong = songs[key];
      const _newSong: IMusic = {
        name: _currentSong['name']['name-USen'],
        id: _currentSong['id'],
        imageUri: _currentSong['image_uri'],
        musicUri: _currentSong['music_uri']
      }

      _allSongs.push(_newSong);
    });

    this._changeState('allSongs', _allSongs);
    this._changeState('filteredSongs', _allSongs);
  }

  textSearch(searchString: string) {
    const _search: string = searchString.toLowerCase();

    // return all songs if search string is empty
    if (_search === '') {
      return [... this.state.data.allSongs];
    }

    // filter by search string
    const _filtered = this.state.data.allSongs.filter((song: IMusic) => 
      song.name.toLowerCase().indexOf(_search) > -1
    );

    this._changeState('filteredSongs', _filtered);
    
    return _filtered;
  }

  render() {
    return (
      <div className="music-wrapper background-main padded-6y">
        <Container>
          <div className="app-title-container">
            <PageTitle pageTitle="Music" backLink="/" backLinkDisplay="Home" />
            <div className="app-search-wrapper">
              <div className="app-search-icon"><SearchIcon fontSize="large" /></div>
              <TextField id="outlined-basic" label="Search Song" variant="outlined" onChange={event => this.textSearch(event.target.value)} /> 
            </div>
          </div>
          <div className="padded-4y">
            {this.state.data.filteredSongs ? 
              this.state.data.filteredSongs.map((song: IMusic) => 
                <SongItem key={song.id} song={song} />
              )
            : null}
          </div>
        </Container>
      </div>
    )
  }
}