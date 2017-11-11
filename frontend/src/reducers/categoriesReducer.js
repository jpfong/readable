import {
  RECEIVE_CATEGORIES
} from '../actions/actionTypes'

export default function categories (state = [], action) {
  if (action.type === RECEIVE_CATEGORIES) {
    return action.categories
  }
  return state
}