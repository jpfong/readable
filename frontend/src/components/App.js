import React, { Component } from 'react';
import '../App.css';
import { Route } from 'react-router-dom'
import RootPage from './RootPage'
import Category from './Category'
import Categories from './Categories'
import Post from './Post'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div>
        <Categories/>
        <Route exact path="/" render={() => (
          <RootPage/>
        )}/>
        <Route exact path="/:category" component={Category}/>
        <Route exact path="/:category/:postId" component={Post}/>
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App