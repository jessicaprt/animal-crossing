import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import '../../models/IHomepageItem';
import { IHomepageItem } from '../../models/IHomepageItem';
import { HomepageIcon } from './HomepageIcon';

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
        name: "Villagers",
        imageUrl: "villager_icon.png",
        link: '/villagers'
      },
      {
        id: 'homepage-icon--2',
        name: "Music",
        imageUrl: "music_icon.png",
        link: '/music'
      },
      {
        id: 'homepage-icon--3',
        name: "Creatures",
        imageUrl: "creature_icon.png",
        link: '/creatures'
      },
      {
        id: 'homepage-icon--4',
        name: "DIY",
        imageUrl: "diy_icon.png",
        link: '/diy'
      },
      {
        id: 'homepage-icon--5',
        name: "Shopping",
        imageUrl: "shopping_icon.png",
        link: '/shopping'
      },
      {
        id: 'homepage-icon--6',
        name: "Freebies",
        imageUrl: "freebies_icon.png",
        link: '/freebies-redeemable'
      },
      {
        id: 'homepage-icon--7',
        name: "Art",
        imageUrl: "art_icon.png",
        link: '/art'
      },
      {
        id: 'homepage-icon--8',
        name: "Fossils",
        imageUrl: "fossil_icon.png",
        link: '/fossils'
      },
      {
        id: 'homepage-icon--9',
        name: "Hourly Music",
        imageUrl: "hourly_music_icon.png",
        link: '/hourly-music'
      },
    ];

    return (
      <div className="background-main font--main homepage-wrapper padded-6y">
        <div className="homepage-container">
          <Container>
            {/* <h3 className="font-color-light homepage-time">{this.state.time}</h3>
            <h1 className="font-color-dark homepage-title">Nookbook</h1> */}
            <div className="homepage-logo-container">
              <img src="assets/main/nookbook_logo.png" alt="nookbook-logo"/>
            </div>

            <div className="padded-6y homepage-grid-wrapper">
              <Grid container spacing={2}>
                {icons.map((homepageItem: IHomepageItem) => <HomepageIcon key={homepageItem.id} homepageItem={homepageItem}/> )}
              </Grid>
            </div>
          </Container>
        </div>
      </div>
    )
  }
}