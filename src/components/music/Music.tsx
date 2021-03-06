import React from 'react';

import { MusicManager } from '../../services/MusicManager';
import { Container, TextField } from '@material-ui/core';
import { IMusic } from '../../models/IMusic';
import { PageTitle } from '../shared/page-title/PageTitle';

import SearchIcon from '@material-ui/icons/Search';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export class Music extends MusicManager {
  /** if component is mounted */
  private _isMounted: boolean;

  /** audio ref */
  audioRef: React.RefObject<any>;

  /** song list ref */
  songListRef: React.RefObject<any>;

  constructor(props) {
    super(props);
    this.state = {
      data: {
        allSongs: [],
        filteredSongs: [],
        currentSong: null,
        nowPlayingDisplay: 'np-hide'
      }
    }

    this._isMounted = false;

    this.audioRef = React.createRef();
    this.songListRef = React.createRef();

    this.textSearch = this.textSearch.bind(this);
    this.selectCurrentSong = this.selectCurrentSong.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this._getAllSongs().then((songs: any) => {
      const _allSongs = this._renderAllSongs(songs);
      if (this._isMounted) {
        this._changeState('allSongs', _allSongs);
        this._changeState('filteredSongs', _allSongs);
      }
    });

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this._isMounted = false;
  }

  /**
   * listens to scroll event (for 'Now Playing' view)
   * @param event 
   */
  handleScroll(event: any) {
    try {
      const offset = this.songListRef.current.offsetTop;
      if (window.scrollY > offset) {
        this._changeState('nowPlayingDisplay', 'np-minimized');
      } else {
        this._changeState('nowPlayingDisplay', 'np-full');
      }
    } catch {}
  }

  /**
   * handles when a song is selected from the list
   * @param song 
   */
  selectCurrentSong(song: IMusic) {
    if (this.audioRef.current) {
      this.audioRef.current.pause();
    }

    this._changeState('currentSong', song);

    if (this.audioRef.current) {
      this.audioRef.current.load();
      this.audioRef.current.play();
    }
  }

  

  /**
   * listens to changes to the search input
   * @param searchString 
   */
  textSearch(searchString: string) {
    const _search: string = searchString.toLowerCase();

    // filter by search string
    const _filtered = this.state.data.allSongs.filter((song: IMusic) => 
      song.name.toLowerCase().indexOf(_search) > -1
    );

    this._changeState('filteredSongs', _filtered);
  }

  render() {
    const _currentSong:IMusic = this.state.data.currentSong;
    const _nowPlayingDisplay: string = this.state.data.nowPlayingDisplay;

    return (
      <div className="music-wrapper background-main padded-6y">
        <Container>
          <div className="main-title-container">
            <PageTitle pageTitle="Music" backLink="/" backLinkDisplay="Home" />
            <div className="main-search-wrapper">
              <div className="main-search-icon"><SearchIcon fontSize="large" /></div>
              <TextField id="outlined-basic" label="Search Song" variant="outlined" onChange={event => this.textSearch(event.target.value)} /> 
            </div>
          </div>
          {_currentSong ? 
            <div className="music-now-playing padded-2x np-full">
              <img src={_currentSong.imageUri} alt={_currentSong.name} />
              <div className="music-now-playing-title padded-2y padded-2x">
                <h4 className="font-color-white">Now Playing</h4>
                <h3 className="font-color-white">{_currentSong.name}</h3>
            </div>
              <audio ref={this.audioRef} controls autoPlay>
                <source src={_currentSong.musicUri} type="audio/mpeg" />
              </audio>
            </div> 
            : null
          }

          <div ref={this.songListRef} className="music-songs-container">
            {this.state.data.filteredSongs ? 
              this.state.data.filteredSongs.map((song: IMusic) => 
                <div key={song.id} className="padded-2x music-song-item">
                  <span>{song.name}</span>
                  {_currentSong && _currentSong.id === song.id ? null
                    : <PlayArrowIcon className="music-play-icon" onClick={() => this.selectCurrentSong(song)} />
                  }
                  </div>
              )
            : null}
          </div>

          {_currentSong ? 
            <div className={`music-now-playing padded-2x ${_nowPlayingDisplay}`}>
              <img src={_currentSong.imageUri} alt={_currentSong.name} />
              <div className="music-now-playing-title padded-2y padded-2x">
                <h4 className="font-color-white">Now Playing</h4>
                <h3 className="font-color-white">{_currentSong.name}</h3>
              </div>
            </div>
          : null }
        </Container>
      </div>
    )
  }
}