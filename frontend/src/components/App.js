import React, { Component } from 'react';
import '../App.css';
import { Route } from 'react-router-dom'
import PostsList from './PostsList'
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
          <PostsList/>
        )}/>
        <Route exact path="/:category" component={PostsList}/>
        <Route exact path="/:category/:postId" component={Post}/>
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App