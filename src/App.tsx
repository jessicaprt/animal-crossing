import React from 'react';
import './App.css';

import { Homepage } from './components/homepage/Homepage';

import { HashRouter, Route } from 'react-router-dom';
import { Villagers } from './components/villagers/Villagers';
import { Music } from './components/music/Music';
import { Creatures } from './components/creatures/Creatures';
import { Diy } from './components/items/diy/Diy';
import { Shopping } from './components/items/shopping/Shopping';
import { FreebiesPage } from './components/items/freebies/freebiesPage/FreebiesPage';
import { FreebiesAll } from './components/items/freebies/freebiesAll/FreebiesAll';
import { Art } from './components/art/Art';
import { Fossils } from './components/fossils/Fossils';

function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Route exact path="/" component={Homepage} />
        <Route path="/music" component={Music} />
        <Route path="/villagers" component={Villagers} />
        <Route path="/creatures" component={Creatures} />
        <Route path="/diy" component={Diy} />
        <Route path="/shopping" component={Shopping} />
        <Route path="/freebies/:freebie_id" component={FreebiesPage} />
        <Route path="/freebies-redeemable" component={FreebiesAll} />
        <Route path="/art" component={Art} />
        <Route path="/fossils" component={Fossils} />
      </div>
    </HashRouter>
  );
}

export default App;
