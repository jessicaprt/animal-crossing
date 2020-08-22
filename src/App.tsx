import React from 'react';
import './App.css';

import { Homepage } from './components/homepage/Homepage';

import { HashRouter, Switch, Route } from 'react-router-dom';
import { Villagers } from './components/villagers/Villagers';
import { Music } from './components/music/Music';
import { Creatures } from './components/creatures/Creatures';
import { Diy } from './components/items/diy/Diy';

function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div>

        <Route exact path="/" component={Homepage} />
        <Route path="/music" component={Music} />
        <Route path="/villagers" component={Villagers} />
        <Route path="/creatures" component={Creatures} />
          {/* <Route exact={true}
            path='/'
            render={() => (
              <div className="App">
                <Homepage />
              </div>
          )}/>

          <Route exact={true}
            path='/villagers'
            render={() => (
              <div className="App">
                <Villagers />
              </div>
          )}/>

          <Route exact={true}
            path='/music'
            render={() => (
              <div className="App">
                <Music />
              </div>
          )}/>

          <Route exact={true}
            path='/creatures'
            render={() => (
              <div className="App">
                <Creatures />
              </div>
          )}/>

          <Route exact={true}
            path='/diy'
            render={() => (
              <div className="App">
                <Diy />
              </div>
          )}/> */}

      </div>
    </HashRouter>
  );
}

export default App;
