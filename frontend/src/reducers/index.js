import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES
} from '../actions/categories'

import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORY_POSTS
} from '../actions/posts'

function categories (state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES :
      return action.categories
    default :
      return state
  }
}

function posts (state = [], action ) {
  switch (action.type) {
    case RECEIVE_POSTS :
      return action.posts
    case RECEIVE_CATEGORY_POSTS :
      return action.posts
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts
})