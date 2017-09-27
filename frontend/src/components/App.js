import React, { Component } from 'react';
import '../App.css';
import { Route } from 'react-router-dom'
import RootPage from './RootPage'
import Category from './Category'
import Post from './Post'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <RootPage/>
        )}/>
        <Route exact path="/:category" component={Category}/>
        <Route exact path="/:category/:postId" component={Post}/>
      </div>
    )
  }
}

export default App