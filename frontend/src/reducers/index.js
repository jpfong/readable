import { combineReducers } from 'redux'
import post from './postReducer'
import posts from './postsReducer'
import categories from './categoriesReducer'
import comments from './commentsReducer'
import comment from './commentReducer'

export default combineReducers({
  categories,
  posts,
  post,
  comments,
  comment
})