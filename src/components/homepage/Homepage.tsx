import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import './IHomepageItem';
import './Homepage.css';
import { IHomepageItem } from './IHomepageItem';
import { HomepageIcon } from './homepage-icon/HomepageIcon';

export class Homepage extends React.Component<{}, {time: string}> {
  
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    }
  }
  
  componentDidMount() {
    const checkTime = () => {
      setTimeout(() => {
        const now = new Date();
        this.setState({
          time: now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        });
        checkTime();
      }, 500);
    }

    checkTime();
  }

  render() {
    const time = new Date();
    const icons:IHomepageItem[] = [
      {
        id: 'homepage-icon--1',
        name: "Villager",
        imageUrl: "villager_icon.png",
        link: '/villagers'
      },
      {
        id: 'homepage-icon--2',
        name: "Music",
        imageUrl: "music_icon.png",
        link: '/'
      },
      {
        id: 'homepage-icon--3',
        name: "Creature",
        imageUrl: "creature_icon.png",
        link: '/'
      },
      {
        id: 'homepage-icon--4',
        name: "DIY",
        imageUrl: "diy_icon.png",
        link: '/'
      },
      {
        id: 'homepage-icon--5',
        name: "Shopping",
        imageUrl: "shopping_icon.png",
        link: '/'
      },
      {
        id: 'homepage-icon--6',
        name: "Art",
        imageUrl: "art_icon.png",
        link: '/'
      },
    ];

    return (
      <div className="background-main font--main homepage-wrapper padded-6y">
        <div className="homepage-container">
          <Container>
            <h3 className="font-color-light homepage-time">{this.state.time}</h3>
            <h1 className="font-color-dark homepage-title">Animal Crossing: New Horizons</h1>

            <div className="padded-6y homepage-grid-wrapper">
              <Grid container>
                {icons.map((homepageItem: IHomepageItem) => <HomepageIcon key={homepageItem.id} homepageItem={homepageItem}/> )}
              </Grid>
            </div>
          </Container>
        </div>
      </div>
    )
  }
}