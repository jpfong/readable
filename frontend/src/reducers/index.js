import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES
} from '../actions/categories'

import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORY_POSTS,

} from '../actions/posts'

import {
  RECEIVE_POST
} from '../actions/post'

import {
  RECEIVE_COMMENTS
} from '../actions/comments'

function categories (state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES :
      return action.categories
    default :
      return state
  }
}

function posts (state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      return action.posts
    case RECEIVE_CATEGORY_POSTS :
      return action.posts
    default :
      return state
  }
}

function post (state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST :
      return action.post
    default :
      return state
  }
}

function comments (state = [], action) {
  switch (action.type) {
    case RECEIVE_COMMENTS :
      return action.comments
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  post,
  comments
})