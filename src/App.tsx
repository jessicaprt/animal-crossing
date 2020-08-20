import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Homepage } from './components/homepage/Homepage';
import { Page } from './components/page/Page';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Villagers } from './components/villagers/Villagers';

function App() {
  return (
    <BrowserRouter baseName={process.env.PUBLIC_URL}>
      <div>
        <Switch>

          <Route exact={true}
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

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
