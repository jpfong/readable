import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES
} from '../actions/categories'

import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORY_POSTS,
  DELETE_POST,
  SORT_POSTS
} from '../actions/posts'

import {
  RECEIVE_POST
} from '../actions/post'

import {
  RECEIVE_COMMENTS,
  UPDATE_COMMENTS,
  DELETE_COMMENT,
  ADD_COMMENT
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
    case RECEIVE_POSTS:
      return action.posts
    case RECEIVE_CATEGORY_POSTS:
      return action.posts
    case DELETE_POST:
      return state.filter(post => post.id !== action.deletedPost.id)
    case SORT_POSTS:
      if (action.sort === 'date') {
        return action.posts.sort((a, b) => b.timestamp - a.timestamp)
      }
      // score
      return action.posts.sort((a, b) => a.voteScore - b.voteScore)
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
  console.log('wwww action', action)
  switch (action.type) {
    case RECEIVE_COMMENTS :
      return action.comments
    case UPDATE_COMMENTS :
      return action.comments
    case DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.comment.id)
    case ADD_COMMENT:
      return [...state, action.comment]
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