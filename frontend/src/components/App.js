import React, { Component } from 'react';
import '../App.css';
import { Route } from 'react-router-dom'
import RootPage from './RootPage'
import Category from './Category'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <RootPage/>
        )}/>
        <Route exact path="/:category" component={Category}/>
      </div>
    )
  }
}

export default App