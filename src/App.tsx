import React from 'react';
import './App.css';

import { Homepage } from './components/homepage/Homepage';

import { HashRouter, Route } from 'react-router-dom';
import { Villagers } from './components/villagers/Villagers';
import { Music } from './components/music/Music';
import { Creatures } from './components/creatures/Creatures';
import { Diy } from './components/items/diy/Diy';
import { Shopping } from './components/items/shopping/Shopping';

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
      </div>
    </HashRouter>
  );
}

export default App;
