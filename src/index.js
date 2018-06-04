/**
 * Application entrypoint
 */

import React from "react";
import { render } from "react-dom";
import Home from './pages/Home';
import athletes from './fixtures/athletes.json';
import disciplines from './fixtures/disciplines.json';
import './index.styl'


const App = () => (
  <div>
    <Home athletes={athletes} disciplines={disciplines} />
  </div>
  
);

render(<App />, document.getElementById("app"));