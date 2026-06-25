<<<<<<< HEAD
import * as React from 'react';
import './App.css';
import BeerList from './BeerList';

import logo from './logo.svg';

class App extends React.Component<{}, any> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BeerList/>
      </div>
    );
  }
}

=======
import * as React from 'react';
import './App.css';
import BeerList from './BeerList';

import logo from './logo.svg';

class App extends React.Component<{}, any> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BeerList/>
      </div>
    );
  }
}

>>>>>>> 70579feeae459c314a95321de94e87ad07788bc0
export default App;