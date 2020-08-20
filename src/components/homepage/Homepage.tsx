import React from 'react';
import './Homepage.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export const HomepageIcon = ({imageUrl}) => {
  return (
    <Grid item spacing={2} xs={4}>  
      <div className="homepage-item-container padded-1y">
        <div className="homepage-item">
          <div className="homepage-item-image">
            <img src={`assets/homepage_icons/${imageUrl}`}/>
          </div>
        </div>
      </div>
    </Grid>
  );
}

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
    const icons = [
      "villager_icon.png",
      "music_icon.png",
      "creature_icon.png",
      "diy_icon.png",
      "shopping_icon.png",
      "art_icon.png"
    ];

    return (
      <div className="font--main homepage-wrapper padded-6y">
        <div className="homepage-container">
          <Container>
            <h3 className="font-color-light homepage-time">{this.state.time}</h3>
            <h1 className="font-color-dark homepage-title">Animal Crossing: New Horizons</h1>

            <div className="padded-6y homepage-grid-wrapper">
              <Grid container>
                {icons.map((icon: string) => <HomepageIcon imageUrl={icon}/> )}
              </Grid>
            </div>
          </Container>
        </div>
      </div>
    )
  }
}