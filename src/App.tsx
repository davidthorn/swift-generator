import React, { Component } from 'react';
import logo from './logo.svg';
import './app/features/Home.css';
import { HomeFeature } from './app/features/Home/Home.feature'

class App extends Component {
  render() {
    return (
      <HomeFeature></HomeFeature>
    );
  }
}

export default App;
